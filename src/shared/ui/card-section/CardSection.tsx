import * as React from 'react';
import { ComponentProps, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui';

interface ICardSectionProps extends Omit<ComponentProps<typeof CardContent>, 'title'> {
  title: string | ReactNode;
  description: string | ReactNode;
}

function CardSection({ title, description, ...props }: ICardSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent {...props} />
    </Card>
  );
}

export { CardSection };
