before(() => {
  cy.visit('http://localhost:3000')
})
it('Input calendar', function() {
  cy.get('[name="calendar"]')
    .as('calendar')
    .should('be.empty')

  cy.get('@calendar')
    .type('1988-12-19')
    .should('have.value', '1988-12-19')

  cy.get('@calendar')
    .type('{selectall}{del}')
    .should('have.value', '')

  cy.get('@calendar').should('have.attr', 'required')

  cy.get('#calendar-error')
    .should('not.be.empty')
    .should('contain.text', 'calendar is required')
})
