import type { TProject } from 'entities/project';
import type { ProjectSettingsFormValues } from '../model/types';

export function mapProjectToFormValues(
  project: TProject.ProjectDetailResponse
): ProjectSettingsFormValues {
  return {
    name: project.name,
    slug: project.slug,
    description: project.description ?? '',
    descriptionHtml: project.descriptionHtml ?? '',
    icon: (project.visuals.icon ?? undefined) as ProjectSettingsFormValues['icon'],
    color: project.visuals.color ?? null,
    visibility: project.access.visibility,
    status: project.status === 'archived' ? 'archived' : 'active',
    sequence: project.meta.sequence,
    settings: project.settings,
  };
}
