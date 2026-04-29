import { z } from 'zod/v4';
import * as SOtpForm from './schemas';

export type OtpForm = z.infer<typeof SOtpForm.OtpForm>;
export type FormBody = z.infer<typeof SOtpForm.otpFormBody>;
