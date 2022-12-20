const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
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
  if (request.body.title == undefined) {
    response.status(400).json('title not found')
  } else if (request.body.url == undefined) {
    response.status(400).json('url not found')
  } else {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

module.exports = blogsRouter
