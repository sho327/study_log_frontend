'use client';

import {
  NavLink,
  Stack,
  Box,
  Text,
  Avatar,
  Group,
  Divider,
  ScrollArea,
} from '@mantine/core';
import {
  IconHome,
  IconPlus,
  IconChartBar,
  IconHash,
  IconFolder,
  IconApi,
} from '@tabler/icons-react';
import { useAuth } from '@/components/providers/mantineProvider';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  onNavigate?: () => void;
}

const navItems = [
  { label: 'タイムライン', href: '/timeline', icon: IconHome },
  { label: '新規ログ', href: '/logs/new', icon: IconPlus },
  { label: '統計', href: '/stats', icon: IconChartBar },
  { label: 'テーマ', href: '/themes', icon: IconFolder },
  { label: 'タグ', href: '/tags', icon: IconHash },
  { label: 'API', href: '/api-docs', icon: IconApi },
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const handleNavClick = (href: string) => {
    router.push(href);
    onNavigate?.();
  };

  return (
    <>
      <Box style={{ flex: 1 }}>
        <ScrollArea>
          <Stack gap={4}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                active={pathname === item.href || pathname?.startsWith(item.href + '/')}
                onClick={() => handleNavClick(item.href)}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Box>

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
    </>
  );
}
