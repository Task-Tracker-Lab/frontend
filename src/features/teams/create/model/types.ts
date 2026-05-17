import { z } from 'zod/v4';
import { CreateTeamFormSchema } from './schemas';

export type CreateTeamFormValues = z.infer<typeof CreateTeamFormSchema>;
