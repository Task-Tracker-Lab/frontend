import { SProject } from 'entities/project';
import { z } from 'zod/v4';

export const ProjectSettingsFormSchema = SProject.CreateProjectBody.extend({
  status: z.enum(['active', 'archived']),
});

export type ProjectSettingsFormValues = z.infer<typeof ProjectSettingsFormSchema>;
