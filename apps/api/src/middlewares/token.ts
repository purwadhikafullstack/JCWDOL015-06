import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type IUser = {
  id: number;
  email: string;
  role: string;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('\n\n API TOKEN VERIFICATION');
    
    const token =
      req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token); // Log the token

    if (!token) throw new Error('Token is missing');

    const verifiedToken = verify(token, process.env.SECRET_JWT!);
    console.log('Verified Token:', verifiedToken); // Log the verified token

    req.user = verifiedToken as IUser;

    next();
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(401).send({
      status: 'error',
      msg: 'Invalid or expired token',
    });
  }
};

