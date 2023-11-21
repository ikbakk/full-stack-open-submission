import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/Middlewares/MessageResponse';
import { blogsRouter, loginRouter, usersRouter } from './controllers';

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
