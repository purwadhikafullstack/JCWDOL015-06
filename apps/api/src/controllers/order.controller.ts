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
          // {
          //   orderItems: {
          //     product: { productName: { contains: productName as string } },
          //   },
          // },
          { store: { name: { contains: storeName as string } } },
          {
            OR: [
              { user: { username: { contains: userName as string } } },
              { user: { firstName: { contains: userName as string } } },
              { user: { lastName: { contains: userName as string } } },
            ],
          },
        ],
      } as any;

      if (storeId) {
        whereFilter.AND.push({
          storeId: { equals: Number(storeId) },
        });
      }
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

      const [orders, total] = await prisma.$transaction([
        prisma.order.findMany({
          where: whereFilter,
          include: {
            orderItems: {
              include: {
                product: true,
                discount: true,
              },
            },
            store: true,
            discount: true,
          },
          skip,
          take,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.order.count({
          where: whereFilter,
        }),
      ]);

      res.status(200).json({ orders, total });
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
        include: {
          orderItems: {
            include: {
              product: true,
              discount: true,
            },
          },
          discount: true,
          store: true,
        },
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
            set: orderItemIds.map((id: number) => ({ id })),
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
