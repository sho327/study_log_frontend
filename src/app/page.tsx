'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  Card,
  SimpleGrid,
  ThemeIcon,
  useMantineColorScheme,
  ActionIcon,
  Badge,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconChartBar,
  IconLink,
  IconUsers,
  IconApi,
  IconHash,
  IconFolder,
  IconBell,
  IconRocket,
  IconBook,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/stores';
import { useEffect } from 'react';

const features = [
  {
    icon: IconChartBar,
    title: '学習の可視化',
    description: '日々の学習時間を美しいグラフとストリークカウンターで追跡できます。',
  },
  {
    icon: IconLink,
    title: '成果物URLの記録',
    description: 'GitHubリポジトリやZenn記事などの成果物をログに紐づけられます。',
  },
  {
    icon: IconUsers,
    title: 'ソーシャルタイムライン',
    description: '他の学習者をフォローして、いいねやコメントで交流できます。',
  },
  {
    icon: IconApi,
    title: 'APIアクセス',
    description: 'CLIやGitHub Actionsから学習ログを投稿できるREST APIを提供。',
  },
  {
    icon: IconHash,
    title: 'タグシステム',
    description: '#React、#英語、#資格などのタグでログを整理できます。',
  },
  {
    icon: IconFolder,
    title: '学習テーマ',
    description: '関連するログをテーマごとにまとめて、目標別の進捗を追跡。',
  },
];

export default function LandingPage() {
  const user = useCurrentUser();
  const router = useRouter();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (user) {
      router.push('/timeline');
    }
  }, [user, router]);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box mih="100vh">
      <Box
        component="header"
        p="md"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
              <IconBook size={24} color="var(--mantine-color-blue-filled)" />
              <Text size="xl" fw={700}>
                Knolty
              </Text>
            </Group>
            <Group gap="sm">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={toggleColorScheme}
                aria-label="テーマ切替"
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
              <Button variant="subtle" onClick={() => router.push('/login')}>
                ログイン
              </Button>
              <Button onClick={() => router.push('/register')}>無料で始める</Button>
            </Group>
          </Group>
        </Container>
      </Box>

      <Container size="lg" py={60}>
        <Stack gap={60} align="center">
          <Stack gap="lg" align="center" ta="center" maw={700}>
            <Badge size="lg" variant="light" leftSection={<IconRocket size={14} />}>
              MVP + v2 機能を実装済み
            </Badge>
            <Title order={1} size={48} fw={800} style={{ lineHeight: 1.1 }}>
              学習を記録。
              <br />
              成果物を共有。
              <br />
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              >
                一緒に成長しよう。
              </Text>
            </Title>
            <Text size="xl" c="dimmed" maw={600}>
              Knoltyは開発者と学習者のための、アウトプット重視の学習プラットフォームです。
              学習時間を記録し、成果物を紐づけ、コミュニティとつながりましょう。
            </Text>
            <Group mt="md">
              <Button size="lg" onClick={() => router.push('/register')}>
                無料で始める
              </Button>
              <Button size="lg" variant="default" onClick={() => router.push('/login')}>
                デモログイン
              </Button>
            </Group>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" w="100%">
            {features.map((feature) => (
              <Card key={feature.title} shadow="sm" padding="lg" radius="lg" withBorder>
                <ThemeIcon size={48} radius="md" variant="light" mb="md">
                  <feature.icon size={24} stroke={1.5} />
                </ThemeIcon>
                <Text size="lg" fw={600} mb="xs">
                  {feature.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>

          <Card shadow="md" padding="xl" radius="lg" withBorder w="100%" maw={600}>
            <Stack gap="md" align="center" ta="center">
              <ThemeIcon size={60} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                <IconBell size={30} />
              </ThemeIcon>
              <Title order={3}>最新情報をキャッチ</Title>
              <Text c="dimmed">
                誰かがいいねやコメントをしたり、フォローしたときに通知を受け取れます。
                重要なインタラクションを見逃しません。
              </Text>
            </Stack>
          </Card>

          <Stack gap="md" align="center" ta="center" py={40}>
            <Title order={2}>学習の旅を始めませんか?</Title>
            <Text c="dimmed" maw={500}>
              Knoltyで進捗を記録し、成果物を共有している
              多くの開発者や学習者に加わりましょう。
            </Text>
            <Button size="lg" onClick={() => router.push('/register')}>
              無料アカウントを作成
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box component="footer" py="xl" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
        <Container size="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              &copy; 2024 Knolty. 学習者のために、学習者が作りました。
            </Text>
            <Group gap="xs">
              <Button variant="subtle" size="sm" onClick={() => router.push('/api-docs')}>
                APIドキュメント
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
