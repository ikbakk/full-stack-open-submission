const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
require('express-async-errors')

const Blog = require('../models/blogs')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = BlogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('HTTP POST /api/blogs with no title or url ', () => {
  test('with no title', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f9',
      author: 'asdasdasad',
      url: 'https://reactpatterns.com/',
      likes: 100,
      __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('with no url', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f9',
      title: 'who is who',
      author: 'asdasdasad',
      likes: 100,
      __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
