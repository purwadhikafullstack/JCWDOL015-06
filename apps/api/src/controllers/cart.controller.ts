import { Request, Response } from 'express';
import prisma from '@/prisma';
import { CartItem } from '@prisma/client';

export class CartController {
  async createCart(req: Request, res: Response) {
    try {
      const { storeId, userId } = req.body;

      const cart = await prisma.cart.create({
        data: {
          storeId,
          userId,
          totalDiscount: 0,
          totalPrice: 0,
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
      const { userId, storeId, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const whereFilter = {
        AND: [{ userId: Number(userId) }],
      } as any;

      if (storeId) {
        whereFilter.AND.push({ storeId: Number(storeId) });
      }

      const [carts, total] = await prisma.$transaction([
        prisma.cart.findMany({
          where: whereFilter,
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
          where: whereFilter,
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
      const { discountId, totalPrice, totalDiscount, cartItems } = req.body;

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({
          status: 'error',
          msg: 'cartItems array must be provided and cannot be empty.',
        });
      }

      // Update cartItem
      await prisma.cartItem.deleteMany({
        where: { cartId: Number(id) },
      });

      await Promise.all(
        cartItems.map(async (cartItem: any) => {
          const {
            productId,
            quantity,
            discountId: cartItemDiscountId,
            totalPrice,
            totalDiscount,
          } = cartItem;

          return prisma.cartItem.create({
            data: {
              cartId: Number(id),
              productId,
              quantity,
              discountId: cartItemDiscountId || null,
              totalPrice,
              totalDiscount,
            },
          });
        }),
      );

      const cart = await prisma.cart.update({
        where: { id: Number(id) },
        data: {
          discountId,
          totalPrice,
          totalDiscount,
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
