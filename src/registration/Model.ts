import { object, string } from 'yup'

export type RegisterUserModel = {
  username: string;
  password: string;
  email: string;
  confirmationEmail: string;
}

export const registerUserModelSchema = object<RegisterUserModel>({
  username: string()
    .required()
    .min(6),
  password: string()
    .min(10)
    .required()
    .test('has-lowercase', 'Password must include at least one lowercase character', p => /[a-z]/.test(p))
    .test('has-uppercase', 'Password must include at least one uppercase character', p => /[A-Z]/.test(p)),
  email: string()
    .email()
    .required(),
  confirmationEmail: string()
    .email()
    .required()
})