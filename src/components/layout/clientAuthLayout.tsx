'use client';

import { Box, Container, Group, Text, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ClientAuthLayoutProps {
  children: ReactNode;
}

export function ClientAuthLayout({ children }: ClientAuthLayoutProps) {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box mih="100vh" style={{ display: 'flex', flexDirection: 'column' }}>
      <Box p="md">
        <Container size="lg">
          <Group justify="space-between">
            <Text
              size="xl"
              fw={700}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              StudyLog
            </Text>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={toggleColorScheme}
              aria-label="テーマ切替"
            >
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Group>
        </Container>
      </Box>
      {children}
    </Box>
  );
}
