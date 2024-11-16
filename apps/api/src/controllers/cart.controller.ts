import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CartController {
  async createCart(req: Request, res: Response) {
    try {
      const {
        discountId,
        totalPrice,
        totalDiscount,
        storeId,
        cartItemIds,
        userId,
      } = req.body;

      const cart = await prisma.cart.create({
        data: {
          discountId,
          totalPrice,
          totalDiscount,
          storeId,
          userId,
          cartItems: {
            connect: cartItemIds.map((id: number) => ({ id })),
          },
        },
      });

      res.status(201).json(cart);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getCarts(req: Request, res: Response) {
    try {
      const { userName, userId, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [carts, total] = await prisma.$transaction([
        prisma.cart.findMany({
          where: {
            OR: [
              { user: { username: { contains: userName as string } } },
              { userId: Number(userId) },
            ],
          },
          include: {
            cartItems: {
              include: {
                product: true,
                discount: true,
              },
            },
            discount: true,
            store: true,
            user: true,
          },
          skip,
          take,
        }),
        prisma.cart.count({
          where: {
            OR: [
              { user: { username: { contains: userName as string } } },
              { userId: Number(userId) },
            ],
          },
        }),
      ]);

      res.status(200).json({ carts, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getCartById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cart = await prisma.cart.findUnique({
        where: { id: Number(id) },
        include: {
          cartItems: {
            include: {
              product: true,
              discount: true,
            },
          },
          discount: true,
          store: true,
          user: true,
        },
      });

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      res.status(200).json(cart);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { discountId, totalPrice, totalDiscount, storeId, cartItemIds } =
        req.body;

      const cart = await prisma.cart.update({
        where: { id: Number(id) },
        data: {
          discountId,
          totalPrice,
          totalDiscount,
          storeId,
          cartItems: {
            set: cartItemIds.map((id: number) => ({ id })),
          },
        },
        include: {
          cartItems: {
            include: {
              product: true,
              discount: true,
            },
          },
          discount: true,
          store: true,
          user: true,
        },
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.cart.delete({
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
