'use client';

import { PROJECT_COLORS } from 'entities/project';
import { Check } from 'lucide-react';
import { type CSSProperties } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import type { ProjectIdentityFormValues } from '../model/types';

interface ProjectColorPickerProps {
  disabled?: boolean;
}

export function ProjectColorPicker({ disabled = false }: ProjectColorPickerProps) {
  const { control } = useFormContext<ProjectIdentityFormValues>();
  const selectedColor = useWatch({ control, name: 'color' });
  const activeColor = selectedColor ?? PROJECT_COLORS[0];

  return (
    <Controller
      name="color"
      control={control}
      render={({ field }) => (
        <div className="flex flex-wrap gap-2">
          {PROJECT_COLORS.map((item) => {
            const isSelected = activeColor === item;
            const isVeryLight = item.toLowerCase() === '#ffffff';

            return (
              <button
                key={item}
                type="button"
                disabled={disabled}
                onClick={() => field.onChange(item)}
                className={cn(
                  'ring-border relative flex size-8 items-center justify-center rounded-full ring-1 transition-transform',
                  'hover:scale-110 focus-visible:scale-110 focus-visible:outline-none',
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
      )}
    />
  );
}
