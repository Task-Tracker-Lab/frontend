import { z } from 'zod/v4';
import { InviteTeamMemberFormSchema } from './schemas';

export type InviteTeamMemberFormValues = z.infer<typeof InviteTeamMemberFormSchema>;
