describe('Search User', () => {
  it('should load the main page', () => {
    cy.visit('http://localhost:3000');
  });

  describe('when has a succesfull response', () => {
    it('should type "damimd10" on the search input and hit enter', () => {
      cy.get('[data-cy=search-input]').type('damimd10');
      cy.get('[data-cy=search-input]').type('{enter}');
    });

    it('Should be able to test GraphQL response data', () => {
      cy.server();

      cy.route({
        method: 'POST',
        url: 'https://api.github.com/graphql',
      }).as('graphql');

      cy.wait('@graphql');
    });

    it('should contain a contributions chart', () => {
      cy.get('[data-cy=contributions-chart]').should('be.visible');
    });

    it('should contain repositories per language chart', () => {
      cy.get('[data-cy=repositories-language-chart]').should('be.visible');
    });

    it('should contain stars per language chart', () => {
      cy.get('[data-cy=stars-language-chart]').should('be.visible');
    });

    it('should contain commits per language chart', () => {
      cy.get('[data-cy=commits-language-chart]').should('be.visible');
    });

    it('should contain a top 10 commits chart', () => {
      cy.get('[data-cy=top-10-commits]').should('be.visible');
    });

    it('should contain a top 10 stars chart', () => {
      cy.get('[data-cy=top-10-stars]').should('be.visible');
    });
  });

  describe('when has an error response', () => {
    it('should type "testingfakeuser" on the search input and hit enter', () => {
      cy.get('[data-cy=search-input]').clear();
      cy.get('[data-cy=search-input]').type('testingfakeuser');
      cy.get('[data-cy=search-input]').type('{enter}');
    });

    it('should display a monster image with an error message', () => {
      cy.server();
      cy.fixture('error-query.json').as('profileError');
      cy.fixture('error-query.json').as('statisticError');

      cy.route('POST', 'https://api.github.com/graphql', '@statisticError');
      cy.route('POST', 'https://api.github.com/graphql', '@profileError');

      cy.get('[data-cy=error-image').should('be.visible');
      cy.get('[data-cy=error-text]').should('be.visible');
    });
  });
});
