import { z } from 'zod';

const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 32;

export const PasswordSchema = z
  .string()
  .min(1, 'Обязательное поле')
  .min(MIN_PASS_LENGTH, `Минимум ${MIN_PASS_LENGTH} символов`)
  .max(MAX_PASS_LENGTH, 'Слишком длинный пароль');
