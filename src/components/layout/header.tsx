'use client';

import {
  Group,
  Text,
  ActionIcon,
  Avatar,
  Menu,
  Indicator,
  useMantineColorScheme,
  Burger,
} from '@mantine/core';
import {
  IconUser,
  IconBell,
  IconSettings,
  IconLogout,
  IconSun,
  IconMoon,
  IconBook,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAppStore, useCurrentUser } from '@/stores';
import { useMemo } from 'react';

interface HeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  const user = useCurrentUser();
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const store = useAppStore();

  const notifications = useMemo(() => {
    if (!user) return [];
    return store.getNotifications(user.id);
  }, [user, store]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  if (!user) {
    return (
      <Group h="100%" px="md" justify="space-between">
        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          <IconBook size={24} color="var(--mantine-color-blue-filled)" />
          <Text size="xl" fw={700}>
            Knolty
          </Text>
        </Group>
        <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="テーマ切替"
        >
          {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
        </ActionIcon>
      </Group>
    );
  }

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        {toggle && (
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        )}
        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => router.push('/timeline')}>
          <IconBook size={24} color="var(--mantine-color-blue-filled)" />
          <Text size="xl" fw={700}>
            Knolty
          </Text>
        </Group>
      </Group>

      <Group gap="xs">
        <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="テーマ切替"
        >
          {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
        </ActionIcon>

        <Indicator
          color="red"
          size={8}
          offset={4}
          disabled={unreadCount === 0}
          processing={unreadCount > 0}
        >
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => router.push('/notifications')}
            aria-label="通知"
          >
            <IconBell size={20} />
          </ActionIcon>
        </Indicator>

        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" size="lg" radius="xl">
              <Avatar
                src={user.avatar}
                alt={user.name}
                radius="xl"
                size="sm"
                color="brand"
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{user.name}</Menu.Label>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              onClick={() => router.push(`/profile/${user.id}`)}
            >
              プロフィール
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSettings size={14} />}
              onClick={() => router.push('/settings')}
            >
              設定
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={handleLogout}
            >
              ログアウト
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
