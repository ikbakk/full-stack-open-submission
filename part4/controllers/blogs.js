const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, _id: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    if (!request.token || !request.decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(request.decodedToken.id)
    const blog = new Blog({ ...request.body, user: user._id })

    if (typeof blog.likes === 'undefined' || blog.likes === null) {
        blog.likes = 0
    }

    if (typeof blog.title === 'undefined' || blog.title === null || typeof blog.url === 'undefined' || blog.url === null) {
        response.status(400).end()
    } else {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token || !request.decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === request.decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(400).end()
        }
    } catch (error) {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        likes: request.body.likes
    }
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(result.toJSON())
    } catch (error) {
        response.status(400).end()
    }
})

module.exports = blogsRouter