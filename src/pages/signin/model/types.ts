import { z } from 'zod/v4';
import * as SSignin from './schemas';

export type SigninFormValues = z.infer<typeof SSignin.SigninForm>;
