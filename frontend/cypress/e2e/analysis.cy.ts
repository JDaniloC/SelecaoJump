describe('analysis spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80/analysis')
  })

  before(() => {
    cy.request({
        method: "GET",
        url: "http://localhost:8000/api/processos",
        qs: {
          movimentacao: "A2"
        }
    })
  })

  it('should navigate to graph',  () => {
    cy.get('#app-header span:nth-child(2)').click()
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost/')
    })
  })

  it('should works dark mode', () => {
    cy.get('#dark-mode-button').click()
    cy.get('body').should('have.class', 'dark-theme')
    cy.wait(2000)

    cy.get('#dark-mode-button').click()
    cy.get('body').should('not.have.class', 'dark-theme')
    cy.wait(2000)
  })

  it('should see header when scroll', () => {
    cy.wait(3000)
    cy.get('mat-form-field').eq(0).click()
    cy.wait(3000)
    cy.get('mat-option').eq(2).click()
    cy.wait(4000)
    cy.scrollTo('bottom')
    cy.get('app-header').should('be.visible')
  })
})
