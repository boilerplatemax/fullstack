import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm.js'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const handleBlogChange = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} handleBlogChange={handleBlogChange}/>
  )

  const input = component.container.querySelector('.blogform__input-title')
  const form = component.container.querySelector('.blogform__form')

  fireEvent.change(input, {
    target: { value: 'Go To Statement Considered Harmful' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(input.value).toBe('Go To Statement Considered Harmful')
})