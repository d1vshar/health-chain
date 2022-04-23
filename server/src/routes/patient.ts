import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PatientService } from "../services";
import LoginService from "../services/LoginService";
import { GetAllPatientsResult } from "../services/PatientService";
import { BadRequestError, InternalServerError } from "../shared/errors";
import { ApiResponse } from "../types";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getAllPatientsResult: GetAllPatientsResult;
    let response: ApiResponse;

    const { limit, page } = req.query;

    if (page !== undefined && limit !== undefined) {
      const limitNum: number = parseInt(limit as string, 10);
      const pageNum: number = parseInt(page as string, 10);

      getAllPatientsResult = await PatientService.getAllPatients({
        limit: limitNum,
        page: pageNum,
      });
      response = {
        status: StatusCodes.OK,
        data: {
          patients: getAllPatientsResult.data,
        },
        _pagination: {
          page: pageNum,
          page_limit: limitNum,
          count: getAllPatientsResult.count,
          page_count: Math.ceil(getAllPatientsResult.count / limitNum),
        },
      };
    } else {
      getAllPatientsResult = await PatientService.getAllPatients();

      response = {
        status: StatusCodes.OK,
        data: {
          patients: getAllPatientsResult.data,
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

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const getPatientByIdResult = await PatientService.getPatientById(id);

    let status = StatusCodes.OK;
    if (getPatientByIdResult.data === null) status = StatusCodes.NOT_FOUND;
    const response: ApiResponse = {
      status,
      data: {
        patient: getPatientByIdResult.data,
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

router.get(
  "/:publicAddress",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicAddress } = req.params;

      const getUser = await LoginService.getUserByPublicAddress(publicAddress);

      let status = StatusCodes.OK;
      if (getUser.data === null) status = StatusCodes.NOT_FOUND;
      const response: ApiResponse = {
        status,
        data: {
          user: getUser.data,
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
  }
);

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicAddress, nonce, username, role } = req.body;
      const setUser = await LoginService.setUserByPublicAddress(
        nonce,
        publicAddress,
        username,
        role
      );

      let status = StatusCodes.OK;
      if (setUser.data === null) status = StatusCodes.NO_CONTENT;
      const response: ApiResponse = {
        status,
        data: {
          doctor: setUser.data,
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
  }
);

export default router;
