import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();

      res.status(200).send({
        status: 'ok',
        categories,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fething categories',
        msg: err,
      });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const category = await prisma.category.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Category Fetched!',
        category,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fetching category',
        msg: err,
      });
    }
  }

  // Create category
  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const existingCategory = await prisma.category.findUnique({
        where: { name: name },
      });

      if (existingCategory) throw 'duplicate category!';

      const category = await prisma.category.create({
        data: {
          name,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Category Created!',
        category,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Create Category!',
        msg: err,
      });
    }
  }

  // Update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      const existingCategory = await prisma.category.findUnique({
        where: { name: name },
      });

      if (existingCategory) throw 'duplicate category!';

      const category = await prisma.category.update({
        where: { id: id },
        data: {
          name,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Category Updated!',
        category,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Update Category!',
        msg: err,
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const category = await prisma.category.delete({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Category Deleted!',
        category,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error deleting category',
        msg: err,
      });
    }
  }
}
