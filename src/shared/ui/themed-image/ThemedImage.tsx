import * as React from 'react';
import { cn } from 'shared/lib/utils';
import Image from 'next/image';

interface ThemedImageProps extends Omit<
  React.ComponentProps<typeof Image>,
  'src' | 'preload' | 'loading'
> {
  srcLight: React.ComponentProps<typeof Image>['src'];
  srcDark: React.ComponentProps<typeof Image>['src'];
}

function ThemedImage({ className, srcDark, srcLight, alt, ...props }: ThemedImageProps) {
  return (
    <>
      <Image {...props} className={cn(className, 'dark:hidden')} src={srcLight} alt={alt} />
      <Image {...props} className={cn(className, 'light:hidden !hidden')} src={srcDark} alt={alt} />
    </>
  );
}

export { ThemedImage };
