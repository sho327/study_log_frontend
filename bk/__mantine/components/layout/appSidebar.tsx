'use client';

import React from 'react';
import {
  AppShell,
  Box,
  Stack,
  Text,
  Divider,
  ScrollArea,
  UnstyledButton,
  Group,
} from '@mantine/core';
import {
  LayoutDashboard,
  Bell,
  Users,
  User,
  Settings,
  Undo2,
} from 'lucide-react';
import { SpaceMenu } from '@/components/layout/spaceMenu';
import { MenuLink } from '@/components/layout/menuLink';
import Link from 'next/link';

import { T_SpaceRow } from '@/types/supabase/space'
import { T_ProjectRow } from '@/types/supabase/project'

interface ProjectLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface AppSidebarProps {
  collapsed: boolean;
  pathname: string;
  mobileSpaceMenuOpened: boolean;
  setMobileSpaceMenuOpened: (opened: boolean) => void;
  spaces: T_SpaceRow[];
  activeSpace: T_SpaceRow | null;
  activeProject?: T_ProjectRow | null;
  projectLinks?: ProjectLink[];
  backLink?: string;
  isMobileDrawer?: boolean;
  onLinkClick?: () => void;
}

export const AppSidebar = ({
  collapsed,
  pathname,
  mobileSpaceMenuOpened,
  setMobileSpaceMenuOpened,
  spaces,
  activeSpace,
  activeProject,
  projectLinks,
  backLink,
  isMobileDrawer = false,
  onLinkClick,
}: AppSidebarProps) => {
  return (
    <AppShell.Navbar
      p="xs"
      style={{
        borderRight: '1px solid oklch(0.929 0.013 255.5)',
        zIndex: 1002,
      }}
    >
      <ScrollArea h="100%" type="never">
        {/* 【スマホ用スペース切替】 */}
        <Box mb="lg" style={{ width: '100%' }} hiddenFrom={!isMobileDrawer ? 'sm' : undefined}>
          <Stack gap={4} px={4}>
            <Text size="xs" c="dimmed" fw={700} ml={2} tt="uppercase" style={{ letterSpacing: '0.5px' }} mb={"xs"}>
              スペース切替
            </Text>
            <SpaceMenu
              isMobile
              opened={mobileSpaceMenuOpened}
              onChange={setMobileSpaceMenuOpened}
              spaces={spaces}
              activeSpace={activeSpace}
            />
          </Stack>
        </Box>

        {/* メニューリンク一覧 */}
        <Stack gap={2} px={collapsed ? 0 : 4} align={collapsed ? "center" : "stretch"}>
          {/* プロジェクト用に戻るボタンを最上部に配置 */}
          {backLink && (
            <>
              <MenuLink
                href={backLink}
                label="一覧へ戻る"
                icon={<Undo2 style={{ width: 22, height: 22 }} />}
                collapsed={collapsed}
                onClick={onLinkClick}
              />
              <Divider my="sm" />
            </>
          )}
          {/* スペースメニューラベル */}
          {!collapsed && (
            <Text size="xs" c="dimmed" fw={700} ml={collapsed ? 0 : 2} tt="uppercase" style={{ letterSpacing: '0.5px' }} mb={"xs"}>
              スペースメニュー
            </Text>
          )}

          <MenuLink
            href={`/spaces/${activeSpace?.id}/projects`}
            label={projectLinks ? "タスク一覧" : "プロジェクト一覧"}
            icon={<LayoutDashboard style={{ width: 22, height: 22 }} />}
            active={pathname.includes('/projects')}
            collapsed={collapsed}
            onClick={onLinkClick}
          />

          {/* プロジェクト固有リンク */}
          {projectLinks?.map((link) => (
            <MenuLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={pathname.includes(link.href)}
              collapsed={collapsed}
              onClick={onLinkClick}
            />
          ))}

          <Divider my="sm" />

          {/* グローバルメニューラベル */}
          {!collapsed && (
            <Text
              size="xs"
              c="dimmed"
              fw={700}
              ml={collapsed ? 0 : 2}
              tt="uppercase"
              style={{ letterSpacing: '0.5px' }}
              mb={"xs"}
            >
              グローバルメニュー
            </Text>
          )}

          <MenuLink
            href="/notifications"
            label="お知らせ一覧"
            icon={<Bell style={{ width: 22, height: 22 }} />}
            active={pathname === '/spaces/xxx/notifications'}
            collapsed={collapsed}
            badge={3}
            onClick={onLinkClick}
          />

          <MenuLink
            href="/invitations"
            label="承認待ち招待"
            icon={<Users style={{ width: 22, height: 22 }} />}
            active={pathname === '/spaces/xxx/invitations'}
            collapsed={collapsed}
            onClick={onLinkClick}
          />

          <MenuLink
            href="/profile"
            label="プロフィール"
            icon={<User style={{ width: 22, height: 22 }} />}
            active={pathname === '/profile'}
            collapsed={collapsed}
            onClick={onLinkClick}
          />

          <MenuLink
            href="/settings"
            label="アプリ設定"
            icon={<Settings style={{ width: 22, height: 22 }} />}
            active={pathname === '/settings'}
            collapsed={collapsed}
            onClick={onLinkClick}
          />
        </Stack>
      </ScrollArea>
    </AppShell.Navbar>
  );
};