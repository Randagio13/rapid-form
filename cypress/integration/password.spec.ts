before(() => {
  cy.visit('http://localhost:3000')
})

it('Input password', function () {
  cy.get('[name="password"]').as('password').should('be.empty')

  cy.get('@password').type('test12345').should('have.value', 'test12345')

  cy.get('#password-error')
    .should('not.be.empty')
    .should('contain.text', 'please enter a valid format')

  cy.get('@password').type('{selectall}{del}').should('have.value', '')
  cy.get('@password').should('have.attr', 'required')

  cy.get('#password-error')
    .should('not.be.empty')
    .should('contain.text', 'password is required')

  cy.get('@password').type('Test12345').should('have.value', 'Test12345')

  cy.get('#password-error').should('be.empty').should('contain.text', '')
})
