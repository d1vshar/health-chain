import { Prisma } from '@prisma/client';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import AuditService from '../services/AuditService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse } from '../types';

const router = Router();

router.get('/logs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auditEvents = await AuditService.getAuditEvents();

    const response: ApiResponse = {
      status: StatusCodes.OK,
      data: {
        audit: auditEvents,
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError());
      return;
    }
    next(new InternalServerError());
  }
});

router.post('/log', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      eventAddress,
      eventType,
      status,
      accountAddress,
      ip,
    } = req.body;

    const auditData:any = {
      eventAddress,
      eventType,
      status,
      accountAddress,
      ip,
    };

    const createAuditLog = await AuditService.createAuditEvent(auditData);

    const response: ApiResponse = {
      status: StatusCodes.CREATED,
      data: {
        audit: createAuditLog,
      },
    };

    res.status(StatusCodes.CREATED).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError());
      return;
    }
    next(new InternalServerError());
  }
});
export default router;
