# End to End testing platform for Managment Portal 2.0

- [Cypress.io](https://www.cypress.io/)
- Visual regression testing with [Percy](https://percy.io/)

# Installation

1. npm install

# Run

1. Run application

- yarn dev

2. Run tests

- npm run cypress:run (test will run on headless mode)
- npm run cypress:open (headed mode)
- npx percy exec -- npx cypress run --spec 'cypress/Tests/e2e/login.spec.js' (for visual regression tests)
