import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'shared/lib/utils';
import Image from 'next/image';
import { LogoImage } from 'shared/assests';

const logoVariants = cva('flex items-center [&>span]:font-bold', {
  variants: {
    variant: {
      default: 'gap-2',
      icon: '[&>span]:hidden',
    },
    size: {
      default: '[&>span]:text-2xl',
      sm: '[&>span]:text-xl [&>img]:w-10 [&>img]:h-10 gap-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Logo({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'> & VariantProps<typeof logoVariants>) {
  return (
    <div
      className={cn(logoVariants({ variant, size }), className)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      <Image src={LogoImage} alt="Logo" />
      <span>Task Tracker</span>
    </div>
  );
}

export { Logo, logoVariants };
