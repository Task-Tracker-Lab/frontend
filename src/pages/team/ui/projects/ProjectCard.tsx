'use client';

import { projectIconCodeToEmoji, TProject } from 'entities/project';
import { useTeamStore } from 'entities/team';
import { ArchiveProjectDialog, RestoreProjectDialog } from 'features/projects/archive';
import { RemoveProjectDialog } from 'features/projects/remove';
import { ShareProjectDialog } from 'features/projects/share';
import { CalendarDays, KeyRound, MoreHorizontal, ShieldCheck, ShieldX, Users } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { routes } from 'shared/config';
import { cn, formatDate } from 'shared/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Progress,
} from 'shared/ui';

export type ProjectCardProps = ComponentProps<typeof Card> & {
  project?: TProject.ProjectListItemResponse;
  name?: string;
  description?: string;
  statusLabel?: string;
};

const statusLabels: Record<TProject.ProjectListItemResponse['status'], string> = {
  active: 'Активен',
  archived: 'В архиве',
  template: 'Шаблон',
  deleted: 'Удалён',
};

export function ProjectCard({
  className,
  project,
  name: nameProp,
  description: descriptionProp,
  statusLabel: statusLabelProp,
  ...props
}: ProjectCardProps) {
  const teamId = useTeamStore.use.teamId();
  const name = nameProp ?? project?.name ?? 'Atlas Platform';
  const description =
    descriptionProp ?? (project ? `Ключ проекта: ${project.slug}` : 'Core team workspace.');
  const statusLabel = statusLabelProp ?? (project ? statusLabels[project.status] : 'On Track');
  const iconEmoji = project ? projectIconCodeToEmoji(project.icon) : null;
  const iconColor = project?.color;
  const createdAtLabel = project ? formatDate(project.createdAt).split(',')[0] : null;

  // Deterministic mock data for visual flair
  const mockProgress = project ? (project.id.charCodeAt(0) % 60) + 30 : 75;
  const mockMembersCount = project ? (project.id.charCodeAt(1) % 3) + 2 : 3;
  const mockMembers = Array.from({ length: mockMembersCount }).map((_, i) => i + 1);

  const projectHref = project && teamId ? routes.team.project.root(project.slug) : null;
  const canEdit = project?.role === 'admin' || project?.role === 'owner';
  const card = (
    <Card
      className={cn(
        'group border-border/50 bg-background hover:border-primary/30 hover:shadow-primary/5 relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {projectHref && (
        <Link
          href={projectHref}
          className="absolute inset-0 z-0 rounded-xl"
          aria-label={`Открыть проект ${name}`}
        />
      )}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: iconColor || 'var(--primary)' }}
      />

      <CardHeader className="relative z-10 block gap-3 pt-5 pb-2">
        <div className="pointer-events-none flex min-w-0 items-start gap-4 pr-10">
          <div
            className={cn(
              'flex size-12 shrink-0 items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-105',
              !iconColor && 'bg-primary/10 text-primary'
            )}
          >
            {iconEmoji ? (
              <span aria-hidden>{iconEmoji}</span>
            ) : (
              <span className="text-lg font-bold">{name.slice(0, 1).toUpperCase()}</span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
            <CardTitle className="group-hover:text-primary line-clamp-1 text-lg font-bold tracking-tight transition-colors">
              {name}
            </CardTitle>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  'h-5 shrink-0 px-1.5 text-[10px] font-medium tracking-wider uppercase',
                  project?.status === 'archived'
                    ? 'border-border bg-muted text-muted-foreground'
                    : 'border-emerald-200/50 bg-emerald-50/50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400'
                )}
              >
                {project?.status !== 'archived' && (
                  <span className="mr-1 size-1.5 rounded-full bg-emerald-500" />
                )}
                {statusLabel}
              </Badge>
              {project?.slug && (
                <span className="text-muted-foreground flex min-w-0 items-center gap-1 truncate text-xs font-medium">
                  <KeyRound className="size-3 shrink-0" />
                  {project.slug}
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className="pointer-events-auto absolute top-4 right-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="bg-background/80 hover:bg-background size-8 shrink-0 shadow-sm backdrop-blur-sm"
                aria-label="Действия с проектом"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ShareProjectDialog
                projectName={project?.name ?? ''}
                teamId={teamId!}
                projectId={project?.id ?? ''}
                asChild
                disabled={!(project && teamId)}
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Поделиться</DropdownMenuItem>
              </ShareProjectDialog>
              {project?.status === 'archived' ? (
                <RestoreProjectDialog
                  projectName={project.name}
                  teamId={teamId!}
                  projectId={project.id}
                  asChild
                  disabled={!(canEdit && teamId)}
                >
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Восстановить
                  </DropdownMenuItem>
                </RestoreProjectDialog>
              ) : (
                project?.status !== 'template' && (
                  <ArchiveProjectDialog
                    projectName={project?.name ?? ''}
                    teamId={teamId!}
                    projectId={project?.id ?? ''}
                    asChild
                    disabled={!(canEdit && teamId)}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Архивировать
                    </DropdownMenuItem>
                  </ArchiveProjectDialog>
                )
              )}
              <RemoveProjectDialog
                projectName={project?.name ?? ''}
                teamId={teamId!}
                projectId={project?.id ?? ''}
                asChild
                disabled={!(project && teamId)}
              >
                <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                  Удалить
                </DropdownMenuItem>
              </RemoveProjectDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pointer-events-none relative z-[1] flex-1 pt-2 pb-4">
        <CardDescription className="text-muted-foreground/80 mb-5 line-clamp-2 h-10 text-sm">
          {description}
        </CardDescription>

        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span className="text-foreground/70 font-medium">Прогресс</span>
            <span>{mockProgress}%</span>
          </div>
          <Progress value={mockProgress} className="h-1.5" />
        </div>
      </CardContent>

      <CardFooter className="border-border/50 bg-muted/20 pointer-events-none relative z-[1] flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {mockMembers.map((i) => (
              <Avatar key={i} className="border-background size-6 border-2">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${project?.id || 'demo'}${i}`} />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                  U{i}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="border-background bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full border-2 text-[10px] font-medium">
              <Users className="size-3" />
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          {canEdit ? (
            <span className="flex items-center gap-1" title="Можно редактировать">
              <ShieldCheck className="size-3.5 text-emerald-500" />
            </span>
          ) : (
            <span className="flex items-center gap-1" title="Только просмотр">
              <ShieldX className="text-destructive size-3.5" />
            </span>
          )}
          {createdAtLabel && (
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {createdAtLabel}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  return card;
}
