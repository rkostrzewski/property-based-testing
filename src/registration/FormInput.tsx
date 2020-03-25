import React, { SFC } from 'react'
import { ErrorMessage, useField } from 'formik'
import { Form, FormControl, Col } from 'react-bootstrap'

export type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}

export const FormInput: SFC<FormInputProps> = (props) => {
  const [field, meta] = useField(props)
  const { name, label, type, placeholder } = props
  return (
    <Form.Group as={Col} controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && !!meta.error}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {
          (error) => (
            <FormControl.Feedback role="alert" type="invalid">
              {error}
            </FormControl.Feedback>
          )
        }
      </ErrorMessage>
    </Form.Group>
  )
}