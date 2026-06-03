'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { UserAvatar, UserQueries } from 'entities/user';
import { SignOut } from 'features/auth/sign-out';
import { LogOut, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { routes } from 'shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton,
} from 'shared/ui';

export function NavUserContent() {
  const query = useSuspenseQuery(UserQueries.getMe());

  const {
    email,
    profile: { avatar, firstName, lastName },
  } = query.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground size-10 rounded-full p-0.5"
        >
          <UserAvatar
            wrap={{ className: 'size-9' }}
            src={avatar?.small}
            alt={firstName}
            fallback={{ firstName, lastName }}
          />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar src={avatar?.small} alt={firstName} fallback={{ firstName, lastName }} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{firstName}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={routes.profile.me()}>
            <DropdownMenuItem>
              <UserRoundIcon />
              Мой профиль
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOut asChild>
          <DropdownMenuItem className="text-destructive">
            <LogOut className="size-4" />
            Выйти
          </DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
