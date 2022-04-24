import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
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
          user: setUser.data,
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

router.post("/verify", async (req, res, next) => {
  let authenticated = false;
  const { address1, signature } = req.query;
  if (address1 === undefined || signature === undefined) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  const address = address1 as string;
  const user = await LoginService.getUserByPublicAddress(address);
  const decodedAddress = ethers.utils.verifyMessage(
    user.nonce.toString(),
    signature as string
  );
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
    authenticated = true;
  }
  res.status(200).json({ authenticated });
});

export default router;
