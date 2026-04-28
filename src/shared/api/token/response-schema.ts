import { z } from 'zod/v4';
import { GlobalSuccessSchema } from 'shared/api';

export const RefreshTokenResponse = GlobalSuccessSchema.extend({
  token: z.string(),
});
