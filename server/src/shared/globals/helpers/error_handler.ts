import HTTP_STATUS from 'http-status-codes';
const { OK, CREATED } = HTTP_STATUS;

export interface IErrorRes {
  message: string;
  statusCode: number;
  status: string;
  success: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,

    };
  }
}

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}
export class BadReqError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class JoiReqValidation extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}

export class JoiReqValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';
  constructor(message: string) {
    super(message);
  }
}
// export {JoiReqValidation,BadReqError,NotFoundError,FileTooLargeError,NotAuthorizedError,}
