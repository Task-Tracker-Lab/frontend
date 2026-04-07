import * as React from 'react';
import { cn } from 'shared/lib';
import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const linkVariants = cva('underline-offset-4 hover:underline', {
  variants: {
    variant: {
      default: 'text-link-foreground bg-link hover:!text-link-foreground/80',
      primary: 'text-primary',
      clear: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Link({
  className,
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>) {
  return (
    <NextLink className={cn(linkVariants({ variant }), className)} {...props}>
      {children}
    </NextLink>
  );
}

export { Link, linkVariants };
