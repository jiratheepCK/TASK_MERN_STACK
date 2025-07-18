import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/bad-request.exception';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
  });
}