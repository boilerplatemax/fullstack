const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {


  // Create blogs without user
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
test('The unique identifier property of the blog posts is by default _id', async () => {
  const blogs = await Blog.find({})
  expect(blogs[0]._id).toBeDefined()
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: 'https://youtube.com',
    important: true,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
    important: true,
    url:'hi',
    likes:5
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
test('blog without likes gets set to 0', async () => {
  const newBlog = {
    title:'yello',
    authour:'bob ross',
    url:'hahah'
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  console.log('blogs at end', blogsAtEnd)
  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
})
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})


test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})
afterAll(() => {
  mongoose.connection.close()
}) 