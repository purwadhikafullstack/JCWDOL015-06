import { Request, Response } from 'express';
import prisma from '@/prisma';

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
}
