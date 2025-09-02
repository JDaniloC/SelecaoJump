describe('home spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80')
  })

  before(() => {
    cy.request({
        method: "GET",
        url: "http://localhost:8000/api/processos/stats",
    });

    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/visualization/image",
    });
  })

  it('should see stats infos', () => {
    cy.get('.statistic-group').should('have.length', 5)
    cy.wait(5000)
    cy.get('.statistic-group').eq(0).should('contain', 'Quantidade de movimentos')
    cy.get('.statistic-group').eq(0).should('contain', 73327)
    cy.get('.statistic-group').eq(1).should('contain', 'Quantidade de processos')
    cy.get('.statistic-group').eq(1).should('contain', 3356)
    cy.get('.statistic-group').eq(2).should('contain', 'Média de duração de movimentos')
    cy.get('.statistic-group').eq(2).should('contain', '7 dias 21 horas')
    cy.get('.statistic-group').eq(3).should('contain', 'Média de duração dos processos')
    cy.get('.statistic-group').eq(3).should('contain', '5 meses 21 dias')
    cy.get('.statistic-group').eq(4).should('contain', 'Média de movimento por processo')
    cy.get('.statistic-group').eq(4).should('contain', 21.85)
  })

  it('should works dark mode', () => {
    cy.get('#dark-mode-button').click()
    cy.get('body').should('have.class', 'dark-theme')
    cy.wait(2000)

    cy.get('#dark-mode-button').click()
    cy.get('body').should('not.have.class', 'dark-theme')
    cy.wait(2000)
  })

  it('navigate to analysis', () => {
    cy.get('#app-header span:nth-child(3)').click()
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost/analysis')
      expect(location.origin).to.eq('http://localhost')
      expect(location.pathname).to.eq('/analysis')
    })
  })
})
