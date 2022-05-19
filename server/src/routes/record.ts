import { Prisma, PrismaClient } from '@prisma/client';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import RecordService, { GetAllRecordsByPatientIdResult } from '../services/RecordService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getAllRecordsByPatientIdResult: GetAllRecordsByPatientIdResult;
    let response: ApiResponse;

    const { patientId, limit, page } = req.query;

    if (page !== undefined && limit !== undefined) {
      const limitNum: number = parseInt(limit as string, 10);
      const pageNum: number = parseInt(page as string, 10);

      getAllRecordsByPatientIdResult = await RecordService.getAllRecordsByPatientId(
        patientId as string,
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
      getAllRecordsByPatientIdResult = await RecordService.getAllRecordsByPatientId(
        patientId as string,
      );

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

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId } = req.query;
    const {
      temperature,
      respRate,
      o2sat,
      sbp,
      dpb,
      rhythm,
      pain,
    } = req.body;

    const patientRecord = {
      patientId: patientId as string,
      temperature,
      respRate,
      o2sat,
      sbp,
      dpb,
      rhythm,
      pain,
    };

    const createRecordResult = await RecordService.createRecord(patientRecord);

    const response: ApiResponse = {
      status: StatusCodes.CREATED,
      data: {
        record: createRecordResult,
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

router.get('/:recordId/permission', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recordId } = req.params;

    const prisma = new PrismaClient();
    const findManyRecordPermsResult = await prisma.recordPermission.findMany({
      where: {
        recordId,
      },
    });

    const response: ApiResponse = {
      status: StatusCodes.OK,
      data: {
        permissions: findManyRecordPermsResult,
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

router.post('/:recordId/permission', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recordId } = req.params;

    const {
      patientId, doctorId, read, write, manage,
    } = req.body;

    const prisma = new PrismaClient();
    const createRecordPermResult = await prisma.recordPermission.create({
      data: {
        recordId,
        patientId,
        doctorId,
        read,
        write,
        manage,
      },
    });

    const response: ApiResponse = {
      status: StatusCodes.OK,
      data: {
        permission: createRecordPermResult,
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

export default router;
