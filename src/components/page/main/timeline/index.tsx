'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Group,
  Card,
  Skeleton,
  Center,
  Box,
} from '@mantine/core';
import { IconPlus, IconMoodEmpty } from '@tabler/icons-react';
import { useAuth } from '@/components/providers/mantineProvider';
import { StudyLogCard } from '@/components/page/main/logs/StudyLogCard';
import { useAppStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import type { StudyLog } from '@/types';

export function TimelineContent() {
  const { user } = useAuth();
  const router = useRouter();
  const store = useAppStore();
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = useCallback(() => {
    if (user) {
      const timelineLogs = store.getTimelineLogs(user.id);
      setLogs(timelineLogs);
    }
    setLoading(false);
  }, [user, store]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadLogs();
  }, [user, router, loadLogs]);

  if (!user) {
    return null;
  }

  return (
    <Container size="sm" py="md">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2}>タイムライン</Title>
            <Text c="dimmed" size="sm">
              あなたとフォロー中のユーザーの学習ログ
            </Text>
          </Box>
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => router.push('/logs/new')}
          >
            新規ログ
          </Button>
        </Group>

        {loading ? (
          <Stack gap="md">
            {[1, 2, 3].map((i) => (
              <Card key={i} shadow="sm" padding="lg" radius="lg" withBorder>
                <Stack gap="md">
                  <Group>
                    <Skeleton circle height={40} width={40} />
                    <Stack gap={4}>
                      <Skeleton height={14} width={120} />
                      <Skeleton height={10} width={80} />
                    </Stack>
                  </Group>
                  <Skeleton height={60} />
                  <Skeleton height={20} width="60%" />
                </Stack>
              </Card>
            ))}
          </Stack>
        ) : logs.length === 0 ? (
          <Card shadow="sm" padding="xl" radius="lg" withBorder>
            <Center py="xl">
              <Stack align="center" gap="md">
                <IconMoodEmpty size={48} stroke={1.5} color="var(--mantine-color-dimmed)" />
                <Text c="dimmed" ta="center">
                  まだログがありません。最初の学習ログを作成しましょう!
                </Text>
                <Button
                  leftSection={<IconPlus size={18} />}
                  onClick={() => router.push('/logs/new')}
                >
                  最初のログを作成
                </Button>
              </Stack>
            </Center>
          </Card>
        ) : (
          <Stack gap="md">
            {logs.map((log) => (
              <StudyLogCard key={log.id} log={log} onUpdate={loadLogs} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
