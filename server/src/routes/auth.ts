import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import LoginService from "../services/LoginService";
import { BadRequestError, InternalServerError } from "../shared/errors";
import { ApiResponse } from "../types";

const router = Router();
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
      const { publicAddress, nonce, username } = req.body;
      const setUser = await LoginService.setUserByPublicAddress(
        nonce,
        publicAddress,
        username
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
