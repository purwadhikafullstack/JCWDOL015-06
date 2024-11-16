import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Role } from '@prisma/client';

export class StoreAdminController {
  async createStoreAdmin(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        firstName,
        lastName,
        storeId,
        mobileNum,
      } = req.body;
      const storeAdmin = await prisma.user.create({
        data: {
          username,
          email,
          password,
          role: Role.STORE_ADMIN,
          isVerify: 1,
          firstName,
          lastName,
          storeId,
          mobileNum,
        },
      });
      res.status(201).json(storeAdmin);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStoreAdmins(req: Request, res: Response) {
    try {
      const { name, role, page = 1, pageSize = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const [storeAdmins, total] = await prisma.$transaction([
        prisma.user.findMany({
          where: {
            AND: [
              {
                OR: [
                  { firstName: { contains: name as string } },
                  { lastName: { contains: name as string } },
                  { email: { contains: name as string } },
                ],
              },
              { role: role as Role },
            ],
          },
          skip,
          take,
          include: {
            store: true,
          },
        }),
        prisma.user.count({
          where: {
            AND: [
              {
                OR: [
                  { firstName: { contains: name as string } },
                  { lastName: { contains: name as string } },
                  { email: { contains: name as string } },
                ],
              },
              { role: 'STORE_ADMIN' },
            ],
          },
        }),
      ]);

      res.status(200).json({ storeAdmins, total });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getStoreAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const storeAdmin = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { store: true },
      });

      if (!storeAdmin) {
        return res.status(404).json({ error: 'Store Admin not found' });
      }

      res.status(200).json(storeAdmin);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateStoreAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        username,
        email,
        password,
        firstName,
        lastName,
        storeId,
        mobileNum,
      } = req.body;

      const storeAdmin = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          username,
          email,
          password,
          firstName,
          lastName,
          storeId,
          mobileNum,
        },
      });

      res.status(200).json(storeAdmin);
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteStoreAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
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
