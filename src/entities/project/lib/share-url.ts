export function buildProjectShareUrl(projectId: string, token: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = new URL(`/projects/${projectId}`, origin || 'http://localhost');

  url.searchParams.set('token', token);

  return url.toString();
}
