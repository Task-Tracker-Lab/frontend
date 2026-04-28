import { z } from 'zod/v4';
import * as SForgotPassword from './schemas';

export type EmailFormValues = z.infer<typeof SForgotPassword.EmailForm>;
export type PasswordFormValues = z.infer<typeof SForgotPassword.PasswordForm>;
