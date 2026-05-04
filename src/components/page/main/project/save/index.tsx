'use client';

import React from 'react';
import { 
  Title, 
  Text, 
  TextInput, 
  Textarea, 
  Button, 
  Stack, 
  Card, 
  Group, 
  Box, 
  rem,
  Breadcrumbs,
  Anchor,
  Divider,
  Avatar
} from '@mantine/core';
// Lucide React アイコンのインポート
import { Rocket, ArrowLeft, Check, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function CreateProjectPage() {
  const router = useRouter();
  const params = useParams();

  // パンくずリスト
  const items = [
    { title: 'ホーム', href: `/spaces/${params.spaceId}/projects` },
    { title: 'プロジェクト一覧', href: `/spaces/${params.spaceId}/projects` },
    { title: '新規作成', href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={index} size="sm" c="dimmed" fw={500}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack gap="xl">
      {/* ページヘッダー：一覧ページと構造を統一 */}
      <Stack gap={4}>
        {/* <Breadcrumbs>{items}</Breadcrumbs> */}
        <div>
          {/* <Rocket size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} /> */}
          <Title order={2} size="h3" fw={800} style={{ letterSpacing: rem(-0.5) }}>
            新規プロジェクト作成
          </Title>
        </div>
        <Text className="hidden sm:block text-[13.5px] text-gray-500 font-bold">
          新しいプロジェクトを立ち上げ、チームの作業を開始しましょう
        </Text>
      </Stack>

      {/* メインフォーム：ワイドに広がるが、入力欄は読みやすい幅に */}
      <Card 
        withBorder 
        radius="md" 
        padding="xl" 
        shadow="sm" 
        // className='card bg-white border border-gray-100 shadow-sm transition-all group'
        className='rounded-xl'
        style={{ 
          backgroundColor: '#ffffff',
          borderColor: 'oklch(0.95 0.006 162)' // base-200
        }}
      >
        <Stack gap="xl">
          <Box style={{ maxWidth: rem(800) }}> {/* 入力欄が広すぎないよう制限 */}
            <Stack gap="lg">
              <TextInput
                label="プロジェクト名"
                placeholder="例: 次世代基幹システム開発"
                required
                size="md"
                styles={{
                  input: { border: '1px solid oklch(0.95 0.006 162)', height: rem(46), borderRadius: '.8rem' },
                  label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                }}
              />

              <TextInput
                label="プロジェクトID"
                placeholder="例: ERP-2026"
                size="md"
                styles={{
                  input: { border: '1px solid oklch(0.95 0.006 162)', height: rem(46) },
                  label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                }}
              />

              <Textarea
                label="プロジェクトの概要"
                placeholder="このプロジェクトの目的、メインゴール、背景などを記入してください"
                minRows={5}
                size="md"
                styles={{
                  input: { border: '1px solid oklch(0.95 0.006 162)' },
                  label: { fontWeight: 700, marginBottom: rem(4), fontSize: '14px' },
                }}
              />
            </Stack>
          </Box>

          <Divider style={{ borderColor: 'oklch(0.96 0.003 264.54)' }} />

          {/* 下部アクションエリア */}
          <Group justify="space-between">
            {/* ヒント情報 */}
            <Group gap="xs" style={{ flex: 1 }} visibleFrom="sm">
              <Check size={20} color="var(--mantine-color-brand-6)" strokeWidth={3} />
              <Text size="sm" c="dimmed" fw={500}>
                作成後すぐにタスクの追加とメンバー招待が可能です
              </Text>
            </Group>

            <Group gap="md">
              <Button 
                variant="subtle" 
                color="gray" 
                size="md" 
                onClick={() => router.back()}
                leftSection={<ArrowLeft size={18} strokeWidth={2.5} />}
              >
                キャンセル
              </Button>
              <Button 
                color="brand.6"
                size="md" 
                radius="md"
                shadow="md"
                leftSection={<Rocket size={18} strokeWidth={2.5} />}
                px={rem(32)}
                onClick={() => router.push(`/spaces/${params.spaceId}/projects`)}
              >
                プロジェクトを開始する
              </Button>
            </Group>
          </Group>
        </Stack>
      </Card>

      {/* スペースのステータス情報（任意） */}
      <Card 
        radius="md" 
        p="md" 
        style={{ 
          backgroundColor: 'oklch(0.96 0.003 264.54)', // base-300
          border: '1px dashed oklch(0.95 0.006 162)' 
        }}
      >
        <Group gap="sm">
          <Avatar color="brand.6" radius="sm" size="sm">
            <LayoutDashboard size={16} strokeWidth={2.5} />
          </Avatar>
          <Text size="xs" fw={600} c="dimmed">
            現在のスペース: <Text component="span" c="brand.6" fw={700}>開発チーム</Text> (残り作成可能プロジェクト: 5)
          </Text>
        </Group>
      </Card>
    </Stack>
  );
}