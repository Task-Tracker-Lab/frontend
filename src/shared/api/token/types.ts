import { z } from 'zod/v4';
import * as SToken from './response';

export type RefreshTokenResponse = z.infer<typeof SToken.RefreshTokenResponse>;
