before(() => {
  cy.visit('http://localhost:3000')
})
it('Input select', function() {
  cy.get('[name="selectData"]')
    .as('selectData')
    .should('have.value', '')

  cy.get('@selectData')
    .select('selezione 1')
    .should('have.value', 'selezione 1')

  cy.get('@selectData')
    .select('')
    .should('have.value', '')
  cy.get('@selectData').should('have.attr', 'required')

  cy.get('#selectData-error')
    .should('have.value', '')
    .should('contain.text', 'selectData is required')
})
