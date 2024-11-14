import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CategoryController {
  async getCategoriesList(req: Request, res: Response) {
    try {
      const categoryFetch = await prisma.category.findMany();

      if (!categoryFetch) throw 'store List Unable be Fetched!';

      res.status(200).send({
        status: 'ok',
        categories: categoryFetch,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error fething users data',
        msg: error,
      });
    }
  }
}
