import { Request, Response } from 'express';
import prisma from '@/prisma';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export class AccountController {
  async getSampleData(req: Request, res: Response) {
    try {
      const accounts = await prisma.user.findMany();

      res.status(200).send({
        status: 'ok',
        // msg: 'Account Created!',
        accounts,
      });
    } catch (err) {
      res.status(400).send({
        status: 'Account Registration Failed',
        msg: err,
      });
    }
  }

  async testingEmailer(req: Request, res: Response) {
    try {
      const templatePath = path.join(
        __dirname,
        '../templates',
        'emailerTest.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      
      // const compiledTemplate = handlebars.compile(templateSource);
      // const html = compiledTemplate({
      //   name: `${account.firstName} ${account.lastName}`,
      //   link: `http://localhost:3333/verify/${token}`,
      // });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: 'hanxen.20@gmail.com',
        subject: 'Welcome to CaloTiket',
        html: templateSource,
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Emailer Test Succeded!'
      });

    } catch (err) {
      res.status(400).send({
        status: 'Emailer Test Failed',
        msg: err,
      });
    }
  }

  // Create account for user
  async createAccountData(req: Request, res: Response) {
    try {
      // fetching user info
      const { firstName, lastName, email, password } = req.body;

      // Checking if email has been used
      const existingAuthor = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingAuthor) throw 'email has been used !';

      // hashing password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // Upload user registration to database
      const account = await prisma.user.create({
        data: { firstName, lastName, email, password: hashPassword },
      });

      // Setting login token
      // const payload = { id: account.idUser };
      // const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '30m' });

      // Setting template for email verification
      // const templatePath = path.join(
      //   __dirname,
      //   '../templates',
      //   'verification.hbs',
      // );
      // const templateSource = fs.readFileSync(templatePath, 'utf-8');
      // const compiledTemplate = handlebars.compile(templateSource);
      // const html = compiledTemplate({
      //   name: `${account.firstName} ${account.lastName}`,
      //   link: `http://localhost:3333/verify/${token}`,
      // });

      // await transporter.sendMail({
      //   from: process.env.MAIL_USER,
      //   to: user.email,
      //   subject: 'Welcome to CaloTiket',
      //   html: html,
      // });

      res.status(201).send({
        status: 'ok',
        msg: 'Account Created!',
        account,
      });
    } catch (err) {
      res.status(401).send({
        status: 'Account Registration Failed',
        msg: err,
      });
    }
  }
}
