/* eslint-disable import/no-extraneous-dependencies */
import { Document, Types } from 'mongoose';
import Blog from './Blog';

export default interface User extends Document {
  username: string;
  name: string;
  passwordHash: string;
  blogs: Types.ObjectId[] | Blog[];
}
