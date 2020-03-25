import React, { SFC } from 'react'
import { Jumbotron } from 'react-bootstrap'

export type ThankYouMessageProps = {
  email: string;
}

export const ThankYouMessage: SFC<ThankYouMessageProps> = ({ email }) => (
  <Jumbotron data-test-id="thank-you-message">
    <h1>Thank you for registering!</h1>
    <p>
      An email will be sent shortly to <strong>{email}</strong>
    </p>
  </Jumbotron>
)