/// < reference types = 'cypress'/>


describe("StoreFront", function () {

    beforeEach(function () {
        cy.fixture('pro.json').as('proData')
    })

    it('Buy product', function () {
        // cy.visit('https://stage.podro.shop/test.reward.1')

        this.proData.ProForTest.forEach((name) => {
            cy.visit('https://stage.podro.shop/test.reward.1')

            cy.storefrontAddPro(name)

        })

        cy.visit('https://stage.podro.shop/test.reward.1/cart')
        cy.get('.CartProductBox_productName__0_B5Z').should('have.length', 3)
            .each(function ($el, index, list) {
                expect(this.proData.ProForTest.includes($el.text()))
            })
        cy.get('.Cart_actions__dyAha > .MuiButtonBase-root').click()
        // cy.get('.Payment_bottom_wrapper__uVJ_u > .MuiButtonBase-root').click()

    });

});