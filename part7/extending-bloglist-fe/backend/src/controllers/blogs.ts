import { Request, Response, Router } from 'express';
import { Blog } from '../models';
import { CustomRequest } from '@/interfaces/Middlewares';

const blogsRouter = Router();

blogsRouter.get('/', async (req: Request, res: Response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req: CustomRequest, res: Response) => {
  const { title, author, url, likes } = req.body;
  const user = req.user;
  console.log(user);

  if (!user) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user: user.id,
  });

  if (!title || !url) {
    return res.status(400).json({
      error: 'title and url are required',
    });
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (req: CustomRequest, res: Response) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!user) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }

  if (blog?.user.toString() === req?.user?.id) {
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } else {
    return res.status(401).json({
      error: 'Unauthorized to delete the blog',
    });
  }
});

blogsRouter.put('/:id', async (req: Request, res: Response) => {
  const { title, author, url, likes } = req.body;

  const blog = {
    title,
    author,
    url,
    likes: likes ? likes : 0,
  };

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(blog);
});

export default blogsRouter;
