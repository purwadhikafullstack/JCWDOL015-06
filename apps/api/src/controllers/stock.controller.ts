import { Request, Response } from 'express';
import prisma from '@/prisma';

export class StockController {
  async createStock(req: Request, res: Response) {
    try {
      const { productId, storeId, quantity } = req.body;
      const stock = await prisma.stock.create({
        data: { productId, storeId, quantity },
      });
      res.status(201).json(stock);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStocks(req: Request, res: Response) {
    try {
      const { productName, storeName, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const stocks = await prisma.stock.findMany({
        where: {
          OR: [
            { product: { productName: { contains: productName as string } } },
            { store: { name: { contains: storeName as string } } },
          ],
        },
        include: {
          product: true,
          store: true,
        },
        skip,
        take,
      });

      res.status(200).json(stocks);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStockById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stock = await prisma.stock.findUnique({
        where: { id: Number(id) },
        include: { product: true, store: true },
      });

      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      }

      res.status(200).json(stock);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateStock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { productId, storeId, quantity } = req.body;

      const stock = await prisma.stock.update({
        where: { id: Number(id) },
        data: { productId, storeId, quantity },
      });

      res.status(200).json(stock);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteStock(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.stock.delete({
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
