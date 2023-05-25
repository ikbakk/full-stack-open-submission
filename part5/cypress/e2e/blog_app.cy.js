describe('Blog app', () => {
  const config = {
    username: 'iqbalfirdaus',
    password: 'password',
    name: 'Iqbal Firdaus'
  };
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', config);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('Blogs');
    cy.contains('Login to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('iqbalfirdaus');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
      cy.contains('Iqbal Firdaus logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('iqbalfirdaus');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();
      cy.get('#error-notification').should('have.text', 'Wrong Credentials');

      cy.get('html').should('not.contain', 'Iqbal Firdaus logged in');
    });
  });
});
