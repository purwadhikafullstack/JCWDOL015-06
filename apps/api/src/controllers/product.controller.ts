import { Request, Response } from 'express';
import prisma from '@/prisma';
import path from 'path';
import fs from 'fs';
export class ProductController {
  async getProductList(req: Request, res: Response) {
    try {
      // const categoryFetch = await prisma.category.findMany({
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // });

      // const productFetch = await prisma.product.findMany();

      // if (!productFetch) throw 'Product List Unable be Fetched!';

      // if (!categoryFetch) {
      //   res.status(200).send({
      //     status: 'ok',
      //     products: productFetch,
      //     categories: 'Null',
      //   });
      // } else {
      //   res.status(200).send({
      //     status: 'ok',
      //     products: productFetch,
      //     categories: categoryFetch,
      //   });
      // }

      const productFetch = await prisma.product.findMany({
        include: {
          category: true,
          productDiscount: true,
          Stock: {
            select: {
              store: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
      });

      if (!productFetch) throw 'Product List Unable to be Fetched!';

      console.log('\n\n\n\n');
      console.log(productFetch);

      if(productFetch.length < 1) throw 'No Product Detected!'

      res.status(200).send({
        status: 'ok',
        products: productFetch,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error fething products',
        msg: error,
      });
    }
  }

  async getStoreList(req: Request, res: Response) {
    try {
      const storeFetch = await prisma.store.findMany();

      if (!storeFetch) throw 'store List Unable be Fetched!';

      const address = await prisma.address.findMany();

      if (!address) {
        res.status(200).send({
          status: 'ok',
          stores: storeFetch,
          address: 'Null',
        });
      } else {
        res.status(200).send({
          status: 'ok',
          stores: storeFetch,
          categories: address,
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
