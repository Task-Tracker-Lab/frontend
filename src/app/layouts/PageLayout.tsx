import { ComponentProps } from 'react';
import { PageLayout as PageLayoutParent } from 'widgets/page-layout';
import { TabsNav } from 'widgets/tabs-nav';

interface PageLayoutProps extends Omit<ComponentProps<typeof PageLayoutParent>, 'nav'> {
  tabs: ComponentProps<typeof TabsNav>['tabs'];
}

export function PageLayout({ children, tabs, ...props }: PageLayoutProps) {
  return (
    <PageLayoutParent nav={tabs && tabs.length ? <TabsNav tabs={tabs} /> : undefined} {...props}>
      {children}
    </PageLayoutParent>
  );
}
