const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  if (request.body.title === undefined) {
    response.status(400).json('title not found')
  } else if (request.body.url === undefined) {
    response.status(400).json('url not found')
  } else {
    const blog = new Blog(request.body)
    blog.save().then((result) => {
      response.status(201).json(result)
    })
  }
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
