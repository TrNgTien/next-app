import { IApplicationError } from '@/constants';
import { Response } from 'express';

class ApplicationError extends Error {
  statusCode: number;
  messageCode?: string;

  constructor(opts: IApplicationError) {
    const { message, messageCode, statusCode = 400 } = opts;
    super(message);

    this.statusCode = statusCode;
    this.messageCode = messageCode;
  }
}

export const getError = (opts: {
  statusCode?: number;
  messageCode?: string;
  message: string;
}) => {
  const error = new ApplicationError(opts);
  return error;
};

export const errorResponse = (opts: { res: Response; e: any }) => {
  const { e, res } = opts;
  res.status(e.statusCode).json({ message: e.message });
};

export const responseSuccess = (opts: { res: Response; payload: unknown }) => {
  const { res, payload = null } = opts;

  res.status(200).json(payload);
};
