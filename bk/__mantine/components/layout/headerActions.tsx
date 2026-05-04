'use client';

import React from 'react';
import {
  Group,
  Menu,
  ActionIcon,
  Badge,
  Text,
  Divider,
  UnstyledButton,
  Avatar,
} from '@mantine/core';
import {
  Bell,
  Users,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

import { currentUser } from '@/types/repository/common';

// -----------------------------------------------------------------
// HeaderActions：通知・ユーザーメニュー
// -----------------------------------------------------------------
export function HeaderActions({ currentUser }: { currentUser: currentUser | null }) {
  const badgeCount = 3;

  return (
    <Group gap="md" wrap="nowrap">
      {/* 通知ドロップダウン */}
      <Menu id="global-notif-menu" shadow="md" width={280} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            color="oklch(0.551 0.027 264.4)" // gray-500
            size="lg"
            pos="relative"
            style={{ overflow: 'visible' }}
          >
            <Bell style={{ width: 26, height: 26 }} />
            {badgeCount > 0 && (
              <Badge
                color="error"
                variant="filled"
                pos="absolute"
                top={4}
                right={4}
                circle
                size="xs"
                style={{
                  border: '1.5px solid white',
                  minWidth: '16px',
                  height: '16px',
                  padding: 0,
                  fontSize: '10px',
                  zIndex: 10,
                  transform: 'translate(45%, -45%)',
                  pointerEvents: 'none'
                }}
              >
                {badgeCount}
              </Badge>
            )}
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label><Text fw={800} size="sm">直近の通知</Text></Menu.Label>
          <Menu.Item leftSection={<Bell style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>新しい共有事項があります</Text>
          </Menu.Item>
          <Menu.Item leftSection={<Users style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>スペースへの招待が届いています</Text>
          </Menu.Item>
          <Divider />
          <Menu.Item component={Link} href="/notifications" style={{ textAlign: 'center', color: 'oklch(0.73 0.11 162)', fontWeight: 800 }}>
            <Text size="sm">すべてを見る</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* ユーザーアバターメニュー */}
      <Menu id="global-user-menu" shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <UnstyledButton style={{ borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
            <Avatar radius="xl" size="md" color="brand.6" src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + (currentUser?.id || "default")} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label><Text fw={800} size="sm">ユーザー設定</Text></Menu.Label>
          <Menu.Item leftSection={<User style={{ width: 16, height: 16 }} />}><Text size="sm" fw={500}>プロフィール</Text></Menu.Item>
          <Menu.Item leftSection={<Settings style={{ width: 16, height: 16 }} />}><Text size="sm" fw={500}>設定</Text></Menu.Item>
          <Divider />
          <Menu.Item color="error" leftSection={<LogOut style={{ width: 16, height: 16 }} />}><Text size="sm" fw={800}>ログアウト</Text></Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}