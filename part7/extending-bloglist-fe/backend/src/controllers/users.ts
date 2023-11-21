import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User } from '../models';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
  res.json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  if (username === undefined || password === undefined) {
    return res.status(400).json({
      error: 'username or password must be given',
    });
  } else if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'username or password must be at least 3 characters long',
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  }
});

export default usersRouter;
