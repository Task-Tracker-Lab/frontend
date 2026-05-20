import { z } from 'zod/v4';
import * as SSignup from './schemas';

export type SignupFormValues = z.infer<typeof SSignup.SignupForm>;
