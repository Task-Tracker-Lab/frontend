import { ComponentProps } from 'react';
import { cn } from 'shared/lib/utils';

function Checkbox({
  className,
  classNameInput,
  ...props
}: Omit<ComponentProps<'input'>, 'type'> & { classNameInput?: string }) {
  return (
    <div className={cn('relative flex w-max items-center justify-center', className)}>
      <input
        type="checkbox"
        className={cn(
          'relative size-4 appearance-none rounded border-2 border-gray-300 bg-transparent transition-colors checked:border-violet-600 checked:bg-violet-600 disabled:opacity-50 [&+svg]:opacity-0 checked:[&+svg]:opacity-100',
          classNameInput
        )}
        {...props}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute w-3 stroke-4 text-white transition-opacity duration-400"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
}

export { Checkbox };
