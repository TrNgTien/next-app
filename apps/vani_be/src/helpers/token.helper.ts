import { getError } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { environment } from './environment.helper';

export const generateToken = (
  payload: string | Buffer | object,
  tokenOptions?: SignOptions,
) => {
  return jwt.sign(payload, environment.get('APP_ENV_SECRET_TOKEN'), {
    ...tokenOptions,
    expiresIn: '1d',
  });
};

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const tokenHeader = req.headers.authorization ?? '';

  if (!tokenHeader) {
    throw getError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
  const token = tokenHeader.split(' ')[1];

  const verify: any = jwt.verify(
    token,
    environment.get('APP_ENV_SECRET_TOKEN'),
  );

  if (!verify) {
    throw getError({
      statusCode: 403,
      message: 'Access Denied',
    });
  }

  const date = new Date();

  if (verify.exp < date.getTime() / 1000) {
    throw getError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  next();
};
