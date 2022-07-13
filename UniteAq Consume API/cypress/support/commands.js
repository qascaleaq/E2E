import "cypress-localstorage-commands";

Cypress.Commands.add("loginAs", (username, password) => {
  cy.visit("/");
  cy.get("#signInName").clear().click().type(username);
  cy.get("#continue").click();
  cy.get("#password").type(password);
  cy.get("#next").click();
  cy.wait(5000);
  localStorage.setItem("test_storage", "available");
  cy.saveLocalStorage();
});

Cypress.Commands.add("postToken", () => {
  cy.request({
    method: "POST",
    url: `https://scaleaqcustomerdev.b2clogin.com/scaleaqcustomerdev.onmicrosoft.com/B2C_1_password_credentials/oauth2/v2.0/token`,
    qs: {
      grant_type: "password",
      client_id: "9ca2963d-2d62-47c8-85dd-b183c49bb444",
      scope: "openid 9ca2963d-2d62-47c8-85dd-b183c49bb444",
      response_type: "id_token",
      username: Cypress.env('user_name'),
      password: Cypress.env('user_password'),
    },
  }).then(({ body }) => {
    const { id_token } = body;
    cy.setLocalStorage("identity_token", body.id_token);
    cy.log(id_token);
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("/");
    cy.get("#signInName").clear().click().type(username);
    cy.get("#continue").click();
    cy.get("#password").type(password);
    cy.get("#next").click();
    cy.wait(5000);
  });
});

Cypress.Commands.add("getWeek", () => {
  let currentDate = new Date();
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  let weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
  return weekNumber;
});

//cy.setLocalStorage("identity_token", body);

Cypress.Commands.add("ADlogin", (username, password) => {
  const args = { username, password };
  cy.session(args, () => {
    cy.origin("https://scaleaqcustomerdev.b2clogin.com", { args }, ({ username, password }) => {
      cy.visit(
        "/ef12312a-f5f1-4471-b287-f9dfb33d6fa0/B2C_1A_HRD_SIGNUP_SIGNIN/oauth2/v2.0/authorize?client_id=84bfe3da-b70a-4e2f-ab3d-cff25531d0ce&scope=openid"
      );
      cy.get("#signInName").clear().click().type(username);
      cy.get("#continue").click();
      cy.get("#password").type(password);
      cy.get("#next").click();
      cy.wait(5000);
    });
    cy.url().should("contain", "/home");
  });
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});
