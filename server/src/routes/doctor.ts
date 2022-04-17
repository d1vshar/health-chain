import { Prisma } from '@prisma/client';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { DoctorService } from '../services';
import { GetAllDoctorsResult } from '../services/DoctorService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getAllDoctorsResult: GetAllDoctorsResult;
    let response: ApiResponse;

    const { limit, page } = req.query;

    if (page !== undefined && limit !== undefined) {
      const limitNum: number = parseInt(limit as string, 10);
      const pageNum: number = parseInt(page as string, 10);

      getAllDoctorsResult = await DoctorService.getAllDoctors({
        limit: limitNum,
        page: pageNum,
      });
      response = {
        status: StatusCodes.OK,
        data: {
          doctors: getAllDoctorsResult.data,
        },
        _pagination: {
          page: pageNum,
          page_limit: limitNum,
          count: getAllDoctorsResult.count,
          page_count: Math.ceil(getAllDoctorsResult.count / limitNum),
        },
      };
    } else {
      getAllDoctorsResult = await DoctorService.getAllDoctors();

      response = {
        status: StatusCodes.OK,
        data: {
          doctors: getAllDoctorsResult.data,
        },
      };
    }

    res.status(StatusCodes.OK).json(response);
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError());
      return;
    }
    next(new InternalServerError());
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const getDoctorByIdResult = await DoctorService.getDoctorById(id);

    let status = StatusCodes.OK;
    if (getDoctorByIdResult.data === null) status = StatusCodes.NOT_FOUND;
    const response: ApiResponse = {
      status,
      data: {
        doctor: getDoctorByIdResult.data,
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
