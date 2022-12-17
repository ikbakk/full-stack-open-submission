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

describe('HTTP GET /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
