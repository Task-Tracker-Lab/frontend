import { z } from 'zod/v4';

const OTP_LENGTH = 6;

export const OTPCodeSchema = z.string().min(OTP_LENGTH, 'Обязательное поле').max(OTP_LENGTH);
