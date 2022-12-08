describe('Editor test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h2').contains('Front End Developer Test Project')
  })
  it('should open context menu list', () => {
    const cmd = '/'
    cy.visit('http://localhost:3000/')
    cy.get('p.editor-block').type( cmd)
  })
  it('should show only header by /1', () => {
    const cmd = '/1'
    cy.visit('http://localhost:3000/')
    cy.get('p.editor-block').type( cmd).type('{enter}')
    cy.get('h1.editor-block').type('This is my Header').type('{enter}')
    cy.get('p.editor-block')
      .type(`Now this is normal text. All in had to do is do /+1, and then type my text and EnterReturn`)
  })
})