'use client';

import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Anchor,
  Divider,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/components/providers/mantineProvider';
import { useAppStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export function LoginPageContent() {
  const { user, login } = useAuth();
  const router = useRouter();
  const store = useAppStore();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (!value ? 'メールアドレスを入力してください' : null),
      password: (value) => (!value ? 'パスワードを入力してください' : null),
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/timeline');
    }
  }, [user, router]);

  const handleSubmit = (values: typeof form.values) => {
    const users = store.getAllUsers();
    const foundUser = users.find((u) => u.email === values.email);

    if (foundUser) {
      login(foundUser.id);
      notifications.show({
        title: 'おかえりなさい!',
        message: `${foundUser.name}としてログインしました`,
        color: 'green',
      });
      router.push('/timeline');
    } else {
      notifications.show({
        title: 'エラー',
        message: 'ユーザーが見つかりません。demo@studylog.comをお試しください',
        color: 'red',
      });
    }
  };

  const handleDemoLogin = () => {
    const users = store.getAllUsers();
    const demoUser = users.find((u) => u.email === 'demo@studylog.com');
    if (demoUser) {
      login(demoUser.id);
      notifications.show({
        title: 'ようこそ!',
        message: 'デモユーザーとしてログインしました',
        color: 'green',
      });
      router.push('/timeline');
    }
  };

  return (
    <Center style={{ flex: 1 }}>
      <Container size={420} w="100%">
        <Title ta="center" fw={700}>
          おかえりなさい!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          アカウントをお持ちでない方は{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => router.push('/register')}
          >
            新規登録
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="メールアドレス"
                placeholder="you@example.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="パスワード"
                placeholder="パスワード"
                required
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth mt="md">
                ログイン
              </Button>
            </Stack>
          </form>

          <Divider label="または" labelPosition="center" my="lg" />

          <Button
            variant="default"
            fullWidth
            onClick={handleDemoLogin}
          >
            デモアカウントでログイン
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
