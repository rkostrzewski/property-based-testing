import React from 'react'
import { render, RenderResult, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fc from 'fast-check'
import { RegistrationForm } from '../RegistrationForm'
import { isValidEmail } from '../isValidEmail'

const timeout = 25000

const getFormElements = ({ getByLabelText, getByText }: RenderResult) => ({
  username: getByLabelText('Username'),
  password: getByLabelText('Password'),
  email: getByLabelText('Email'),
  confirmEmail: getByLabelText('Confirm Email'),
  submit: getByText('Submit'),
  reset: getByText('Reset')
})

const waitForNoErrors = ({ queryAllByRole }: RenderResult) => waitFor(() => queryAllByRole("alert").length === 0)
const waitForSomeErrors = ({ queryAllByRole }: RenderResult) => waitFor(() => queryAllByRole("alert").length > 0)

describe('RegistrationForm', () => {
  it('should call register prop after inputting correct data and pressing submit', async () => {
    const validInputArbitrary = fc.record({
      username: fc.string(6, 12),
      password: fc.mixedCase(fc.string(10, 18))
        // Make sure that the password contains at least one lowercase and one uppercase character
        .filter(p => /[a-z]/.test(p) && /[A-Z]/.test(p)),
      email: fc.emailAddress(),
    })

    const allowsToBeSubmitted = fc
      .asyncProperty(
        validInputArbitrary,
        async (input) => {
          const register = jest.fn()
          const result = render(<RegistrationForm register={register} />)
          const elements = getFormElements(result)

          userEvent.type(elements.username, input.username)
          userEvent.type(elements.password, input.password)
          userEvent.type(elements.email, input.email)
          userEvent.type(elements.confirmEmail, input.email)
          userEvent.click(elements.submit)

          await waitForNoErrors(result)

          expect(register).toHaveBeenCalled()
        }
      ).afterEach(() => cleanup())

    await fc.assert(allowsToBeSubmitted, {
      numRuns: 50
    })
  }, timeout)

  it('should not call register prop inputting invalid data and pressing submit', async () => {
    const invalidInputArbitrary = fc.record({
      username: fc.string(0, 5),
      password: fc.oneof(
        // Either:
        // Too short
        fc.mixedCase(fc.string(0, 9)),
        // Correct length, all lowercase
        fc.string(10, 18).map(s => s.toLowerCase()),
        // Correct length, all uppercase
        fc.string(10, 18).map(s => s.toUpperCase()),
      ),
      email: fc.string(0, 20).filter(e => !isValidEmail(e)),
      confirmationEmail: fc.string(0, 20).filter(e => !isValidEmail(e))
    })

    const disablesSubmitting = fc
      .asyncProperty(
        invalidInputArbitrary,
        async (input) => {
          const register = jest.fn()
          const result = render(<RegistrationForm register={register} />)
          const elements = getFormElements(result)
      
          userEvent.type(elements.username, input.username)
          userEvent.type(elements.password, input.password)
          userEvent.type(elements.email, input.email)
          userEvent.type(elements.confirmEmail, input.email)
          userEvent.click(elements.submit)

          await waitForSomeErrors(result)

          expect(register).not.toHaveBeenCalled()
        }
      ).afterEach(() => cleanup())

    await fc.assert(disablesSubmitting, {
      numRuns: 50
    })
  }, timeout)
})
