import { z } from 'zod/v4';
import * as SOtpForm from './schemas';

export type OTPFormBody = z.infer<typeof SOtpForm.OTPFormBody>;
