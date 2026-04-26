import { Card, CardContent, CardHeader, Separator, Skeleton } from 'shared/ui';

function ProfilePageSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <Separator />
          <div className="grid gap-2 sm:grid-cols-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-64" />
        </CardContent>
      </Card>
    </div>
  );
}

export { ProfilePageSkeleton };
