Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
    })
    
  })
  Cypress.Commands.add('postBlog', ({title, url})=>{
    cy.contains('Add new blog').click()
    cy.get('#blogForm-input-title').type(title)
    cy.get('#blogForm-input-url').type(url)
    cy.get('#blogForm-submit').click()
  })