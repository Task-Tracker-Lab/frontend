import { z } from 'zod/v4';
import { SAuth } from 'entities/auth';

export const SigninForm = z.object({
  email: SAuth.Email,
  password: SAuth.Password,
});
