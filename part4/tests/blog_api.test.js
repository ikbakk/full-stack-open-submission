const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


let token
const initialBlogs = [
    { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', name: 'Master User', password: passwordHash })

    await user.save()

    const userForToken = {
        username: user.username,
        id: user.id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    await Blog.deleteMany({})
    blogs = initialBlogs.map(blog => new Blog({ ...blog, user: user.id }))
    await Blog.insertMany(initialBlogs)
})

test('correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifying field is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const initialResponse = await api.get('/api/blogs')

    const newBlog = {
        title: "Full Stack",
        author: "StackMaster",
        url: "https://stack.com/",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialResponse.body.length + 1)
})

test('if blog is added with no votes zero will be assumed', async () => {
    const newBlog = {
        title: "Half Stack",
        author: "StackDiscipline",
        url: "https://halfstack.com/"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)

    expect(response.body.likes).toBeDefined()
})

test('if blog is added with no url or title it will not be added', async () => {
    const newBlog = {
        author: null,
        url: "https://stack.com/",
        likes: 1
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)

    expect(response.status).toBe(400)
})

test('a blog may be removed by issuing http delete request', async () => {
    const newBlog = {
        title: "Full Stack",
        author: "StackMaster",
        url: "https://stack.com/",
        likes: 1
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)

    const response = await api.get(`/api/blogs/${result.body.id}`)
    const deleteBlog = await api
        .delete(`/api/blogs/${result.body.id}`)
        .set('Authorization', `bearer ${token}`)
    expect(deleteBlog.status).toBe(204)
})

test('a blog may be edited by issuing http put request', async () => {
    const newBlog = {
        title: "Full Stack",
        author: "StackMaster",
        url: "https://stack.com/",
        likes: 1
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)

    newBlog.likes += 1

    await api
        .put(`/api/blogs/${result.body.id}`)
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
    const newResult = await api.get(`/api/blogs/${result.body.id}`)
    expect(newResult.body.likes).toBe(newBlog.likes)
})

test('cannot add blogs without a valid token', async () => {
    const newBlog = {
        title: "Full Stack",
        author: "StackMaster",
        url: "https://stack.com/",
        likes: 1
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer badly forged token`)

    expect(response.status).toBe(401)
})

afterAll(() => {
    mongoose.connection.close()
})