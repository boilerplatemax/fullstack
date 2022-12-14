const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    if(!body.title||!body.url)response.status(400).json({error:'provide a title and url'})
    if(!body.user)response.status(400).json({error:'no userid provided'})

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    })

    try {
        const savedBlog = await blog.save()
        logger.info(`added ${blog.title} to the blog list`)
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        logger.info(`blog linked to user ${user.username}`)
        response.json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
        
    }
})

blogRouter.delete('/:id', async (request, response, next) => {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blogToDelete = await Blog.findById(request.params.id)
    
    console.log('deleting blog with id ',blogToDelete.user.id)


    //check if user objects are equal. This prevents other users from deleting your content
    if ( blogToDelete.user.id.toString() === user.id.toString() ) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } 
    catch (exception) {
      next(exception)
    }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }

  })

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    
    if (!body.likes) {
        body.likes = 0
    }

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    
    if(user.likedBlogs.includes(body.id)){
        user.likedBlogs=user.likedBlogs.filter(b=>b!==body.id)
    }
    else{
        user.likedBlogs=user.likedBlogs.concat(body.id)
    }

    await user.save()

    //blogToUpdate.user._id.toString() === user._id.toString()
    if (true) {
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:body.user,
        id:body.id
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        logger.info(`blog ${blog.title} successfully updated`)
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
})

module.exports = blogRouter
    // if (blogToUpdate.user._id.toString() === user._id.toString()) {
