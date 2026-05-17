export function getTeamPathPrefix() {
  const origin = window?.location.origin;

  return origin ? `${origin}/team/` : '/team/';
}
