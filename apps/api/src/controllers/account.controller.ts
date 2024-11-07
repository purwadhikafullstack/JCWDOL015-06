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
    } catch (error) {
      res.status(400).send({
        status: 'error fething users data',
        msg: error,
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
    } catch (error) {
      res.status(400).send({
        status: 'error',
        msg: error,
      });
    }
  }

  // Create account for user
  async createAccountData(req: Request, res: Response) {
    console.log('\n\nAPI REGISTER STARTS\n\n');

    try {
      // fetching user info
      const { firstName, lastName, email, password, mobileNum } = req.body;

      // Checking if email has been used
      const existingAuthor = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingAuthor) throw 'Email Has Been Used !';

      // hashing password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // Upload user registration to database
      const account = await prisma.user.create({
        data: { firstName, lastName, email, password: hashPassword, mobileNum },
      });

      // Setting login token
      const payload = { id: account.id };
      const token = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '1d',
      });

      // Setting template for email verification
      const templatePath = path.join(
        __dirname,
        '../templates',
        'verification.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: `${account.firstName} ${account.lastName}`,
        link: `${process.env.NEXT_URL}verification/${token}`,
      });
      // const html = compiledTemplate({
      //   name: `${account.firstName} ${account.lastName}`,
      //   link: `http://localhost:3333/verify/${token}`,
      // });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: account.email,
        subject: 'Verify Account Grocery G6',
        html: html,
      });

      res.status(201).send({
        status: 'ok',
        msg: 'Account Created!',
        account,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error register',
        msg: error,
      });
    }
  }

  // Reguler login process
  async loginAccount(req: Request, res: Response) {
    try {
      console.log('\n\n\n CONTROLLER REGULER LOGIN START\n\n ');

      console.log('BODY CONTENT, ', req.body.email);

      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      // Checking if email has ever been registered
      if (!existingUser) {
        throw 'Account not found!';
      }

      // Checking if user register regulary or not
      if (password == 'not-provided') {
        throw 'This Account Is Registered With Social, Please Login Through Social';
      }

      // Checking if account has been verified
      if (!existingUser.isVerify) {
        throw 'Account not verify !';
      }

      const isPasswordValid = await compare(password, existingUser.password);

      // Checking passwird validity
      if (!isPasswordValid) {
        throw 'incorrect password!';
      }

      console.log('\n\n\n LOGIN API, NO PROBLEM \n\n');

      // Creating token
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role,
      };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      res.status(200).send({
        status: 'ok',
        msg: 'login success!',
        token,
        // user: existingUser,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error login',
        msg: error,
      });
    }
  }

  async loginGoogle(req: Request, res: Response) {
    try {
      // additionals for fetching user's access token
      const googleSecret = process.env.CLIENT_SECRET;
      const googleId = process.env.CLIENT_ID;
      const googleAcccesTokenUrl = process.env.GOOGLE_ACCESS_TOKEN_URL;

      // fetch authorization code after login consent page
      console.log(req.query);
      const { code } = req.query;

      const data = {
        code,
        client_id: googleId,
        client_secret: googleSecret,
        redirect_uri: `http://localhost:${process.env.PORT}/api/account/google`,
        grant_type: 'authorization_code',
      };

      console.log(data);

      // exchange authorization code for access token & id_token
      const response = await fetch(`${googleAcccesTokenUrl}`, {
        method: 'POST',

        body: JSON.stringify(data),
      });

      const access_token_data = await response.json();
      console.log(access_token_data);

      if (!access_token_data.access_token)
        throw `${access_token_data.error} ${access_token_data.error_description}`;

      const { id_token } = access_token_data;
      console.log(id_token);

      // verify and extract google profile's information by the id token
      const token_info_response = await fetch(
        `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`,
      );

      // User's google profile
      const tokenInfoRes = await token_info_response.json();

      // res.status(token_info_response.status).send({
      //   status: 'ok',
      //   msg: tokenInfoRes,
      // });

      // Set certain detail in data from google' profile
      const { email, email_verified, given_name, family_name, picture } =
        tokenInfoRes;

      if (!email_verified) throw 'Google Account Not Verified!';

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      // Check if email logged by google already exist
      if (existingUser) {
        // Setting token
        const payload = {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          role: existingUser.role,
        };

        const token = sign(payload, process.env.SECRET_JWT!, {
          expiresIn: '1d',
        });

        // res
        //   .status(200)
        //   .send({
        //     status: 'ok',
        //     msg: 'login success!',
        //     token,
        //     user: existingUser,
        //   })
        //   .redirect(`${process.env.NEXT_URL}/authGoogle/callback?token=${token}`);

        res.redirect(
          `${process.env.NEXT_URL}/authGoogle/callback?token=${token}`,
        );
      } else {
        // Upload user registration to database
        const account = await prisma.user.create({
          data: {
            firstName: given_name,
            lastName: family_name,
            email,
            password: 'not-provided',
            mobileNum: 0,
            avatar: picture,
          },
        });

        // Setting token
        const payload = {
          id: account.id,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          role: 'REGULER',
        };

        const token = sign(payload, process.env.SECRET_JWT!, {
          expiresIn: '1d',
        });

        // res
        //   .status(201)
        //   .send({
        //     status: 'ok',
        //     msg: 'login success!',
        //     token,
        //     user: account,
        //   })
        //   .redirect(`${process.env.NEXT_URL}/authGoogle/callback?token=${token}`);

        res.redirect(
          `${process.env.NEXT_URL}/authGoogle/callback?token=${token}`,
        );
      }
    } catch (error) {
      res.status(401).send({
        status: 'error login',
        msg: error,
      });
    }
  }

  async oauthCreds(req: Request, res: Response) {
    try {
      const GOOGLE_CALLBACK_URL = `http%3A//localhost:${process.env.PORT}/api/account/google`;

      const GOOGLE_OAUTH_SCOPES = [
        'https%3A//www.googleapis.com/auth/userinfo.email',
        'https%3A//www.googleapis.com/auth/userinfo.profile',
      ];

      const state = 'some_state';
      const scopes = GOOGLE_OAUTH_SCOPES.join(' ');

      const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

      // const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.NEXT_URL}/auth/callback&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

      res.status(200).send({
        status: 'ok',
        url: GOOGLE_OAUTH_CONSENT_SCREEN_URL,
      });
    } catch (error) {
      res.status(401).send({
        status: 'error login',
        msg: error,
      });
    }
  }

  async profileDetail(req: Request, res: Response) {
    try {
      const userDetail = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!userDetail) throw 'User Detail Not Found!';

      res.status(200).send({
        status: 'ok',
        user: userDetail,
        tokenDetail: req.user,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error profile',
        msg: error,
      });
    }
  }

  async verifyAccount(req: Request, res: Response) {
    console.log('\n\n\n API VERIFICATION STARTS');
    
    try {
      const userDetail = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!userDetail) throw 'User Detail Not Found!';

      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          isVerify: 1,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Account Successfully Verified!',
      });
    } catch (error) {
      res.status(400).send({
        status: 'error account verification',
        msg: error,
      });
    }
  }
}
