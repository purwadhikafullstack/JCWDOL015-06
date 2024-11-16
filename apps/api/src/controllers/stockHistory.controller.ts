import { Request, Response } from 'express';
import prisma from '@/prisma';

export class StockHistoryController {
  async createStockHistory(req: Request, res: Response) {
    try {
      const { userId, storeId, productId, quantityChanged, totalQuantity } =
        req.body;
      const stockHistory = await prisma.stockHistory.create({
        data: {
          userId,
          storeId,
          productId,
          quantityChanged,
          totalQuantity,
        },
      });
      res.status(201).json(stockHistory);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStockHistories(req: Request, res: Response) {
    try {
      const {
        date,
        productName,
        storeName,
        page = 1,
        pageSize = 10,
      } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const stockHistories = await prisma.stockHistory.findMany({
        where: {
          OR: [
            { createdAt: { gte: new Date(date as string) } },
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

      res.status(200).json(stockHistories);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStockHistoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stockHistory = await prisma.stockHistory.findUnique({
        where: { id: Number(id) },
        include: { product: true, store: true },
      });

      if (!stockHistory) {
        return res.status(404).json({ error: 'Stock history not found' });
      }

      res.status(200).json(stockHistory);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateStockHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId, storeId, productId, quantityChanged, totalQuantity } =
        req.body;

      const stockHistory = await prisma.stockHistory.update({
        where: { id: Number(id) },
        data: { userId, storeId, productId, quantityChanged, totalQuantity },
      });

      res.status(200).json(stockHistory);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteStockHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.stockHistory.delete({
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
