import * as React from 'react';
import { Input } from 'shared/ui';

function InputEmail(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      aria-label="Email"
      placeholder="mail@example.com"
      {...props}
      type="text"
      autoComplete="email"
    />
  );
}

export { InputEmail };
