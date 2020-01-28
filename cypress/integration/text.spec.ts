before(() => {
  cy.visit('http://localhost:3000')
})
it('Input text', function() {
  cy.get('[name="username"]')
    .as('username')
    .should('be.empty')

  cy.get('@username')
    .type('alessandro')
    .should('have.value', 'alessandro')

  cy.get('@username')
    .type('{selectall}{del}')
    .should('have.value', '')
  cy.get('@username').should('have.attr', 'required')

  cy.get('#username-error')
    .should('not.be.empty')
    .should('contain.text', 'username is required')
})
