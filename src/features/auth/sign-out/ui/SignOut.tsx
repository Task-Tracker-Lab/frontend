import { LogOut } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from 'shared/ui';
import { useSignOut } from '../model/useSignOut';

function SignOut(props: Omit<ComponentProps<typeof Button>, 'children'>) {
  const signoutMutation = useSignOut();

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
