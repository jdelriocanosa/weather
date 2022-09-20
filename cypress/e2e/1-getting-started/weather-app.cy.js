describe("weather-app", () => {
    beforeEach(() =>{
        cy.visit('http://localhost:8080/')
    })
    it("frontpage can be opened", () => {
        cy.contains("Busca una ciudad")
    })
    it("search city", () => {
        cy.get("input").first().type('madrid').type('{enter}')
        cy.get(".city .save-icon").click()
        cy.get("input").first().clear()
        cy.get("input").first().type('barcelona').type('{enter}')
        cy.get(".city .save-icon").click()
        cy.get(".drawer").click()
        cy.contains("Favoritos").click()
        cy.get(".delete-icon").first().click()
        cy.contains("Buscar").click()
        cy.get(".link-more-information").click()
    })
})