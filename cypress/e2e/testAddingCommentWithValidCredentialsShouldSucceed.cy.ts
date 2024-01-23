describe('Adding comment', () => {

  before(() => {
    cy.intercept('POST', 'http://localhost:9000/api/auth/login').as('login');
    cy.visit('http://localhost:3000/');
    cy.fixture('users/user1').then((user) => {
      cy.get('[data-cy=authform-email]').type(user.email);
      cy.get('[data-cy=authform-password]').type(user.password);
      cy.get('[data-cy=authform-submit]').click();
    });
    cy.wait('@login').its('response.statusCode').should('eq', 200);
  });

  it('Should successfully add comment with valid credentials', () => {
    cy.intercept('POST', 'http://localhost:9000/api/comment').as('comment');
    cy.get('[data-cy=recipeId-13]').click();
    cy.fixture('comments/comment1').then((comment) => {
      cy.get('[data-cy=commentform-content]').type(comment.content);
      cy.get('[data-cy=commentform-submit]').click();
    });

    cy.wait('@comment').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });
});