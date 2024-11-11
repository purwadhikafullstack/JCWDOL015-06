import { Request, Response } from 'express';
import prisma from '@/prisma';
import path from 'path';
import fs from 'fs';
export class ProductController {
  async getProductList(req: Request, res: Response) {
    try {
      const categoryFetch = await prisma.product_Category.findMany({
        select: {
          id: true,
          categoryName: true,
        },
      });

      const productFetch = await prisma.product.findMany();

      if (!productFetch) throw 'Product List Unable be Fetched!';

      if (!categoryFetch) {
        res.status(200).send({
          status: 'ok',
          products: productFetch,
          categories: 'Null',
        });
      } else {
        res.status(200).send({
          status: 'ok',
          products: productFetch,
          categories: categoryFetch,
        });
      }
    } catch (error) {
      res.status(400).send({
        status: 'error fething users data',
        msg: error,
      });
    }
  }
}
