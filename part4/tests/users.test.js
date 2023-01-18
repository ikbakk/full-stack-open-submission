const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('user administration', () => {
  test('check that invalid users are not created, password is less than 3', async () => {
    const newUser = {
      username: 'ikbak',
      name: 'fridaus',
      password: '1j'
    }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('check that invalid users are not created, duplicate users', async () => {
    const newUser = {
      username: 'nisko',
      name: 'hector',
      password: '12j'
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
