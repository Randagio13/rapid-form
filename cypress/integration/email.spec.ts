before(() => {
  cy.visit('http://localhost:3000')
})

it('Input email', function() {
  cy.get('[name="email"]')
    .as('email')
    .should('be.empty')

  cy.get('@email')
    .type('alessandro')
    .should('have.value', 'alessandro')

  cy.get('#email-error')
    .should('not.be.empty')
    .should('contain.text', 'please enter a valid format')

  cy.get('@email')
    .type('{selectall}{del}')
    .should('have.value', '')
  cy.get('@email').should('have.attr', 'required')

  cy.get('#email-error')
    .should('not.be.empty')
    .should('contain.text', 'email is required')

  cy.get('@email')
    .type('alessandro@a.it')
    .should('have.value', 'alessandro@a.it')

  cy.get('#email-error')
    .should('be.empty')
    .should('contain.text', '')
})
