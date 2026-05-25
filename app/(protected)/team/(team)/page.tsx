import { redirect } from 'next/navigation';
import { routes } from 'shared/config';

export default function TeamPage() {
  redirect(routes.team.members());
}
