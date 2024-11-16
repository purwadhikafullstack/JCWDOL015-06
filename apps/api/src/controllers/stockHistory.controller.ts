import e, { Request, Response } from 'express';
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
        start_date,
        end_date,
        productName,
        storeName,
        userName,
        storeId,
        page = 1,
        pageSize = 10,
      } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const whereFilter = {
        AND: [
          { product: { productName: { contains: productName as string } } },
          { store: { name: { contains: storeName as string } } },
          {
            OR: [{ user: { username: { contains: userName as string } } }],
          },
        ],
      } as any;
      if (
        start_date &&
        typeof start_date === 'string' &&
        (!end_date || typeof end_date !== 'string')
      ) {
        whereFilter.AND.push({
          createdAt: {
            gte: new Date(start_date),
            // lt: new Date(end_date),
          },
        });
      }
      if (
        end_date &&
        typeof end_date === 'string' &&
        (!start_date || typeof start_date !== 'string')
      ) {
        whereFilter.AND.push({
          createdAt: {
            // gte: new Date(start_date),
            lt: new Date(end_date),
          },
        });
      }
      if (
        start_date &&
        typeof start_date === 'string' &&
        end_date &&
        typeof end_date === 'string'
      ) {
        whereFilter.AND.push({
          createdAt: {
            gt: new Date(start_date),
            lt: new Date(end_date),
          },
        });
      }
      if (storeId) {
        whereFilter.AND.push({
          storeId: { equals: Number(storeId) },
        });
      }

      const [stockHistories, total] = await prisma.$transaction([
        prisma.stockHistory.findMany({
          where: whereFilter,
          include: {
            product: true,
            store: true,
            user: true,
          },
          skip,
          take,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.stockHistory.count({
          where: whereFilter,
        }),
      ]);

      res.status(200).json({ stockHistories, total });
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
