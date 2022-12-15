const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', name: 'Master User', password: passwordHash })

    await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const newUser = {
        username: 'user',
        name: 'Stack Master',
        password: 'ultimateHax',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const users = await api.get('/api/users')
    const usernames = users.body.map(user => user.username)
    expect(usernames).toContain(newUser.username)
})

test('creation fails when username already exists', async () => {
    const newUser = {
        username: 'user',
        name: 'Stack Master',
        password: 'ultimateHax',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('creation fails when password too short', async () => {
    const newUser = {
        username: 'user',
        name: 'Stack Master',
        password: 'aa',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})