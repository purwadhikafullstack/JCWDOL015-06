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
      const { name, category, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          where: {
            AND: [
              { productName: { contains: name as string } },
              { category: { name: { contains: category as string } } },
            ],
          },
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
          where: {
            AND: [
              { productName: { contains: name as string } },
              { category: { name: { contains: category as string } } },
            ],
          },
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
}
