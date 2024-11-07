// import { NextFunction } from "express";

// const GOOGLE_CALLBACK_URL = 'http%3A//localhost:8000/api/account/google';
// const GOOGLE_OAUTH_SCOPES = [
// 'https%3A//www.googleapis.com/auth/userinfo.email',
// 'https%3A//www.googleapis.com/auth/userinfo.profile',
// ];

// export const googleCredentials = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {

//     next();
//   } catch (err) {
//     console.error('Error:', err); // Log the error
//     res.status(400).send({
//       status: 'error',
//       msg: 'Invalid or expired token',
//     });
//   }
// };