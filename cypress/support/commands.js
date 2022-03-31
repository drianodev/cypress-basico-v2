Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Adriano')
    cy.get('#lastName').type('Mendes')
    cy.get('#email').type('adriano@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})