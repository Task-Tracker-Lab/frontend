'use client';

import { Button, InputGroup, InputGroupAddon, InputGroupInput } from 'shared/ui';
import { useState } from 'react';
export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
        ></Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
