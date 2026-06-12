import { type Route } from 'next';
import { redirect } from 'next/navigation';
import { routes } from 'shared/config';

type BooleanRaw = 'false' | 'true';
type PageParams = {
  success: BooleanRaw;
  message: string;
};

interface Props {
  searchParams: Promise<Partial<PageParams>>;
}
export async function ProfilePage({ searchParams }: Props) {
  const { success, message } = await searchParams;

  if (success === 'true') {
    redirect(
      `${routes.user.profile()}?success=true&message=${encodeURIComponent(message || 'Провайдер успешно привязан')}`
    );
  }

  const errorUrl = message
    ? `${routes.user.profile()}?success=false&message=${encodeURIComponent(message)}`
    : routes.user.profile();

  redirect(errorUrl as Route);
}
