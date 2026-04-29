import { z } from 'zod/v4';
import { GlobalSuccess } from 'shared/api';

export const RefreshTokenResponse = GlobalSuccess.extend({
  token: z.string(),
});
