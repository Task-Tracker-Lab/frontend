import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';

interface PageWrapperProps extends React.ComponentProps<typeof CardContent> {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageWrapper({ title, description, action, children, ...props }: PageWrapperProps) {
  return (
    <Card className="overflow-visible rounded-none pt-4 ring-0 *:px-2 lg:pt-8 lg:*:px-5">
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
