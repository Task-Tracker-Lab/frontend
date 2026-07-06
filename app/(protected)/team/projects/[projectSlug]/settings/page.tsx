import { notFound } from 'next/navigation';
import { ProjectSettingsPage } from 'pages/project/settings';

export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params;

  if (!projectSlug) {
    return notFound();
  }

  return <ProjectSettingsPage projectSlug={projectSlug} />;
}
