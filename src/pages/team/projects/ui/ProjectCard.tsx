'use client';

import { projectIconCodeToEmoji, type TProject } from 'entities/project';
import { ArrowUpRight } from 'lucide-react';
import { routes } from 'shared/config';
import { formatDate } from 'shared/lib/utils';
import {
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Link,
  OwnerWrap,
} from 'shared/ui';
import { projectStatusMap } from '../config/project-status-map';

interface ProjectCardProps {
  project: TProject.ProjectListItemResponse;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = projectStatusMap[project.status];
  const icon = projectIconCodeToEmoji(project.icon) || '📁';

  return (
    <Item asChild variant="outline" className="hover:bg-muted/30 transition">
      <Link
        variant="clear"
        href={routes.team.projects.project(project.slug)}
        className="no-underline hover:no-underline"
      >
        <ItemMedia>
          <OwnerWrap isOwner={project.role === 'owner'}>
            <span
              className="bg-muted border-border inline-flex size-9 items-center justify-center rounded-full border text-base leading-none"
              aria-hidden
            >
              {icon}
            </span>
          </OwnerWrap>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{project.name}</ItemTitle>
          <ItemDescription className="line-clamp-1">{project.description}</ItemDescription>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <span className="text-muted-foreground text-xs">
              Создан: {formatDate(project.createdAt)}
            </span>
          </div>
        </ItemContent>
        <ItemActions className="self-start">
          <ArrowUpRight className="text-muted-foreground size-4" />
        </ItemActions>
      </Link>
    </Item>
  );
}
