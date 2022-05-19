import { Prisma } from '@prisma/client';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import RecordService, { GetAllRecordsByPatientIdResult } from '../services/RecordService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse } from '../types';

const router = Router();

router.get('/:patientId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getAllRecordsByPatientIdResult: GetAllRecordsByPatientIdResult;
    let response: ApiResponse;

    const { patientId } = req.params;

    const { limit, page } = req.query;

    if (page !== undefined && limit !== undefined) {
      const limitNum: number = parseInt(limit as string, 10);
      const pageNum: number = parseInt(page as string, 10);

      getAllRecordsByPatientIdResult = await RecordService.getAllRecordsByPatientId(
        patientId,
        {
          limit: limitNum,
          page: pageNum,
        },
      );
      response = {
        status: StatusCodes.OK,
        data: {
          records: getAllRecordsByPatientIdResult.data,
        },
        _pagination: {
          page: pageNum,
          page_limit: limitNum,
          count: getAllRecordsByPatientIdResult.count,
          page_count: Math.ceil(getAllRecordsByPatientIdResult.count / limitNum),
        },
      };
    } else {
      getAllRecordsByPatientIdResult = await RecordService.getAllRecordsByPatientId(patientId);

      response = {
        status: StatusCodes.OK,
        data: {
          records: getAllRecordsByPatientIdResult.data,
        },
      };
    }

    res.status(StatusCodes.OK).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError());
      return;
    }
    next(new InternalServerError());
  }
});

export default router;
