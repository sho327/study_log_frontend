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
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppStore, useCurrentUser } from '@/stores';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export function RegisterPageContent() {
  const user = useCurrentUser();
  const login = useAppStore((state) => state.login);
  const router = useRouter();
  const store = useAppStore();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? '名前は2文字以上で入力してください' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'メールアドレスが無効です'),
      password: (value) =>
        value.length < 6 ? 'パスワードは6文字以上で入力してください' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'パスワードが一致しません' : null,
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/timeline');
    }
  }, [user, router]);

  const handleSubmit = (values: typeof form.values) => {
    const users = store.getAllUsers();
    const existingUser = users.find((u) => u.email === values.email);

    if (existingUser) {
      notifications.show({
        title: 'エラー',
        message: 'このメールアドレスは既に登録されています',
        color: 'red',
      });
      return;
    }

    const newUser = store.createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    login(newUser.id);
    notifications.show({
      title: 'ようこそ!',
      message: 'アカウントが作成されました',
      color: 'green',
    });
    router.push('/timeline');
  };

  return (
    <Center style={{ flex: 1 }}>
      <Container size={420} w="100%">
        <Title ta="center" fw={700}>
          アカウント作成
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          既にアカウントをお持ちの方は{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => router.push('/login')}
          >
            ログイン
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="名前"
                placeholder="お名前"
                required
                {...form.getInputProps('name')}
              />
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
              <PasswordInput
                label="パスワード(確認)"
                placeholder="パスワードを再入力"
                required
                {...form.getInputProps('confirmPassword')}
              />
              <Button type="submit" fullWidth mt="md">
                アカウント作成
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}
