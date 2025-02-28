/// < reference types = 'cypress'/>


declare namespace Cypress {
    interface Chainable {
 
        loginUsingApi(): Cypress.Chainable
        logOut(): Cypress.Chainable
        CreateProduct(): Cypress.Chainable
        storefrontAddPro(Name: string): Cypress.Chainable
    }
}