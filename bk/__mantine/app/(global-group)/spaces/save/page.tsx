'use client';

import React from 'react';
import { 
  Title, Text, TextInput, Button, Card, Stack, Group, 
  Breadcrumbs, Anchor, ActionIcon, ColorInput, Textarea, rem,
  Box, Divider // Box と Divider を追加
} from '@mantine/core';
import { IconChevronLeft, IconRocket, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SpaceSavePage() {
  const router = useRouter();

  const items = [
    { title: 'ホーム', href: '/' },
    { title: 'スペース設定', href: '#' },
    { title: '新規作成', href: '/spaces/save' },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Stack gap="lg">
      {/* ナビゲーション・ヘッダー */}
      <Stack gap={4}>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Group gap="sm">
          <ActionIcon 
            variant="subtle" 
            color="gray" 
            onClick={() => router.back()}
            size="lg"
          >
            <IconChevronLeft size="1.4rem" />
          </ActionIcon>
          <Title order={2} size="h3" style={{ fontWeight: 800 }}>
            新しいスペースを作成
          </Title>
        </Group>
      </Stack>

      <Group align="flex-start" grow>
        <Stack gap="md" style={{ maxWidth: rem(600) }}>
          <Card withBorder padding="xl" radius="md" shadow="sm">
            <Stack gap="xl">
              <Box>
                <Text fw={700} size="md" mb="xs">基本情報</Text>
                <Divider mb="lg" />
                <Stack gap="md">
                  <TextInput
                    label="スペース名"
                    placeholder="例: 開発プロジェクト、営業本部など"
                    required
                    size="sm"
                    styles={{ label: { marginBottom: 4, fontWeight: 600 } }}
                  />
                  
                  <ColorInput
                    label="テーマカラー"
                    placeholder="スペースを識別する色を選択"
                    defaultValue="#18BC9C"
                    size="sm"
                    swatches={['#18BC9C', '#228be6', '#fa5252', '#be4bdb', '#fab005', '#12b886']}
                    styles={{ label: { marginBottom: 4, fontWeight: 600 } }}
                  />

                  <Textarea
                    label="説明 (任意)"
                    placeholder="スペースの用途について入力してください"
                    minRows={3}
                    size="sm"
                    styles={{ label: { marginBottom: 4, fontWeight: 600 } }}
                  />
                </Stack>
              </Box>

              <Group justify="flex-end" mt="md">
                <Button variant="subtle" color="gray" onClick={() => router.back()}>
                  キャンセル
                </Button>
                <Button 
                  color="brand.6" 
                  leftSection={<IconCheck size={18} />}
                  px="xl"
                >
                  スペースを作成する
                </Button>
              </Group>
            </Stack>
          </Card>
        </Stack>

        {/* 右側のガイド（日本のシステムでよくあるヒントエリア） */}
        <Box visibleFrom="md">
          <Card withBorder padding="lg" radius="md" bg="brand.0" style={{ borderColor: 'var(--mantine-color-brand-2)' }}>
            <Group gap="xs" mb="sm" c="brand.7">
              <IconRocket size="1.2rem" />
              <Text fw={700} size="sm">スペースとは？</Text>
            </Group>
            <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
              スペースはチームやプロジェクト単位で情報を整理するための場所です。
              メンバーを招待して、専用のダッシュボードやファイルを共有できます。
              後から設定画面で名前やメンバーを変更することも可能です。
            </Text>
          </Card>
        </Box>
      </Group>
    </Stack>
  );
}