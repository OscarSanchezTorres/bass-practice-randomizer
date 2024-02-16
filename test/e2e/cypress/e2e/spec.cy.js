import signIn from "../page_objects/signIn";

describe('Bass practice test cases', () => {
  it('User visits bass practice and logs in successfully', () => {
    cy.visit('http://localhost:5173/signIn');

    const signInPage = new signIn();
    signInPage.enterEmail("test@test.com");
    signInPage.enterPassword("password");
    signInPage.clickLogin();

    cy.url().should("eq", "http://localhost:5173/");
    cy.screenshot()
    // Add context to the test report
    cy.addTestContext({
      testName: 'User logs in successfully',
      email: 'test@test.com',
    });
  });

  it('User tries to login with incorrect credentials', () => {
    cy.visit('http://localhost:5173/signIn');

    const signInPage = new signIn();
    signInPage.enterEmail("invalid@test.com");
    signInPage.enterPassword("wrongpassword");
    signInPage.clickLogin();

    // Assert that an error message is displayed
    cy.get('Message???').should('be.visible');

    // Add context to the test report
    cy.addTestContext({
      testName: 'User tries to login with incorrect credentials',
      email: 'invalid@test.com',
    });
  });

  it('User logs out successfully', () => {
    // Perform login first
    cy.visit('http://localhost:5173/signIn');

    const signInPage = new signIn();
    signInPage.enterEmail("test@test.com");
    signInPage.enterPassword("password");
    signInPage.clickLogin();
    cy.url().should("eq", "http://localhost:5173/");

    // Perform logout
    cy.get('logout button').click();

    // Assert that the user is redirected to the login page PENDING
    cy.url().should("eq", "http://localhost:5173/signIn");

    // Add context to the test report
    cy.addTestContext({
      testName: 'User logs out successfully',
      email: 'test@test.com',
    });
  });
});