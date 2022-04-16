/* eslint-disable max-classes-per-file */
import HttpStatusCodes from 'http-status-codes';

export abstract class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor(name: string, msg: string, httpStatus: number) {
    super(msg);
    this.name = name;
    this.HttpStatus = httpStatus;
  }
}

export class BadRequestError extends CustomError {
  public static readonly Name = '/error/BadRequest';

  public static readonly Msg = 'BadRequest';

  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(BadRequestError.Name, BadRequestError.Msg, BadRequestError.HttpStatus);
  }
}

export class InternalServerError extends CustomError {
  public static readonly Name = '/error/InternalServerError';

  public static readonly Msg = 'Internal Server Error';

  public static readonly HttpStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;

  constructor() {
    super(BadRequestError.Name, BadRequestError.Msg, BadRequestError.HttpStatus);
  }
}
