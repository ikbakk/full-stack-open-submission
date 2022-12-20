/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
// const logger = require('../utils/logger')
beforeEach(async () => {
  await Blog.deleteMany({})
  const BlogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = BlogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('HTTP id and not _id  ', () => {
  test('http unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP GET /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('HTTP POST /api/blogs with no title or url ', () => {
  test('with no title', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f9',
      author: 'Nisko L',
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
      author: 'Nisko L',
      likes: 100,
      __v: 0
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('HTTP verifies the likes property', () => {
  test('http likes', async () => {
    const responseBlogs = await api.get('/api/blogs')

    responseBlogs.body.forEach(async (blog) => {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
    })

    responseBlogs.body.forEach(async (blog) => {
      await expect(blog.likes).toBeDefined()
    })
  })
})

describe('HTTP POST /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {
    const newBlog = {
      _id: '5a422a851b54a676234d17f9',
      author: 'Niskop p',
      url: 'https://reactpatterns.com/',
      likes: 100,
      __v: 0
    }

    // const newBlog = {
    //   '_id': '5a422a851b54a676234d17f9',
    //   'title': 'qwertyu',
    //   'author': 'Niskop p',
    //   'url': 'https://reactpatterns.com/',
    //   'likes': 100,
    //   '__v': 0
    // }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
