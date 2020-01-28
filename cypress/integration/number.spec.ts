before(() => {
  cy.visit('http://localhost:3000')
})
it('Input number', function() {
  cy.get('[name="number"]')
    .as('number')
    .should('be.empty')

  cy.get('@number')
    .type('13')
    .should('have.value', '13')

  cy.get('@number')
    .type('{selectall}{del}')
    .should('have.value', '')
  cy.get('@number').should('have.attr', 'required')

  cy.get('#number-error')
    .should('not.be.empty')
    .should('contain.text', 'number is required')
})
