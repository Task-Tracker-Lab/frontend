import { z } from 'zod/v4';
import * as SProfile from './schemas';

export type ProfileFormValues = z.infer<typeof SProfile.ProfileForm>;
