import { Patient, Prisma } from '@prisma/client';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import ChainService from '../service/ChainService';
import PatientService from '../service/PatientService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ChainService.getSignerAddress();
    let patientsData: Patient[];
    const { limit, page } = req.query;

    if (page !== undefined && limit !== undefined) {
      patientsData = await PatientService.getAllPatients({
        limit: parseInt(limit as string, 10),
        page: parseInt(page as string, 10),
      });
    } else {
      patientsData = await PatientService.getAllPatients();
    }

    const response: ApiResponse = {
      status: StatusCodes.OK,
      data: {
        patients: patientsData,
      },
    };
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

    const patientData = await PatientService.getPatientById(id);

    let status = StatusCodes.OK;
    if (patientData === null) status = StatusCodes.NOT_FOUND;
    const response: ApiResponse = {
      status,
      data: {
        patient: patientData,
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
