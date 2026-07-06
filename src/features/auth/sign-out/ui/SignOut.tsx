import { LogOut } from 'lucide-react';
import { type ComponentProps } from 'react';
import { Button, buttonVariants } from 'shared/ui';
import { useSignOut, UseSignOutOptions } from '../api/useSignOut';
import { Slot } from 'radix-ui';
import { cn } from 'shared/lib/utils';

type SignOutProps = ComponentProps<typeof Button> & {
  mutateOptions?: UseSignOutOptions;
};

function SignOut({
  asChild = false,
  className = '',
  variant = 'link',
  size = 'default',
  children = null,
  mutateOptions = {},
  ...props
}: SignOutProps) {
  const { mutate, isPending } = useSignOut(mutateOptions);
  const Com = asChild ? Slot.Root : 'button';
  return (
    <Com
      className={
        asChild ? className : cn(buttonVariants({ variant, size }), 'text-destructive', className)
      }
      onClick={() => mutate()}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={isPending}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          Выйти
          <LogOut className="size-4" />
        </>
      )}
    </Com>
  );
}

export { SignOut };
