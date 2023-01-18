const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    response.status(400).json('password is less than 3 character')
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

module.exports = usersRouter
