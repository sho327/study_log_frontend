'use client';

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Avatar,
  FileButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import { useAppStore, useCurrentUser } from '@/stores';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

export function SettingsContent() {
  const user = useCurrentUser();
  const router = useRouter();
  const store = useAppStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      bio: '',
      avatar: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    form.setValues({
      name: user.name,
      bio: user.bio || '',
      avatar: user.avatar || '',
    });
    setAvatarPreview(user.avatar || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  const handleSubmit = (values: typeof form.values) => {
    if (!user) return;

    store.updateUser(user.id, {
      name: values.name,
      bio: values.bio,
      avatar: avatarPreview || '',
    });


    notifications.show({
      title: 'Success',
      message: 'Profile updated successfully',
      color: 'green',
    });
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container size="sm" py="md">
      <Stack gap="lg">
        <Box>
          <Title order={2}>アプリ設定</Title>
          <Text c="dimmed" size="sm">
            プロフィールや設定を管理します
          </Text>
        </Box>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Group justify="center">
                <Stack align="center" gap="sm">
                  <Avatar
                    src={avatarPreview}
                    alt={user.name}
                    size={100}
                    radius="xl"
                    color="brand"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <FileButton
                    onChange={handleAvatarChange}
                    accept="image/png,image/jpeg,image/gif"
                  >
                    {(props) => (
                      <Button
                        {...props}
                        variant="light"
                        size="xs"
                        leftSection={<IconUpload size={14} />}
                      >
                        画像を選択
                      </Button>
                    )}
                  </FileButton>
                </Stack>
              </Group>

              <TextInput
                label="Name"
                placeholder="Your name"
                required
                {...form.getInputProps('name')}
              />

              <TextInput
                label="Email"
                value={user.email}
                disabled
                description="Email cannot be changed"
              />

              <Textarea
                label="Bio"
                placeholder="Tell us about yourself..."
                minRows={3}
                {...form.getInputProps('bio')}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit">保存</Button>
              </Group>
            </Stack>
          </form>
        </Card>

        <Card shadow="sm" padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>アカウント</Title>
            <Text size="sm" c="dimmed">
              登録日: {new Date(user.createdAt).toLocaleDateString('ja-JP')}
            </Text>
            <Group gap="lg">
              <Text size="sm">
                <Text component="span" fw={700}>
                  {user.following.length}
                </Text>{' '}
                フォロー中
              </Text>
              <Text size="sm">
                <Text component="span" fw={700}>
                  {user.followers.length}
                </Text>{' '}
                フォロワー
              </Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
