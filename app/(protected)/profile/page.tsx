import { redirect } from 'next/navigation';
import { routes } from 'shared/config';

export default function ProfilePage() {
  redirect(routes.profile.me());
}
