const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const users = await User.find({})
    const currentUser = users.filter(u=>u.username===body.username)[0]
    
    if(!body.title||!body.url)response.status(400).json({error:'provide a title and url'})

    if(!body.username)response.status(400).json({error:'no username provided'})

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: currentUser._id
    })

    try {
        const savedBlog = await blog.save()
        logger.info(`added ${blog.title} to the blog list`)
        currentUser.blogs = currentUser.blogs.concat(savedBlog._id)
        await currentUser.save()
        logger.info(`blog linked to user ${currentUser.username}`)
        response.json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        logger.info(`blog ${blog.title} successfully updated`)
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter