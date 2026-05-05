import { z } from 'zod/v4';
import { GlobalSuccess } from 'shared/api';
import { MAX_PASS_LENGTH, MIN_PASS_LENGTH, OTP_LENGTH } from './const';

export const Email = z.string().min(1, 'Обязательное поле').check(z.email('Неверный формат email'));

export const Password = z
  .string()
  .min(1, 'Обязательное поле')
  .min(MIN_PASS_LENGTH, `Минимум ${MIN_PASS_LENGTH} символов`)
  .max(MAX_PASS_LENGTH, 'Слишком длинный пароль');

export const OTPCode = z.string().min(OTP_LENGTH, 'Обязательное поле').max(OTP_LENGTH);

export const SigninBody = z.object({
  email: Email,
  password: Password,
});

export const SigninResponse = GlobalSuccess.extend({
  token: z.string(),
});

export const SignoutResponse = GlobalSuccess;

export const SignupBody = z.object({
  email: Email,
  password: Password,
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(50).trim(),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа').max(50).trim(),
  middleName: z.string().max(50).trim().optional().or(z.literal('')),
});

export const SignupResponse = GlobalSuccess;

export const SignupConfirmBody = z.object({
  email: Email,
  code: OTPCode,
});

export const SignupConfirmResponse = GlobalSuccess.extend({
  token: z.string(),
});

export const ResetPasswordBody = z.object({
  email: Email,
});

export const ResetPasswordResponse = GlobalSuccess;

export const ResetPasswordVerifyBody = z.object({
  email: Email,
  code: OTPCode,
});

export const ResetPasswordVerifyResponse = GlobalSuccess;

export const ResetPasswordConfirmBody = z.object({
  email: Email,
  password: Password,
  confirmPassword: Password,
});

export const ResetPasswordConfirmResponse = GlobalSuccess;
