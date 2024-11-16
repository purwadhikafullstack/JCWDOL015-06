import { Request, Response } from 'express';
import prisma from '@/prisma';
import { AppliedDiscountType, DiscountType } from '@prisma/client';

export class DiscountController {
  async createDiscount(req: Request, res: Response) {
    try {
      const {
        name,
        discountType,
        appliedDiscountType,
        discountPercentage,
        discountAmount,
        appliedOnProductIds,
      } = req.body;
      const discount = await prisma.discount.create({
        data: {
          name,
          discountType,
          appliedDiscountType,
          discountPercentage,
          discountAmount,
          ProductDiscount: {
            create: appliedOnProductIds.map((productId: number) => ({
              productId,
            })),
          },
        },
      });
      res.status(201).json(discount);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getDiscounts(req: Request, res: Response) {
    try {
      const {
        appliedDiscountType,
        discountType,
        name,
        page = 1,
        pageSize = 10,
      } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [discounts, total] = await prisma.$transaction([
        prisma.discount.findMany({
          where: {
            AND: [
              {
                appliedDiscountType: appliedDiscountType as AppliedDiscountType,
              },
              { discountType: discountType as DiscountType },
              { name: { contains: name as string } },
            ],
          },
          include: {
            ProductDiscount: {
              include: {
                product: true,
              },
            },
          },
          skip,
          take,
        }),
        prisma.discount.count({
          where: {
            AND: [
              {
                appliedDiscountType: appliedDiscountType as AppliedDiscountType,
              },
              { discountType: discountType as DiscountType },
              { name: { contains: name as string } },
            ],
          },
        }),
      ]);

      res.status(200).json({ discounts, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getDiscountById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const discount = await prisma.discount.findUnique({
        where: { id: Number(id) },
        include: {
          ProductDiscount: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!discount) {
        return res.status(404).json({ error: 'Discount not found' });
      }

      res.status(200).json(discount);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateDiscount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        name,
        discountType,
        appliedDiscountType,
        discountPercentage,
        discountAmount,
        appliedOnProductIds,
      } = req.body;

      const discount = await prisma.discount.update({
        where: { id: Number(id) },
        data: {
          name,
          discountType,
          appliedDiscountType,
          discountPercentage,
          discountAmount,
        },
      });

      // Update ProductDiscounts
      await prisma.productDiscount.deleteMany({
        where: { discountId: Number(id) },
      });

      await prisma.productDiscount.createMany({
        data: appliedOnProductIds.map((productId: number) => ({
          discountId: Number(id),
          productId,
        })),
      });

      res.status(200).json(discount);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteDiscount(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.discount.delete({
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
