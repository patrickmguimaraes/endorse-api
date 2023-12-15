import httpStatus from 'http-status';
import {config} from '../config/db.config';
import {logger} from '../config/logger';
import ApiError from '../utils/ApiError';

export const errorConverter = (err: any, req: any, res: any, next: any) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (er: any, req: any, res: any, next: any) => {
  let { statusCode, message } = er;
  if (config.env === 'production' && !er.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = er.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: er.stack }),
  };

  if (config.env === 'development') {
    logger.error(er);
  }

  res.status(statusCode).send(response);
};