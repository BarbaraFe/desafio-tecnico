/// <reference types="cypress" />

describe('Funcionalidade: Checkout de compra', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Realizar a compra de um item para cada usuário', () => {
        cy.fixture('users.json').then((data) => {
            data.users.forEach(user => {
                cy.get('[data-test="inventory-container"]')
                    .within(() => {
                        cy.contains('.inventory_item', 'Test.allTheThings() T-Shirt (Red)')
                            .within(() => {
                                cy.get('button').click()
                            })
                    })
                cy.get('.shopping_cart_badge').should('exist')

                // Navegar para o carrinho de compra  
                cy.get('[data-test="shopping-cart-link"]').click()

                // Confirmar o item no carrinho
                cy.get('[data-test="checkout"]').click();

                // Preencher os dados para compra
                cy.get('[data-test="firstName"]').type(user.first_name)
                cy.get('[data-test="lastName"]').type(user.last_name)
                cy.get('[data-test="postalCode"]').type(user.zipcode)

                cy.get('[data-test="continue"]').click()

                // Verificar o redirecionamento para segunda etapa de confirmação
                cy.url().should('include', '/checkout-step-two')

                // Finalizar a compra
                cy.get('[data-test="finish"]').click()
                cy.get('[data-test="checkout-complete-container"]').should('contain.text', 'Thank you for your order!')

                // Voltar para a página inicial para o próximo usuário
                cy.get('[data-test="back-to-products"]').click()
            });
        })
    });
});
