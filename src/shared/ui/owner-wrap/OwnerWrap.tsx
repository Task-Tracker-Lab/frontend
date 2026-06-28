import { classNames } from 'shared/lib/utils';
import { Crown } from 'lucide-react';

interface OwnerWrapProps extends React.ComponentProps<'div'> {
  isOwner: boolean;
}

export function OwnerWrap({ className, children, isOwner = false, ...rest }: OwnerWrapProps) {
  return (
    <div className={classNames('relative w-fit', {}, [className])} {...rest}>
      {children}
      {isOwner ? (
        <span
          className="bg-background ring-background absolute -top-0.5 -right-0.5 z-10 flex size-4 items-center justify-center rounded-full ring-2"
          aria-label="Владелец"
        >
          <Crown className="size-3 text-amber-500" />
        </span>
      ) : null}
    </div>
  );
}
