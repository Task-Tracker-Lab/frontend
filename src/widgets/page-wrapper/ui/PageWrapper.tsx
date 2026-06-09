import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';

interface PageWrapperProps extends React.ComponentProps<typeof CardContent> {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageWrapper({ title, description, action, children, ...props }: PageWrapperProps) {
  return (
    <Card className="rounded-none pt-8 ring-0 *:px-5">
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
