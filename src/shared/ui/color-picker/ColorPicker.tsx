'use client';
import { ComponentProps, CSSProperties, MouseEvent } from 'react';
import { cn } from 'shared/lib/utils';
import { Check } from 'lucide-react';

type ColorPickerProps = ComponentProps<'button'> & {
  activeColor: string;
  setActiveColor: (color: string) => void;
  size?: keyof typeof variant.size;
  colors: string[];
};

const variant = {
  size: {
    default: 'size-8',
    sm: 'size-5',
    xs: 'size-3',
  },
};

export function ColorPicker({
  disabled,
  className,
  onClick,
  setActiveColor,
  activeColor,
  size = 'default',
  colors,
  ...props
}: ColorPickerProps) {
  const handlePickColor = (e: MouseEvent<HTMLButtonElement>, color: string) => {
    onClick?.(e);
    setActiveColor?.(color);
  };
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {colors.map((item) => {
        const isSelected = activeColor === item;
        const isVeryLight = item?.toLowerCase() === '#ffffff';

        return (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={(e) => handlePickColor(e, item)}
            className={cn(
              'ring-border relative flex items-center justify-center rounded-full ring-1 transition-transform',
              'hover:scale-110 focus-visible:scale-110 focus-visible:outline-none',
              variant.size[size],
              disabled && 'cursor-not-allowed opacity-50'
            )}
            style={
              {
                backgroundColor: item,
                boxShadow: isSelected
                  ? `0 0 0 2px var(--background), 0 0 0 4px ${item}`
                  : undefined,
              } satisfies CSSProperties
            }
            aria-label={`Цвет ${item}`}
            aria-pressed={isSelected}
            {...props}
          >
            {isSelected ? (
              <Check
                className={cn('size-3.5', isVeryLight ? 'text-foreground' : 'text-white')}
                strokeWidth={3}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
