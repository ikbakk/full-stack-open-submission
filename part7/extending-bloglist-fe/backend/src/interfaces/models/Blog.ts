/* eslint-disable import/no-extraneous-dependencies */
import { Document, Types } from 'mongoose';
import User from './User';

export default interface Blog extends Document {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Types.ObjectId | User;
}
