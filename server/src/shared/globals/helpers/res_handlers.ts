import { Response, Request } from 'express';

const res_withData = (res: Response, statusCode: number, data: any): Response => res.status(statusCode).json(data);
const res_custom = (res: Response, statusCode: number, message: string, data: any) =>
  res.status(statusCode).json({ message: message, data: data, success: true });
const res_ok = (res: Response, data: any): Response => res_withData(res, 200, { data, message: 'Success', statusCode: 200, success: true });
const res_created = (res: Response, data: any): Response =>
  res_withData(res, 201, { data, message: 'Created successfully', statusCode: 201, success: true });
const res_updated = (res: Response, data: any): Response =>
  res_withData(res, 200, { data, message: 'Updated successfully', statusCode: 200, success: true });
const res_deleted = (res: Response, data: any): Response =>
  res_withData(res, 200, { data, message: 'Deleted successfully', statusCode: 200, success: true });

const res_unauthorized = (res: Response): Response => res_withData(res, 401, { statusCode: 401, message: 'Unauthorized', success: false });

const res_badReq = (res: Response, msg: string): Response =>
  res_withData(res, 400, { statusCode: 400, message: msg ? msg : 'Bad Request 400', success: false });
const res_notFound = (res: Response) => res_withData(res, 404, { statusCode: 404, message: 'Resource Not Found', success: false });
const res_errorServer = (res: Response) =>
  res_withData(res, 500, { statusCode: 500, message: 'Something wrong with server !!!', success: false });
const res_error = (res: Response, errors: Error) => res_withData(res, 200, { success: false, message: 'Errors', errors: errors.array() });
export {
  res_error,
  res_withData,
  res_ok,
  res_created,
  res_custom,
  res_unauthorized,
  res_badReq,
  res_notFound,
  res_errorServer,
  res_deleted,
  res_updated
};
