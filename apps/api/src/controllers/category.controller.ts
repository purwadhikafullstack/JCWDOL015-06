import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: { name },
      });
      res.status(201).json(category);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const { name, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [categories, total] = await prisma.$transaction([
        prisma.category.findMany({
          where: { name: { contains: name as string } },
          skip,
          take,
        }),
        prisma.category.count({
          where: { name: { contains: name as string } },
        }),
      ]);

      res.status(200).json({ categories, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json(category);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name },
      });

      res.status(200).json(category);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.category.delete({
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
