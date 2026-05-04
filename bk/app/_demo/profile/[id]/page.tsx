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
import { useAuth } from '@/components/providers';
import { AppShellWrapper } from '@/components/app-shell';
import { StudyLogCard } from '@/components/study-log-card';
import { getUser, getUserLogs, getUserStats, followUser, unfollowUser } from '@/lib/store';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { User, StudyLog } from '@/lib/types';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export default function ProfilePage() {
  const { user: currentUser, refreshUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [stats, setStats] = useState<{
    totalMinutes: number;
    streak: number;
    logCount: number;
  } | null>(null);

  const loadData = useCallback(() => {
    const user = getUser(userId);
    if (!user) {
      router.push('/timeline');
      return;
    }
    setProfileUser(user);
    setLogs(getUserLogs(userId));
    const userStats = getUserStats(userId, 30);
    setStats({
      totalMinutes: userStats.totalMinutes,
      streak: userStats.streak,
      logCount: userStats.logCount,
    });
  }, [userId, router]);

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
      unfollowUser(currentUser.id, profileUser.id);
    } else {
      followUser(currentUser.id, profileUser.id);
    }
    refreshUser();
    loadData();
  };

  if (!currentUser || !profileUser) {
    return null;
  }

  return (
    <AppShellWrapper>
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
                      Following
                    </Text>
                    <Text size="sm">
                      <Text component="span" fw={700}>
                        {profileUser.followers.length}
                      </Text>{' '}
                      Followers
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
                      Streak
                    </Text>
                    <Text size="lg" fw={700}>
                      {stats.streak} days
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
                      Total Time (30d)
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
                      Logs (30d)
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
              <Tabs.Tab value="logs">Study Logs</Tabs.Tab>
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
                    No study logs yet
                  </Text>
                </Card>
              )}
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </AppShellWrapper>
  );
}
