import { SProject } from 'entities/project';
import { z } from 'zod/v4';

export const ProjectSettingsFormSchema = SProject.UpdateProjectBody;

export type ProjectSettingsFormValues = z.infer<typeof ProjectSettingsFormSchema>;
