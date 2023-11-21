import { Request } from 'express';

export default interface CustomRequest extends Request {
  token?: string;
  user?: any;
}
