import { Request, Response } from 'express';
import prisma from '@/prisma';

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const {
        discountId,
        totalPrice,
        totalDiscount,
        storeId,
        orderItemIds,
        userId,
      } = req.body;
      const order = await prisma.order.create({
        data: {
          discountId,
          totalPrice,
          totalDiscount,
          storeId,
          userId,
          orderItems: {
            connect: orderItemIds.map((id: number) => ({ id })),
          },
        },
      });
      res.status(201).json(order);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const {
        userName,
        userId,
        createdAt,
        page = 1,
        pageSize = 10,
      } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const orders = await prisma.order.findMany({
        where: {
          OR: [
            { user: { username: { contains: userName as string } } },
            { userId: Number(userId) },
            { createdAt: { gte: new Date(createdAt as string) } },
          ],
        },
        include: {
          orderItems: true,
        },
        skip,
        take,
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: { orderItems: true },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { discountId, totalPrice, totalDiscount, storeId, orderItemIds } =
        req.body;

      const order = await prisma.order.update({
        where: { id: Number(id) },
        data: {
          discountId,
          totalPrice,
          totalDiscount,
          storeId,
          orderItems: {
            connect: orderItemIds.map((id: number) => ({ id })),
          },
        },
      });

      res.status(200).json(order);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.order.delete({
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
