'use client';

import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '../InputGroup';
import { Kbd } from '../Kbd';
import { ComponentProps, useEffect, useRef } from 'react';

type SearchProps = ComponentProps<typeof InputGroupInput>;

export function Search(props: SearchProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          {...props}
          ref={(ref) => {
            input.current = ref;
          }}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
