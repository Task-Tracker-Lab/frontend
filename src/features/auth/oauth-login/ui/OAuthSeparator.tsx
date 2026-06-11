import { classNames } from 'shared/lib/utils';

export function OAuthSeparator({ className }: { className?: string }) {
  return (
    <div className={classNames('text-muted-foreground my-3 flex items-center', {}, [className])}>
      <hr className="w-full" />
      <span className="block px-2">или</span>
      <hr className="w-full" />
    </div>
  );
}
