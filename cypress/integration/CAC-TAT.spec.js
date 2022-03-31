/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { // executa antes de testar
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() { // '.only' executa somente esse teste
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário sem delay de 10 milisegundos', function() { // '.only' executa somente esse teste
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) // delay no valor default é 10 milisegundos
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { // '.only' executa somente esse teste
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function() { // '.only' executa somente esse teste
        cy.get('#phone')
            .type('asadafssdfs')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { // '.only' executa somente esse teste
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() { // '.only' executa somente esse teste
        cy.get('#firstName')
            .type('Adriano')
            .should('have.value', 'Adriano')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Mendes')
            .should('have.value', 'Mendes')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('adriano@email.com')
            .should('have.value', 'adriano@email.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('55555555')
            .should('have.value', '55555555')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { // '.only' executa somente esse teste
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() { // '.only' executa somente esse teste
        cy.fillMandatoryFieldsAndSubmit() // comando custumizado cypress/support/command.js

        cy.get('.success').should('be.visible')
    })

    it('trocando o get por contains', function() {
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email.com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"')
            .should('have.length', '3')
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('adriano@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('/home/drianodev/Documentos/GoTest/cypress/cypress-basico-v2/cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('/home/drianodev/Documentos/GoTest/cypress/cypress-basico-v2/cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
  