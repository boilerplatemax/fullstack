import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

describe('Blog component tests', () => {
let sampleBlog = {
  title:"asd",
  author:"Maxo",
  url:"https://reactpatterns.com/",
  likes:7,
  user:{id:'dg8hvms03omc954h'},
  id:'0eowdvnsfh8ehbufwdvs332f'
}
let sampleUser={
  id:'dg8hvms03omc954h'
}

const mockUpdateBlog = jest.fn()
const mockDeleteBlog = jest.fn()
const mockLikeBlog = jest.fn()

test('renders title and author', () => {
  const { container } = render(
    <Blog
      blog={sampleBlog}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
      likedBlogs={[]}
      user={sampleUser}
    />
    )
    const div = container.querySelector('.blog__header')
    expect(div).toHaveTextContent('asd')
})
test('Body shows when button is pressed',async () => {
  const { container } = render(
    <Blog
      blog={sampleBlog}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
      likedBlogs={[]}
      user={sampleUser}
    />
    )
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    
    const blogBody = container.querySelector('.blog__body')
    expect(blogBody).toHaveTextContent(sampleBlog.url&&sampleBlog.likes)
  screen.debug(container)
  // const element = await screen.findByText('Does not work anymore :(')
})


test('Like button has been pressed the correct number of times',async () => {
  const { container } = render(
    <Blog
      blog={sampleBlog}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
      likedBlogs={[]}
      likeBlog={mockLikeBlog}
      user={sampleUser}
    />
    )
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    
    
    const likeButton = container.querySelector('.btn-like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  // const element = await screen.findByText('Does not work anymore :(')
})


})
