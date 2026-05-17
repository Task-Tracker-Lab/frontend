import { STeam } from 'entities/team';
import { z } from 'zod/v4';

export const TeamSettingsFormSchema = STeam.UpdateTeamBody;

export type TeamSettingsFormValues = z.infer<typeof TeamSettingsFormSchema>;
