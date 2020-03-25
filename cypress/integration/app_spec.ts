const fc = require('fast-check')

describe('registration', () => {
  it('should present email after submitting form', () => {
    const validInputArbitrary = fc.record({
      username: fc.string(6, 12),
      password: fc.mixedCase(fc.string(10, 18))
        // Make sure that the password contains at least one lowercase and one uppercase character
        .filter(p => /[a-z]/.test(p) && /[A-Z]/.test(p)),
      email: fc.emailAddress(),
    })

    const showsEmailAfterSubmit = fc.property(
      validInputArbitrary,
      (input) => {
        cy.visit('http://localhost:3000/')
        cy.get('#username').type(input.username)
        cy.get('#password').type(input.password)
        cy.get('#email').type(input.email)
        cy.get('#confirmationEmail').type(input.email)
        cy.get('button[type="submit"]').click()

        cy.get('[data-test-id="thank-you-message"]').should('contain.text', input.email)
      }
    )

    fc.assert(showsEmailAfterSubmit, { numRuns: 5 })
  })
})