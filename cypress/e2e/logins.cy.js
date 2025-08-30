describe('Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    it('Deve realizar o login com sucesso', () => {
        cy.fixture('users.json').then((data) => {
            const user = data.users[0];

            cy.get('[data-test="username"]').type(user.username)
            cy.get('[data-test="password"]').type(user.password)
            cy.get('[data-test="login-button"]').click();

            //Validar a exibição da tela de inventório
            cy.url().should('include', '/inventory')
            //Validar a exibição de itens do inventório
            cy.get('[data-test="inventory-container"]').should('have.length.greaterThan', 0)
        })



    });
    it('Deve exibir mensagem de erro por login inválido', () => {

        cy.fixture('users.json').then((data) => {
            const user = data.users[1];

            cy.get('[data-test="username"]').type(user.username)
            cy.get('[data-test="password"]').type(user.password)
            cy.get('[data-test="login-button"]').click();

            //Validar a exibição de uma mensagem de error
            cy.get('[data-test="error"]').should('be.visible')
        })


    });

});