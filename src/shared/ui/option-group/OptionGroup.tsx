import { ComponentProps, ReactNode, useId } from 'react';
import { Label } from 'shared/ui';
import { classNames } from 'shared/lib/utils';

export interface OptionGroupItemProps extends ComponentProps<'div'> {
  label: string;
  input: (props: { id: string; 'aria-describedby': string }) => ReactNode;
  hint?: string;
}

export interface OptionGroupProps {
  name: string;
  items: (OptionGroupItemProps & { key: string })[];
}

export function OptionItem({ label, hint, input, className, ...props }: OptionGroupItemProps) {
  const inputId = useId();
  const hintId = useId();

  return (
    <div
      className={classNames(
        'border-border flex items-center justify-between rounded-lg border px-4 py-3',
        {},
        [className]
      )}
      {...props}
    >
      <div>
        <Label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </Label>
        {hint && (
          <p id={hintId} className="text-foreground/80 text-xs">
            {hint}
          </p>
        )}
      </div>

      <div className="max-w-1/2">{input({ id: inputId, 'aria-describedby': hintId })}</div>
    </div>
  );
}

export function OptionGroup({ name, items }: OptionGroupProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-foreground/90 text-xs font-semibold tracking-wide uppercase">{name}</p>
      <div className="divide-muted-foreground/20 border-muted-foreground/20 !divide-y rounded-lg border">
        {items.map((item) => (
          <OptionItem
            className="rounded-none border-0"
            key={item.key}
            label={item.label}
            hint={item.hint}
            input={item.input}
          />
        ))}
      </div>
    </div>
  );
}
