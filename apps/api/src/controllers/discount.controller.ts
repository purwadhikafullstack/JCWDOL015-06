import { Request, Response } from 'express';
import prisma from '@/prisma';

export class DiscountController {
  async getDiscounts(req: Request, res: Response) {
    try {
      const discounts = await prisma.discount.findMany();

      res.status(200).send({
        status: 'ok',
        discounts,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fething discounts',
        msg: err,
      });
    }
  }

  async getDiscountById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const discount = await prisma.discount.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Discount Detail Fetched!',
        discount,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error fetching discount',
        msg: err,
      });
    }
  }

  // Create discount
  async createDiscount(req: Request, res: Response) {
    try {
      const {
        name,
        discountType,
        discountAmount,
        discountPercentage,
        appliedDiscountType,
        Product,
        Cart,
      } = req.body;

      const existingDiscountName = await prisma.discount.findUnique({
        where: { name: name },
      });

      if (existingDiscountName) throw 'duplicate discount name!';

      const discount = await prisma.discount.create({
        data: {
          name,
          discountType,
          discountAmount,
          discountPercentage,
          appliedDiscountType,
          Product,
          Cart,
        },
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Discount Created!',
        discount,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Create Discount!',
        msg: err,
      });
    }
  }

  // Update discount
  async updateDiscount(req: Request, res: Response) {
    try {
      const {
        id,
        name,
        discountType,
        discountAmount,
        discountPercentage,
        appliedDiscountType,
        Product,
        Cart,
      } = req.body;

      const existingDiscountName = await prisma.discount.findUnique({
        where: { name: name },
      });

      if (existingDiscountName) throw 'duplicate discount name!';

      const discount = await prisma.discount.update({
        where: { id: id },
        data: {
          name,
          discountType,
          discountAmount,
          discountPercentage,
          appliedDiscountType,
          Product,
          Cart,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Discount Updated!',
        discount,
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed to Update Discount!',
        msg: err,
      });
    }
  }

  async deleteDiscount(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const discount = await prisma.discount.delete({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Discount Deleted!',
        discount,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error deleting discount',
        msg: err,
      });
    }
  }
}
