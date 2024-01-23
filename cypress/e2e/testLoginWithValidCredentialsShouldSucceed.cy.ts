describe('User authentication', () => {
  it('Should successfully log in with valid credentials', () => {
    cy.intercept('POST', 'http://localhost:9000/api/auth/login').as('login');

    cy.visit('http://localhost:3000/');
    cy.fixture('users/user1').then((user) => {
      cy.get('[data-cy=authform-email]').type(user.email);
      cy.get('[data-cy=authform-password]').type(user.password);
      cy.get('[data-cy=authform-submit]').click();
    });

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});