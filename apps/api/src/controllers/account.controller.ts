import { Request, Response } from 'express';
import prisma from '@/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export class AccountController {
  // fetching user's data
  async getUsersData(req: Request, res: Response) {
    try {

      const accounts = await prisma.user.findMany();

      res.status(200).send({
        status: 'ok',
        // msg: 'Account Created!',
        accounts,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error fething users data',
        msg: err,
      });
    }
  }

  async getUserDetail(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const account = await prisma.user.findUnique({
        where: { id: id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Account Detail Fetched!',
        account,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error fetching user detail',
        msg: err,
      });
    }
  }

  // For testing nodemailer and changing verified status after registration without using front end
  async testingEmailer(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const findAcc = await prisma.user.findUnique({
        where: { email: email },
      });

      if (findAcc) {
        const templatePath = path.join(
          __dirname,
          '../templates',
          'emailerTest.hbs',
        );

        const templateSource = fs.readFileSync(templatePath, 'utf-8');

        const compiledTemplate = handlebars.compile(templateSource);

        const html = compiledTemplate({
          name: `${findAcc.firstName} ${findAcc.lastName}`,
        });

        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: `${findAcc.email}`,
          subject: '(TESTING) Verify Account Grocery G6',
          html: html,
        });

        await prisma.user.update({
          where: { email: email },
          data: {
            isVerify: 1,
          },
        });

        res.status(200).send({
          status: 'ok',
          msg: 'Emailer Test Succeded!',
        });
      } else {
        throw 'Account Not Found!';
      }
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  // Create account for user
  async createAccountData(req: Request, res: Response) {
    try {
      // fetching user info
      const { firstName, lastName, email, password, mobileNum } = req.body;

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
        data: { firstName, lastName, email, password: hashPassword, mobileNum },
      });

      // Setting login token
      // const payload = { id: account.id };
      // const token = sign(payload, process.env.SECRET_JWT!, {
      //   expiresIn: '30m',
      // });

      // // Setting template for email verification
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
      //   to: account.email,
      //   subject: 'Verify Account Grocery G6',
      //   html: html,
      // });

      res.status(201).send({
        status: 'ok',
        msg: 'Account Created!',
        account,
      });
    } catch (err) {
      res.status(401).send({
        status: 'Account Registration Failed!',
        msg: err,
      });
    }
  }

  // Reguler login process
  async loginAccount(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!existingUser) throw 'Account not found!';
      if (!existingUser.isVerify) throw 'Account not verify !';

      const isValidPass = await compare(password, existingUser.password);

      if (!isValidPass) throw 'incorrect password!';

      const payload = {
        id: existingUser.id,
        role: existingUser.role,
      };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      res.status(200).send({
        status: 'ok',
        msg: 'login success!',
        token,
        user: existingUser,
      });
    } catch (err) {
      res.status(401).send({
        status: 'error login',
        msg: err,
      });
    }
  }
}
