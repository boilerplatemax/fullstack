describe('reset users', ()=>{
  it('reset', ()=>{
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Max',
      username: 'maximustard',
      password: '12345678'
    }
    const user2 = {
      name: 'JJmoney',
      username: 'JJmoney',
      password: '12345678'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
  })
})
describe('User creation and login test', ()=> {
  beforeEach(()=> {
   cy.visit('http://localhost:3000')
 })
 

describe('Correct login messages', () => {
  it('front page is login page', ()=> {
    cy.contains('Login')
  })
})
describe('Login', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:3000')
  })
  it('incorrect login prevents user from going futher', ()=> {
    cy.contains('log in').click()
    cy.get('#username').type('maximustard')
    cy.get('#password').type('wrong password')
    cy.get('#login-button').click()
    cy.get('.error').contains('wrong credentials')
    cy.get('html').should('not.contain', 'Max logged in')
  })
  it('correct login', ()=>{
    cy.login({ username: 'maximustard', password: '12345678' })
    cy.contains('Max logged in')
  })
})

describe('Blog creation', () => {
  beforeEach(()=> {
    cy.login({ username: 'maximustard', password: '12345678' })
  })

  it('New blog can be added', ()=> {
    cy.postBlog({title:'test-title', url:'test-url'})
  })
})


describe('Blogs can be updated by others', () => {
  beforeEach(()=> {
    cy.login({ username: 'JJmoney', password: '12345678' })
  })

  it('New blog can be Liked by other users', ()=> {
    cy.get('#blog-toggle-button').click()
    cy.get('#blog-like-button').click()
  })
  it('New blog can not be deleted by other users', ()=>{
    cy.get('#blog-toggle-button').click()
    cy.get('#blog-delete-button').should('not.exist');
  })
})
describe('Blogs can be updated by their creator', () => {
  beforeEach(()=> {
    cy.login({ username: 'maximustard', password: '12345678' })
  })

  it('New blog can be Liked', ()=> {
    cy.get('#blog-toggle-button').click()
    cy.get('#blog-like-button').click()
  })
  it('New blog can be deleted', ()=>{
    cy.get('#blog-toggle-button').click()
    cy.get('#blog-delete-button').click()
  })
})

})
describe('blogs sorted from most likes to least',()=>{
  beforeEach(
    ()=>{
      cy.postBlog({title:`Random Title${ Math.random(10)}`, url:'test-url'})
      cy.postBlog({title:`Random Title${ Math.random(10)}`, url:'test-url'})
      cy.postBlog({title:`Random Title${ Math.random(10)}`, url:'test-url'})
    }
  )
  it('blogs sorted by likes',()=>{
    cy.get('#blog-toggle-button').click()
    cy.get('#blog-like-button').click()
    cy.get('#blog-like-button').click()
})
})










