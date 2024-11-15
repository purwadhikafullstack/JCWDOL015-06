import { Request, Response } from 'express';
import prisma from '@/prisma';

export class StockController {
  async getStocks(req: Request, res: Response) {
    try {
      const stocks = await prisma.stock.findMany();

      res.status(200).send({
        status: 'ok',
        stocks,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fething stocks data',
        msg: err,
      });
    }
  }

  async getStockById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const stock = await prisma.stock.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Stock Detail Fetched!',
        stock,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fetching stock detail',
        msg: err,
      });
    }
  }

  // Create stock
  async createStock(req: Request, res: Response) {
    try {
      const { storeId, productId, stock } = req.body;

      const s = await prisma.stock.create({
        data: {
          storeId,
          productId,
          stock,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Stock Created!',
        s,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Create Stock!',
        msg: err,
      });
    }
  }

  // Update stock
  async updateStock(req: Request, res: Response) {
    try {
      const { id, storeId, productId, stock } = req.body;

      const s = await prisma.stock.update({
        where: { id: id },
        data: {
          storeId,
          productId,
          stock,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Stock Updated!',
        s,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Update Stock!',
        msg: err,
      });
    }
  }

  async deleteStock(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const stock = await prisma.stock.delete({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Stock Deleted!',
        stock,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error deleting stock',
        msg: err,
      });
    }
  }
}
