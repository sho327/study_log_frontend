'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  ColorInput,
  SimpleGrid,
  ActionIcon,
  Badge,
  Box,
  Progress,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash, IconFolder, IconMoodEmpty } from '@tabler/icons-react';
import { useAuth } from '@/components/providers/mantineProvider';
import { useAppStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, useCallback } from 'react';
import type { Theme, StudyLog } from '@/types';

interface ThemeWithStats extends Theme {
  logCount: number;
  totalMinutes: number;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function ThemesContent() {
  const { user } = useAuth();
  const router = useRouter();
  const store = useAppStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [themes, setThemes] = useState<ThemeWithStats[]>([]);
  const [logs, setLogs] = useState<StudyLog[]>([]);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      color: '#228be6',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
    },
  });

  const loadData = useCallback(() => {
    if (!user) return;

    const userThemes = store.getUserThemes(user.id);
    const userLogs = store.getUserLogs(user.id);
    setLogs(userLogs);

    const themesWithStats = userThemes.map((theme) => {
      const themeLogs = userLogs.filter((log) => log.themeId === theme.id);
      return {
        ...theme,
        logCount: themeLogs.length,
        totalMinutes: themeLogs.reduce((sum, log) => sum + log.duration, 0),
      };
    });

    setThemes(themesWithStats);
  }, [user, store]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadData();
  }, [user, router, loadData]);

  const handleCreate = (values: typeof form.values) => {
    if (!user) return;

    store.createTheme({
      userId: user.id,
      name: values.name,
      description: values.description || undefined,
      color: values.color,
    });

    notifications.show({
      title: 'Success',
      message: 'Theme created successfully',
      color: 'green',
    });

    form.reset();
    close();
    loadData();
  };

  const handleDelete = (themeId: string) => {
    if (confirm('Are you sure you want to delete this theme?')) {
      store.deleteTheme(themeId);
      notifications.show({
        title: 'Deleted',
        message: 'Theme has been deleted',
        color: 'green',
      });
      loadData();
    }
  };

  if (!user) {
    return null;
  }

  const totalMinutesAllThemes = themes.reduce((sum, t) => sum + t.totalMinutes, 0);

  return (
    <Container size="md" py="md">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2}>学習テーマ一覧</Title>
            <Text c="dimmed" size="sm">
              学習内容を整理しよう
            </Text>
          </Box>
          <Button leftSection={<IconPlus size={18} />} onClick={open}>
            新規作成
          </Button>
        </Group>

        {themes.length === 0 ? (
          <Card shadow="sm" padding="xl" radius="lg" withBorder>
            <Center py="xl">
              <Stack align="center" gap="md">
                <IconMoodEmpty size={48} stroke={1.5} color="var(--mantine-color-dimmed)" />
                <Text c="dimmed" ta="center">
                  学習テーマがまだありません。
                  <br />
                  まずは学習テーマを作成しましょう！
                </Text>
                <Button leftSection={<IconPlus size={18} />} onClick={open}>
                  テーマを作成する
                </Button>
              </Stack>
            </Center>
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {themes.map((theme) => (
              <Card key={theme.id} shadow="sm" padding="lg" radius="lg" withBorder>
                <Stack gap="sm">
                  <Group justify="space-between" align="flex-start">
                    <Group gap="sm">
                      <IconFolder size={24} style={{ color: theme.color }} />
                      <Box>
                        <Text fw={600}>{theme.name}</Text>
                        {theme.description && (
                          <Text size="sm" c="dimmed" lineClamp={2}>
                            {theme.description}
                          </Text>
                        )}
                      </Box>
                    </Group>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(theme.id)}
                      aria-label="Delete theme"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>

                  <Group gap="xs">
                    <Badge variant="light">{theme.logCount} logs</Badge>
                    <Badge variant="light">{formatDuration(theme.totalMinutes)}</Badge>
                  </Group>

                  {totalMinutesAllThemes > 0 && (
                    <Box>
                      <Text size="xs" c="dimmed" mb={4}>
                        Progress
                      </Text>
                      <Progress
                        value={(theme.totalMinutes / totalMinutesAllThemes) * 100}
                        color={theme.color}
                        size="sm"
                        radius="xl"
                      />
                    </Box>
                  )}
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <Modal opened={opened} onClose={close} title="Create New Theme" centered>
        <form onSubmit={form.onSubmit(handleCreate)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="React Mastery"
              required
              {...form.getInputProps('name')}
            />
            <Textarea
              label="Description"
              placeholder="Describe your learning goal..."
              minRows={2}
              {...form.getInputProps('description')}
            />
            <ColorInput
              label="Color"
              placeholder="Pick a color"
              {...form.getInputProps('color')}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
}
