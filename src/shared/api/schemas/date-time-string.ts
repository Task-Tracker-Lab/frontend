import { z } from 'zod/v4';

const INVALID_DATE_MESSAGE = 'Строка не является валидной датой';

export const DateTimeString = z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
  message: INVALID_DATE_MESSAGE,
});
