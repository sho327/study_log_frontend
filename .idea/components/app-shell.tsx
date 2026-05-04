'use client';

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  ActionIcon,
  Avatar,
  Menu,
  Indicator,
  useMantineColorScheme,
  Box,
  Stack,
  Divider,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconPlus,
  IconChartBar,
  IconUser,
  IconBell,
  IconSettings,
  IconLogout,
  IconSun,
  IconMoon,
  IconHash,
  IconFolder,
  IconApi,
} from '@tabler/icons-react';
import { useAuth } from './providers';
import { useRouter, usePathname } from 'next/navigation';
import { getNotifications } from '@/lib/store';
import { ReactNode, useMemo } from 'react';

interface AppShellWrapperProps {
  children: ReactNode;
}

const navItems = [
  { label: 'タイムライン', href: '/timeline', icon: IconHome },
  { label: '新規ログ', href: '/logs/new', icon: IconPlus },
  { label: '統計', href: '/stats', icon: IconChartBar },
  { label: 'テーマ', href: '/themes', icon: IconFolder },
  { label: 'タグ', href: '/tags', icon: IconHash },
  { label: 'API', href: '/api-docs', icon: IconApi },
];

export function AppShellWrapper({ children }: AppShellWrapperProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const notifications = useMemo(() => {
    if (!user) return [];
    return getNotifications(user.id);
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text
              size="xl"
              fw={700}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/timeline')}
            >
              Knolty
            </Text>
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
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          <Stack gap={4}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                active={pathname === item.href || pathname?.startsWith(item.href + '/')}
                onClick={() => {
                  router.push(item.href);
                  close();
                }}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
              />
            ))}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Divider my="sm" />
          <Box p="xs">
            <Group>
              <Avatar src={user.avatar} radius="xl" size="sm" color="brand">
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box style={{ flex: 1 }}>
                <Text size="sm" fw={500} lineClamp={1}>
                  {user.name}
                </Text>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {user.email}
                </Text>
              </Box>
            </Group>
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
