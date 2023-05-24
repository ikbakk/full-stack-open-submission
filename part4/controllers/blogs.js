const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token && !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: 'unauthorized operation' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  });
  response.json(updatedBlog.toJSON());
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body;
  const token = request.token;
  const user = request.user;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!(token && decodedToken)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (!title) {
    return response.status(401).json({ error: 'Title is missing' });
  }

  if (!author) {
    return response.status(401).json({ error: 'Author is missing' });
  }

  if (!url) {
    return response.status(401).json({ error: 'Url is missing' });
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

module.exports = blogsRouter;
