import { z } from 'zod/v4';
import { GlobalSuccess } from 'shared/api';
import {
  MAX_NAME_LENGTH,
  MAX_PASS_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASS_LENGTH,
  OTP_LENGTH,
} from './const';

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
  firstName: z
    .string()
    .min(MIN_NAME_LENGTH, `Имя должно содержать минимум ${MIN_NAME_LENGTH} символа`)
    .max(MAX_NAME_LENGTH)
    .trim(),
  lastName: z
    .string()
    .min(MIN_NAME_LENGTH, `Фамилия должна содержать минимум ${MIN_NAME_LENGTH} символа`)
    .max(MAX_NAME_LENGTH)
    .trim(),
  middleName: z.string().max(MAX_NAME_LENGTH).trim().optional().or(z.literal('')),
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

export const OAuthProvider = z.enum(['google', 'github', 'yandex', 'vkontakte']);

export const OAuthProvidersResponse = z
  .object({
    label: z.string(),
    value: OAuthProvider,
  })
  .array();

export const ConnectedOAuthProvidersResponse = z
  .object({
    email: Email,
    avatarUrl: z.string().nullable(),
    provider: z.string(),
    connectedAt: z.string(),
  })
  .array();

export const ConnectOAuthProviderResponse = z.object({
  success: z.boolean(),
  url: z.string(),
});

export const RemoveOAuthProviderResponse = GlobalSuccess;
