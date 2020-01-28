before(() => {
  cy.visit('http://localhost:3000')
})
it('Input radio', function() {
  cy.get('[name="radio"]')
    .as('radio')
    .first()
    .should('not.be.checked')

  cy.get('@radio')
    .first()
    .check()
    .should('be.checked')
})
