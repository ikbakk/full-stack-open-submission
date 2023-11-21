/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import { User } from '@/interfaces/models';

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<User>('User', userSchema);

export default User;
