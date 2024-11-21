import { Request, Response } from 'express';
import prisma from '@/prisma';
import { rajaongkirShippingCost } from '@/helpers/rajaOngkirCost';

type Cost = {
  value: number;
  etd: string;
  note: string;
};

type Store = {
  id: number;
  address: {
    id: number;
    cityId: number;
    provinceId: number;
  } | null; // Allow null to handle cases where address is missing
  cost: {
    service: string;
    description: string;
    cost: Cost[];
  };
};

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
      // console.log(req.files);
      // console.log('something something');
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

  async getProductsWithStoreAddressV22(req: Request, res: Response) {
    console.log('\n\nGETTING SPECIALS\n\n');
    try {
      const { userId } = req.body;

      console.log('\n\n\nSPECIALS V2\n\n');

      let userAddress: any;

      userAddress = await prisma.address.findMany({
        where: {
          type: 'USER',
          typeId: userId,
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
            typeId: userId,
          },
          select: {
            id: true,
            cityId: true,
            provinceId: true,
          },
        });
      }
      // console.log('\n USER ADDRESS');
      // console.log(userAddress);
      // console.log('\n\n');

      const stores: { id: number }[] = await prisma.store.findMany({
        select: {
          id: true,
        },
      });

      if (!stores) throw 'Store Not Found!';

      const storeAddress = await Promise.all(
        stores.map(async (store) => {
          // Fetch main address
          const mainAddress = await prisma.address.findFirst({
            where: {
              type: 'STORE',
              typeId: store.id,
              isMain: 1,
            },
            select: {
              id: true,
              cityId: true,
              provinceId: true,
            },
          });

          // If no main address, fetch fallback address
          const fallbackAddress = !mainAddress
            ? await prisma.address.findFirst({
                where: {
                  type: 'STORE',
                  typeId: store.id,
                },
                select: {
                  id: true,
                  cityId: true,
                  provinceId: true,
                },
                orderBy: {
                  createdAt: 'asc', // Modify ordering if needed
                },
              })
            : null;
   
          const selectedAddress = mainAddress || fallbackAddress;

          const cost = await rajaongkirShippingCost(
            userAddress.length >= 1 ? Number(userAddress[0].cityId) : 114,
            Number(selectedAddress?.cityId),
          );

          return {
            ...store,
            address: selectedAddress,
            cost: cost.results[0].costs[1],
          };
        }),
      );

      const storeWithLowestCost = storeAddress.reduce<Store | null>(
        (lowest, store) => {
          // Handle case where the store doesn't have a cost or address
          if (!store.cost || !store.address) {
            return lowest;
          }

          // Find the lowest cost within the current store's costs
          const currentStoreLowestCost = store.cost.cost.reduce(
            (minCost: { value: number }, currentCost: { value: number }) => {
              return currentCost.value < minCost.value ? currentCost : minCost;
            },
            store.cost.cost[0], // Initial value is the first cost
          );

          // Compare the current store's lowest cost with the overall lowest cost
          if (
            !lowest ||
            !lowest.cost.cost[0] ||
            currentStoreLowestCost.value < lowest.cost.cost[0].value
          ) {
            return {
              ...store,
              cost: {
                ...store.cost,
                cost: [currentStoreLowestCost], // Only keep the lowest cost for this store
              },
            };
          }

          return lowest;
        },
        null, // Initial value
      );

      // console.log('\n\n LOWEST COST');
      // console.log(storeWithLowestCost);

      const products = await prisma.product.findMany({
        where: {
          // id: Number(storeWithLowestCost.id),
          Stock: {
            some: {
              // This filters stocks to include only the specified store
              storeId: Number(storeWithLowestCost ? storeWithLowestCost.id : 1), // Replace storeId with the specific store's ID
            },
          },
        },
        include: {
          category: true,
          productDiscounts: {
            include: {
              discount: true,
            },
          },
          Stock: {
            where: {
              storeId: Number(storeWithLowestCost ? storeWithLowestCost.id : 1),
            }, // Include only the Stock for the specified store
            include: {
              store: true,
            },
          },
        },
        take: 6,
      });

      res.status(200).send({
        status: 'ok',
        storeLowestCost: storeWithLowestCost,
        products,
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
