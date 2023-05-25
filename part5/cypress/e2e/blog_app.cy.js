const createCredential = {
  username: 'iqbalfirdaus',
  password: 'password',
  name: 'Iqbal Firdaus'
};

const loginCredential = {
  username: 'iqbalfirdaus',
  password: 'password'
};

describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', createCredential);
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(loginCredential);
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Cypress make this',
        author: 'Cypress',
        url: 'www.cypress.io'
      });

      cy.contains('Cypress make this');
    });
  });

  describe('Authorized user action', function () {
    beforeEach(function () {
      cy.login(loginCredential);
      cy.createBlog({
        title: 'Cypress make this',
        author: 'Cypress',
        url: 'www.cypress.io'
      });
    });

    it('like pressed', function () {
      cy.contains('Cypress make this')
        .parent()
        .find('.visibility-button')
        .click();
      cy.get('.like-btn').click();
    });

    it('delete blog', function () {
      cy.contains('Cypress make this')
        .parent()
        .find('.visibility-button')
        .click();
      cy.wait(1000);
      cy.get('.delete-btn').should('exist').click();
    });
  });
});
