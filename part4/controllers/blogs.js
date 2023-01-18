const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined) {
    response.status(400).json('title not found')
  } else if (request.body.url === undefined) {
    response.status(400).json('url not found')
  } else {
    const body = request.body
    const user = await User.findById(body.userId)

    const newBlog = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user.id
    }
    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  }
})

module.exports = blogsRouter
