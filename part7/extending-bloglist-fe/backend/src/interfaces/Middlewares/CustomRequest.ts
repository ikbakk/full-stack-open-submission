import { Request } from 'express';
import { User } from '../models';

export default interface CustomRequest extends Request {
  token?: string;
  user?: User | null;
}
