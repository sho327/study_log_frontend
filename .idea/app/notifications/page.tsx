'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Group,
  Avatar,
  Button,
  Box,
  Center,
  ActionIcon,
} from '@mantine/core';
import {
  IconHeart,
  IconMessage,
  IconUserPlus,
  IconCheck,
  IconMoodEmpty,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useAuth } from '@/components/providers';
import { AppShellWrapper } from '@/components/app-shell';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUser,
} from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import type { Notification } from '@/lib/types';

function NotificationIcon({ type }: { type: Notification['type'] }) {
  switch (type) {
    case 'like':
      return <IconHeart size={16} />;
    case 'comment':
      return <IconMessage size={16} />;
    case 'follow':
      return <IconUserPlus size={16} />;
  }
}

function getNotificationColor(type: Notification['type']): string {
  switch (type) {
    case 'like':
      return 'red';
    case 'comment':
      return 'blue';
    case 'follow':
      return 'green';
  }
}

function getNotificationText(type: Notification['type'], actorName: string): string {
  switch (type) {
    case 'like':
      return `${actorName} liked your log`;
    case 'comment':
      return `${actorName} commented on your log`;
    case 'follow':
      return `${actorName} started following you`;
  }
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = useCallback(() => {
    if (!user) return;
    const userNotifications = getNotifications(user.id);
    setNotifications(userNotifications);
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadNotifications();
  }, [user, router, loadNotifications]);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    if (!user) return;
    markAllNotificationsAsRead(user.id);
    loadNotifications();
  };

  const handleNotificationClick = (notification: Notification) => {
    handleMarkAsRead(notification.id);
    
    if (notification.type === 'follow') {
      router.push(`/profile/${notification.actorId}`);
    } else if (notification.targetId) {
      router.push(`/timeline`);
    }
  };

  if (!user) {
    return null;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppShellWrapper>
      <Container size="sm" py="md">
        <Stack gap="lg">
          <Group justify="space-between" align="center">
            <Box>
              <Title order={2}>Notifications</Title>
              <Text c="dimmed" size="sm">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </Text>
            </Box>
            {unreadCount > 0 && (
              <Button
                variant="subtle"
                leftSection={<IconCheck size={16} />}
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </Group>

          {notifications.length === 0 ? (
            <Card shadow="sm" padding="xl" radius="lg" withBorder>
              <Center py="xl">
                <Stack align="center" gap="md">
                  <IconMoodEmpty size={48} stroke={1.5} color="var(--mantine-color-dimmed)" />
                  <Text c="dimmed" ta="center">
                    No notifications yet
                  </Text>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Stack gap="xs">
              {notifications.map((notification) => {
                const actor = getUser(notification.actorId);
                if (!actor) return null;

                return (
                  <Card
                    key={notification.id}
                    shadow={notification.read ? 'none' : 'sm'}
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{
                      cursor: 'pointer',
                      opacity: notification.read ? 0.7 : 1,
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="sm" wrap="nowrap">
                        <Avatar
                          src={actor.avatar}
                          alt={actor.name}
                          size="md"
                          radius="xl"
                          color="brand"
                        >
                          {actor.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              size="sm"
                              color={getNotificationColor(notification.type)}
                              radius="xl"
                            >
                              <NotificationIcon type={notification.type} />
                            </ActionIcon>
                            <Text size="sm" fw={notification.read ? 400 : 600}>
                              {getNotificationText(notification.type, actor.name)}
                            </Text>
                          </Group>
                          <Text size="xs" c="dimmed" mt={2}>
                            {formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                              locale: ja,
                            })}
                          </Text>
                        </Box>
                      </Group>

                      {!notification.read && (
                        <Box
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: 'var(--mantine-color-blue-filled)',
                          }}
                        />
                      )}
                    </Group>
                  </Card>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Container>
    </AppShellWrapper>
  );
}
