import { classNames } from 'shared/lib/utils';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';

interface PageWrapperProps extends React.ComponentProps<typeof CardContent> {
  wrap?: Omit<React.ComponentProps<typeof Card>, 'children'>;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageWrapper({
  title,
  description,
  action,
  children,
  wrap: { className, ...wrapProps } = {},
  ...props
}: PageWrapperProps) {
  return (
    <Card
      className={classNames('overflow-auto rounded-none pt-8 ring-0 *:px-5', {}, [className])}
      {...wrapProps}
    >
      {(title || description || action) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      <CardContent {...props}>{children}</CardContent>
    </Card>
  );
}
