describe('Interação: Navegação entre os menus', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Navegação no menu hamburguer', () => {
        cy.get('#react-burger-menu-btn').click()

        cy.get('.bm-item-list')
            .within(() => {
                
                cy.contains('All Items').click()
                cy.url().should('include', 'inventory.html')

                cy.contains('About')
                .should('have.attr','href', 'https://saucelabs.com/')

                cy.contains('Reset App State').click()
                cy.get('.shopping_cart_badge').should('not.exist')

                cy.contains('Logout').click()
                cy.url().should('include','saucedemo.com')

            })

    })
    it('Buscar no inventário um termo específico', () => {
        cy.login()
        /* Não encontrei o menu home nesse acesso, então fiz
        o processo contrário esperando não identificar o comentário
        do usuário Chuan Au*/
        cy.get('[data-test="inventory-container"]')
            .within(() => {
                cy.contains('Chuan Au').should('not.exist')
            })
    });
});