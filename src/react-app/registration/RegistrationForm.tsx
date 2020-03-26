import React, { SFC } from 'react'
import { Formik, FormikErrors } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { RegisterUserModel, registerUserModelSchema } from './Model'
import { FormInput } from './FormInput'

export type RegistrationFormProps = {
  register: (model: RegisterUserModel) => void;
}

export const RegistrationForm: SFC<RegistrationFormProps> = ({ register }) => {
  const initialValues: RegisterUserModel = {
    username: '',
    password: '',
    email: '',
    confirmationEmail: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerUserModelSchema}
      validate={values => {
        const errors: FormikErrors<RegisterUserModel> = {}

        if (values.confirmationEmail !== values.email) {
          errors.confirmationEmail = 'Emails do not match'
        }

        return errors;
      }}
      onSubmit={(values) => {
        register(values)
      }}
    >
      {
        ({ handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <FormInput
                name="username"
                label="Username"
                placeholder="Username"
              />
              <FormInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Form.Row>
            <Form.Row>
              <FormInput
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
              />
              <FormInput
                name="confirmationEmail"
                type="email"
                label="Confirm Email"
                placeholder="Confirm your email"
              />
            </Form.Row>
            <Button type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={() => resetForm()}>
              Reset
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}