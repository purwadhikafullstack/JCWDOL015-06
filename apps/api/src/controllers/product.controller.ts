import { Request, Response } from 'express';
import prisma from '@/prisma';
import { rajaongkirShippingCost } from '@/helpers/rajaOngkirCost';

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const { price, productName, desc, imageUrls, categoryId, weight } =
        req.body;
      const product = await prisma.product.create({
        data: { price, productName, desc, imageUrls, categoryId, weight },
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const { name, categoryIds, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const whereFilter = {
        AND: [{ productName: { contains: name as string } }],
      } as any;

      const modifiedCategoryIds = Array.isArray(categoryIds)
        ? categoryIds
        : categoryIds
          ? [categoryIds]
          : [];

      if (modifiedCategoryIds && modifiedCategoryIds.length > 0) {
        whereFilter.AND.push({
          categoryId: { in: modifiedCategoryIds.map((id) => Number(id)) },
        });
      }

      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          where: whereFilter,
          include: {
            category: true,
            productDiscounts: {
              include: {
                discount: true,
              },
            },
            Stock: {
              include: {
                store: true,
              },
            },
          },
          skip,
          take,
        }),
        prisma.product.count({
          where: whereFilter,
        }),
      ]);

      res.status(200).json({ products, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          category: true,
          productDiscounts: {
            include: {
              discount: true,
            },
          },
          Stock: {
            include: {
              store: true,
            },
          },
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { price, productName, desc, imageUrls, categoryId } = req.body;

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: { price, productName, desc, imageUrls, categoryId },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.product.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      console.log(req.files);
      console.log('something something');
      const filePaths = Array.isArray(req.files)
        ? req.files.map((file: Express.Multer.File) => {
            const fileSplit = file.path?.split('/');
            const path = fileSplit[fileSplit.length - 1];
            return `/${path}`;
          })
        : [];
      res.json({
        message: 'Files uploaded successfully',
        files: filePaths,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
        msg: error,
      });
    }
  }

  async getProductsWithStoreAddress(req: Request, res: Response) {
    console.log('NNGETTING SPECIALSNN');

    try {
      // Step 1: Fetch products with their related stock and store details
      const products = await prisma.product.findMany({
        include: {
          Stock: {
            include: {
              store: true, // Include store for each stock entry
            },
          },
          productDiscounts: {
            include: {
              discount: true,
            },
          },
        },
      });

      // Step 2: Fetch all addresses for stores in the query
      const storeIds = products
        .flatMap((product) => product.Stock.map((stock) => stock.storeId))
        .filter((value, index, self) => self.indexOf(value) === index); // Deduplicate storeIds

      const addresses = await prisma.address.findMany({
        where: {
          type: 'STORE',
          typeId: {
            in: storeIds, // Fetch addresses for all stores
          },
        },
      });

      // Step 3: Map each product to its store and address
      const result = products.map((product) => {
        return {
          ...product,
          Stock: product.Stock.map((stock) => {
            const storeAddress = addresses.find(
              (address) =>
                address.typeId === stock.storeId && address.type === 'STORE',
            );
            return {
              ...stock,
              store: {
                ...stock.store,
                address: storeAddress, // Attach the address to the store
              },
            };
          }),
        };
      });

      // return result;
      res.status(200).send({
        status: 'ok',
        products: result,
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error products',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error products',
          msg: error,
        });
      }
    }
  }

  async getProductsWithStoreAddressV2(req: Request, res: Response) {
    console.log('\n\nGETTING SPECIALS\n\n');

    try {
      const query = `
      select 
        st.id AS storeId,
        st.name AS storeName,
        a.id AS addressId,
        a.provinceId,
        a.cityId,
        a.desc AS addressDesc
      FROM store st JOIN Address a ON a.type = 'STORE' AND a.typeId = st.id;
      `;

      const storeAddress: any[] = await prisma.$queryRawUnsafe(query);

      let userAddress: any;

      userAddress = await prisma.address.findMany({
        where: {
          type: 'USER',
          typeId: req.user.id,
          isMain: 1,
        },
        select: {
          id: true,
          cityId: true,
          provinceId: true,
        },
      });

      if (!userAddress) {
        userAddress = await prisma.address.findFirst({
          where: {
            type: 'USER',
            typeId: req.user.id,
          },
          select: {
            id: true,
            cityId: true,
            provinceId: true,
          },
        });
      }

      console.log('\n\n\nSPECIALS V2\n\n');

      console.log(userAddress);

      const cost = await rajaongkirShippingCost(197, 114);

      console.log(cost);

      if (cost.status.code == 400) throw cost.status.description;

      res.status(200).send({
        status: 'ok',
        store: storeAddress,
        costs: cost.results[0].costs[1],
      });
    } catch (error: any) {
      if (error.message) {
        res.status(400).send({
          status: 'error products',
          msg: error.message,
        });
      } else {
        res.status(400).send({
          status: 'error products',
          msg: error,
        });
      }
    }
  }
}
