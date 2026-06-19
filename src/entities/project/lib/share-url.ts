export function buildProjectShareUrl(slug: string, token: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = new URL(`/projects/${slug}`, origin || 'http://localhost');

  url.searchParams.set('token', token);

  return url.toString();
}
