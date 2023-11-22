import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import { CustomRequest, ErrorResponse } from '@/interfaces/Middlewares';
// import { User } from './models';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function tokenExtractor(req: CustomRequest, res: Response, next: NextFunction) {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer', '');
  }
  next();
}

// export async function userExtractor(req: CustomRequest, res: Response, next: NextFunction) {
//   if (!req.token) {
//     req.user = null;
//   } else {
//     const decodedToken = jwt.verify(req.token, process.env.SECRET!);
//     if (!decodedToken) {
//       req.user = null;
//     } else {
//       console.log(decodedToken);
//       // req.user = await User.findById(decodedToken);
//     }
//   }
//   next();
// }
