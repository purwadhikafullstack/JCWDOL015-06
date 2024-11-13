import { Request, Response } from 'express';
import prisma from '@/prisma';

export class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();

      res.status(200).send({
        status: 'ok',
        products,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fething products data',
        msg: err,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Product Detail Fetched!',
        product,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fetching product detail',
        msg: err,
      });
    }
  }

  // Create product
  async createProduct(req: Request, res: Response) {
    try {
      const {
        price,
        image_url,
        categoryId,
        productDiscountId,
        productName,
        desc,
        weight,
        Stock,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          price,
          image_url,
          categoryId,
          productDiscountId,
          productName,
          desc,
          weight,
          Stock,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Product Created!',
        product,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Create Product!',
        msg: err,
      });
    }
  }

  // Update product
  async updateProduct(req: Request, res: Response) {
    try {
      const {
        id,
        price,
        image_url,
        categoryId,
        productDiscountId,
        productName,
        desc,
        weight,
        Stock,
      } = req.body;

      const product = await prisma.product.update({
        where: { id: id },
        data: {
          price,
          image_url,
          categoryId,
          productDiscountId,
          productName,
          desc,
          weight,
          Stock,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Product Updated!',
        product,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Update Product!',
        msg: err,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const product = await prisma.product.delete({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Product Deleted!',
        product,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error deleting product',
        msg: err,
      });
    }
  }
}
