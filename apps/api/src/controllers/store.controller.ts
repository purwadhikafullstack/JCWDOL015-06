import { Request, Response } from 'express';
import prisma from '@/prisma';

export class StoreController {
  async createStore(req: Request, res: Response) {
    try {
      const { name, address } = req.body;
      const store = await prisma.store.create({
        data: { name, address },
      });
      res.status(201).json(store);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStores(req: Request, res: Response) {
    try {
      const { name, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [stores, total] = await prisma.$transaction([
        prisma.store.findMany({
          where: { name: { contains: name as string } },
          skip,
          take,
        }),
        prisma.store.count({
          where: { name: { contains: name as string } },
        }),
      ]);

      res.status(200).json({ stores, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStoreById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const store = await prisma.store.findUnique({
        where: { id: Number(id) },
      });

      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }

      res.status(200).json(store);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateStore(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const store = await prisma.store.update({
        where: { id: Number(id) },
        data: { name },
      });

      res.status(200).json(store);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteStore(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.store.delete({
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
