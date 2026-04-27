import { LogOut } from 'lucide-react';
import { ComponentProps } from 'react';
import { Button } from 'shared/ui';
import { AccessToken, signout } from 'shared/api';
import { routes } from 'shared/config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { currentUserQueryKey } from '../model/queries/use-current-user';

function SignOut(props: Omit<ComponentProps<typeof Button>, 'children'>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signoutMutation = useMutation({
    mutationFn: signout,
    onSuccess: (response) => {
      AccessToken.clear();
      queryClient.removeQueries({ queryKey: currentUserQueryKey });
      router.replace(routes.auth.signin());
      toast.success(response.message || 'Вы вышли из аккаунта');
    },
  });

  return (
    <Button
      className="text-destructive"
      variant="link"
      onClick={() => signoutMutation.mutate()}
      disabled={signoutMutation.isPending}
      {...props}
    >
      Выйти
      <LogOut className="size-4" />
    </Button>
  );
}

export { SignOut };
