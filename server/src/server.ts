import './config';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/api';
import { CustomError } from './shared/errors';
import { ApiResponse } from './types';

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', apiRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | CustomError, _: Request, res: Response, _next: NextFunction) => {
  const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
  const respone: ApiResponse = {
    status,
    errors: [
      {
        error: err.name,
        message: err.message,
      },
    ],
  };

  return res.status(status).json(respone);
});

export default app;
