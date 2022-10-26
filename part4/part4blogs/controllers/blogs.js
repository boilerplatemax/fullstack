const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
if(!body.likes){
    body.likes = 0
    }

  const blog = new Blog({
    title: body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  })
  const valid=(body.title&&body.url)?true:false
  
  if(valid){
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  else{
    response.status(400).end()
  }
  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter