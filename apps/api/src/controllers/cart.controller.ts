import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CartController {
  async getCartsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const cart = await prisma.cart.findMany({
        where: { userId: userId },
      });

      res.status(200).send({
        status: 'ok',
        cart,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fething carts',
        msg: err,
      });
    }
  }

  async getCartById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const cart = await prisma.cart.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Cart Fetched!',
        cart,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fetching cart',
        msg: err,
      });
    }
  }

  // Create cart
  async createCart(req: Request, res: Response) {
    try {
      const { userId, cartProducts, discountCartId } = req.body;

      const cart = await prisma.cart.create({
        data: {
          userId,
          cartProducts,
          discountCartId,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Cart Created!',
        cart,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Create Cart!',
        msg: err,
      });
    }
  }

  // Update cart
  async updateCart(req: Request, res: Response) {
    try {
      const { id, userId, cartProducts, discountCartId } = req.body;

      const cart = await prisma.cart.update({
        where: { id: id, userId: userId },
        data: {
          cartProducts,
          discountCartId,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Cart Updated!',
        cart,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Update Cart!',
        msg: err,
      });
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const cart = await prisma.cart.delete({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Cart Deleted!',
        cart,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error deleting cart',
        msg: err,
      });
    }
  }
}
