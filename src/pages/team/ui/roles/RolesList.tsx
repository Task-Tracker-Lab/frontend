'use client';

import { Plus, Shield } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  RadioGroup,
  RadioGroupItem,
} from 'shared/ui';
import { RoleKey, ROLES } from '../../model/roles-mock';

interface RolesListProps {
  className?: string;
  active: RoleKey;
  setActive: Dispatch<SetStateAction<RoleKey>>;
}

export function RolesList({ className, active, setActive }: RolesListProps) {
  return (
    <div className={className}>
      <RadioGroup value={active} onValueChange={(v: RoleKey) => setActive(v)}>
        {ROLES.map(({ key, description, members }) => (
          <FieldLabel htmlFor={key} key={key}>
            <Field orientation="horizontal" className="gap-3">
              <RadioGroupItem value={key} id={key} hidden />
              <div className="border-input peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground flex items-center justify-center rounded-lg border p-3 transition-colors">
                <Shield size={15} />
              </div>
              <FieldContent className="order-2 min-w-0">
                <FieldTitle className="flex w-full items-start justify-between gap-1">
                  <span>{key}</span>
                  <span className="text-muted-foreground text-xs font-medium">{members}</span>
                </FieldTitle>
                <FieldDescription className="text-muted-foreground line-clamp-1 text-xs">
                  {description}
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      <Button variant="outline">
        <Plus size={13} /> Новая роль
      </Button>
    </div>
  );
}
