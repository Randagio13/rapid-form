before(() => {
  cy.visit('http://localhost:3000')
})
it('Input multi-select', function() {
  cy.get('[name="selectDataMultiple"]')
    .as('selectDataMultiple')
    .invoke('val')
    .should('deep.equal', [''])

  cy.get('@selectDataMultiple')
    .select(['selezione 1', 'selezione 2'])
    .invoke('val')
    .should('deep.equal', ['selezione 1', 'selezione 2'])

  cy.get('@selectDataMultiple')
    .select('')
    .invoke('val')
    .should('deep.equal', [''])
  cy.get('@selectDataMultiple').should('have.attr', 'required')

  cy.get('#selectDataMultiple-error')
    .should('have.value', '')
    .should('contain.text', 'selectDataMultiple is required')
})
