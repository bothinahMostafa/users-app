describe('The Home Page', () => {
    it('Successfully loads', () => { 
    cy.visit('/');
    cy.get('.rotating')
    .children('h1')
    .should('have.text', 'HELLO JUMIA REPO');
    });
});