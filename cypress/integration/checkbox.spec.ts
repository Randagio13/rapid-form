before(() => {
  cy.visit('http://localhost:3000')
})
it('Input checkbox', function() {
  cy.get('[name="privacy"]')
    .as('checkbox')
    .should('not.be.checked')

  cy.get('@checkbox')
    .check()
    .should('be.checked')

  cy.get('@checkbox')
    .uncheck()
    .should('not.be.checked')

  cy.get('#privacy-error')
    .should('not.be.empty')
    .should('contain.text', 'privacy is required')
})
