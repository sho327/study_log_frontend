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
import { useAuth } from '@/components/providers';
import { AppShellWrapper } from '@/components/app-shell';
import { updateUser } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
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

    updateUser(user.id, {
      name: values.name,
      bio: values.bio,
      avatar: avatarPreview || '',
    });

    refreshUser();
    
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
    <AppShellWrapper>
      <Container size="sm" py="md">
        <Stack gap="lg">
          <Box>
            <Title order={2}>Settings</Title>
            <Text c="dimmed" size="sm">
              Manage your profile and preferences
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
                          Upload Avatar
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
                  <Button type="submit">Save Changes</Button>
                </Group>
              </Stack>
            </form>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Stack gap="md">
              <Title order={4}>Account</Title>
              <Text size="sm" c="dimmed">
                Joined: {new Date(user.createdAt).toLocaleDateString('ja-JP')}
              </Text>
              <Group gap="lg">
                <Text size="sm">
                  <Text component="span" fw={700}>
                    {user.following.length}
                  </Text>{' '}
                  Following
                </Text>
                <Text size="sm">
                  <Text component="span" fw={700}>
                    {user.followers.length}
                  </Text>{' '}
                  Followers
                </Text>
              </Group>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </AppShellWrapper>
  );
}
