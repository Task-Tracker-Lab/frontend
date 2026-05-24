'use client';

import { PROJECT_ICONS, projectIconCodeToEmoji } from 'entities/project';
import { ImagePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { cn } from 'shared/lib/utils';
import { Button, Popover, PopoverContent, PopoverTrigger } from 'shared/ui';
import type { CreateProjectFormValues } from '../model/types';

interface ProjectIconPickerProps {
  disabled?: boolean;
}

export function ProjectIconPicker({ disabled = false }: ProjectIconPickerProps) {
  const { control } = useFormContext<CreateProjectFormValues>();
  const selectedColor = useWatch({ control, name: 'color' });
  const selectedIconCode = useWatch({ control, name: 'icon' });
  const [iconOpen, setIconOpen] = useState(false);

  const iconColor = selectedColor ?? '#7C3AED';
  const iconCode = selectedIconCode ?? PROJECT_ICONS[0];

  return (
    <div
      className="border-border bg-muted/20 flex items-center justify-between gap-3 rounded-xl border p-3"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${iconColor} 14%, transparent), color-mix(in srgb, ${iconColor} 6%, transparent))`,
      }}
    >
      <div className="flex items-center gap-3">
        <span className="bg-background/85 ring-border flex size-11 items-center justify-center rounded-xl text-2xl shadow-xs ring-1 backdrop-blur-[1px]">
          {projectIconCodeToEmoji(iconCode)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">Иконка</p>
          <p className="text-muted-foreground text-xs">Выберите иконку для проекта</p>
        </div>
      </div>
      <Popover open={iconOpen} onOpenChange={setIconOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            className="gap-2"
            aria-label="Изменить иконку"
          >
            <ImagePlusIcon className="size-4" />
            Иконка
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-3">
          <div className="mb-2 flex items-center gap-2">
            <ImagePlusIcon className="text-muted-foreground size-4" />
            <p className="text-sm font-medium">Выберите иконку</p>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <>
                  {PROJECT_ICONS.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      variant={iconCode === item ? 'secondary' : 'ghost'}
                      size="icon"
                      className={cn(
                        'h-9 w-9 rounded-lg text-lg',
                        iconCode === item && 'ring-primary ring-2 ring-offset-1'
                      )}
                      disabled={disabled}
                      onClick={() => {
                        field.onChange(item);
                        setIconOpen(false);
                      }}
                      aria-label={`Иконка ${projectIconCodeToEmoji(item)}`}
                      aria-pressed={iconCode === item}
                    >
                      {projectIconCodeToEmoji(item)}
                    </Button>
                  ))}
                </>
              )}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
