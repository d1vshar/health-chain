import { Prisma } from '@prisma/client';
import { ethers } from 'ethers';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import signJwt from '../auth/jwt';
import AuthService, { GetAuthByPublicAddressResult } from '../services/AuthService';
import { BadRequestError, InternalServerError } from '../shared/errors';
import { ApiResponse, AuthInterface } from '../types';

const router = Router();

router.get('/:publicAddress', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { publicAddress } = req.params;
    const getAuthByPublicAddressResult: GetAuthByPublicAddressResult = await AuthService
      .getAuthByPublicAddress(publicAddress);

    let status = StatusCodes.OK;
    if (getAuthByPublicAddressResult.data === null) status = StatusCodes.NOT_FOUND;

    const response: ApiResponse = {
      status,
      data: {
        auth: getAuthByPublicAddressResult.data,
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

router.post('/:publicAddress', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { publicAddress } = req.params;
    const { signature } = req.body;

    let response: ApiResponse;
    let authData: AuthInterface;

    const getAuthByPublicAddressResult: GetAuthByPublicAddressResult = await AuthService
      .getAuthByPublicAddress(publicAddress);

    if (getAuthByPublicAddressResult.data) {
      const decodedAddress = ethers.utils.verifyMessage(
        getAuthByPublicAddressResult.data.nonce.toString(),
        signature,
      );

      console.log(decodedAddress, publicAddress);

      if (decodedAddress === publicAddress) {
        const token = signJwt({
          id: getAuthByPublicAddressResult.data.userId,
          address: getAuthByPublicAddressResult.data.publicAddress,
          role: getAuthByPublicAddressResult.data.role,
        });

        authData = {
          verificationResult: true,
          token,
          id: getAuthByPublicAddressResult.data.userId,
        };

        response = {
          status: StatusCodes.ACCEPTED,
          data: {
            auth: authData,
          },
        };

        res.status(StatusCodes.ACCEPTED).json(response);
        return;
      }

      authData = {
        verificationResult: false,
      };

      response = {
        status: StatusCodes.UNAUTHORIZED,
        data: {
          auth: authData,
        },
      };

      res.status(StatusCodes.UNAUTHORIZED).json(response);
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError());
      return;
    }
    next(new InternalServerError());
  }
});

export default router;
