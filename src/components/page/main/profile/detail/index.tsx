'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Avatar,
  Group,
  Button,
  Tabs,
  Box,
  SimpleGrid,
  ThemeIcon,
} from '@mantine/core';
import { IconFlame, IconClock, IconCalendar, IconUserPlus, IconUserMinus } from '@tabler/icons-react';
import { useAuth } from '@/components/providers/mantineProvider';
import { StudyLogCard } from '@/components/page/main/logs/StudyLogCard';
import { useAppStore } from '@/stores';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { User, StudyLog } from '@/types';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function ProfileDetailContent() {
  const { user: currentUser, refreshUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const store = useAppStore();

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [stats, setStats] = useState<{
    totalMinutes: number;
    streak: number;
    logCount: number;
  } | null>(null);

  const loadData = useCallback(() => {
    const user = store.getUser(userId);
    if (!user) {
      router.push('/timeline');
      return;
    }
    setProfileUser(user);
    setLogs(store.getUserLogs(userId));
    const userStats = store.getUserStats(userId, 30);
    setStats({
      totalMinutes: userStats.totalMinutes,
      streak: userStats.streak,
      logCount: userStats.logCount,
    });
  }, [userId, router, store]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    loadData();
  }, [currentUser, router, loadData]);

  const isFollowing = currentUser && profileUser
    ? currentUser.following.includes(profileUser.id)
    : false;

  const isOwnProfile = currentUser?.id === userId;

  const handleFollowToggle = () => {
    if (!currentUser || !profileUser) return;

    if (isFollowing) {
      store.unfollowUser(currentUser.id, profileUser.id);
    } else {
      store.followUser(currentUser.id, profileUser.id);
    }
    refreshUser();
    loadData();
  };

  if (!currentUser || !profileUser) {
    return null;
  }

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <Group>
              <Avatar
                src={profileUser.avatar}
                alt={profileUser.name}
                size={80}
                radius="xl"
                color="brand"
              >
                {profileUser.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Title order={3}>{profileUser.name}</Title>
                {profileUser.bio && (
                  <Text c="dimmed" size="sm" maw={400}>
                    {profileUser.bio}
                  </Text>
                )}
                <Group gap="lg" mt="xs">
                  <Text size="sm">
                    <Text component="span" fw={700}>
                      {profileUser.following.length}
                    </Text>{' '}
                    フォロー
                  </Text>
                  <Text size="sm">
                    <Text component="span" fw={700}>
                      {profileUser.followers.length}
                    </Text>{' '}
                    フォロワー
                  </Text>
                </Group>
              </Box>
            </Group>

            {!isOwnProfile && (
              <Button
                variant={isFollowing ? 'default' : 'filled'}
                leftSection={isFollowing ? <IconUserMinus size={16} /> : <IconUserPlus size={16} />}
                onClick={handleFollowToggle}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </Group>
        </Card>

        {stats && (
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            <Card shadow="sm" padding="md" radius="lg" withBorder>
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="orange">
                  <IconFlame size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    連続記録
                  </Text>
                  <Text size="lg" fw={700}>
                    {stats.streak} 日
                  </Text>
                </Box>
              </Group>
            </Card>

            <Card shadow="sm" padding="md" radius="lg" withBorder>
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <IconClock size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    総学習時間
                  </Text>
                  <Text size="lg" fw={700}>
                    {formatDuration(stats.totalMinutes)}
                  </Text>
                </Box>
              </Group>
            </Card>

            <Card shadow="sm" padding="md" radius="lg" withBorder>
              <Group>
                <ThemeIcon size={40} radius="md" variant="light" color="green">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    学習記録数
                  </Text>
                  <Text size="lg" fw={700}>
                    {stats.logCount}
                  </Text>
                </Box>
              </Group>
            </Card>
          </SimpleGrid>
        )}

        <Tabs defaultValue="logs">
          <Tabs.List>
            <Tabs.Tab value="logs">学習記録</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="logs" pt="md">
            {logs.length > 0 ? (
              <Stack gap="md">
                {logs.map((log) => (
                  <StudyLogCard
                    key={log.id}
                    log={log}
                    onUpdate={loadData}
                    showDelete={isOwnProfile}
                  />
                ))}
              </Stack>
            ) : (
              <Card shadow="sm" padding="xl" radius="lg" withBorder>
                <Text c="dimmed" ta="center">
                  まだ学習記録がありません
                </Text>
              </Card>
            )}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
