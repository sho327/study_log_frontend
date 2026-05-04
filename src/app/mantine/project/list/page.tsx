'use client';

import React from 'react';
import { 
  Title, Text, Button, Card, SimpleGrid, Group, Stack, 
  Breadcrumbs, Anchor, Badge, Progress, ActionIcon, Menu, rem, Box, Divider, Tooltip, Avatar
} from '@mantine/core';
// Lucide React アイコンのインポート（エラー修正済み）
import { 
  Plus, 
  EllipsisVertical, 
  Settings, 
  Trash2, 
  Calendar, 
  ListChecks, 
  LayoutDashboard, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// ダミーデータ
const PROJECTS = [
  { 
    id: '1', 
    category: 'リサーチ', 
    title: '卒業研究中間発表の準備', 
    description: '卒業研究の中間発表に向けて、スライド作成と資料の整理を行います。',
    tags: ['研究', 'プレゼン', 'デザイン'],
    tasks: 3,
    members: [{ name: 'User1', color: 'pink' }, { name: 'User2', color: 'orange' }],
    status: 'リサーチ', 
    progress: 65, 
    deadline: '2026/03/15'
  },
  { 
    id: '2', 
    category: 'イベント', 
    title: 'ゼミ合宿の計画', 
    description: '来月のゼミ合宿の企画・運営を担当します。予算管理とスケジュール調整がメインです。',
    tags: ['イベント', '企画', '運営'],
    tasks: 1,
    members: [{ name: 'User3', color: 'red' }, { name: 'User4', color: 'blue' }],
    status: 'イベント', 
    progress: 10, 
    deadline: '2026/04/01'
  },
  { 
    id: '3', 
    category: 'WEB制作', 
    title: '2025年度 工学部学祭 公式サイト制作', 
    description: '今年の学祭サイトをReact+Next.jsで作り直します。Figmaでのデザインから実装まで。',
    tags: ['React', 'Figma', 'TypeScript'],
    tasks: 0,
    members: [{ name: 'User5', color: 'cyan' }, { name: 'User6', color: 'indigo' }],
    status: 'WEB制作', 
    progress: 40, 
    deadline: '2026/05/20'
  },
];

export default function ProjectListPage() {
  const params = useParams();
  const router = useRouter();

  const items = [
    { title: 'ホーム', href: `/spaces/${params.spaceId}/projects` },
    { title: 'プロジェクト一覧', href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={index} size="sm" c="dimmed" fw={500}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack gap="lg">
      {/* ページヘッダー */}
      <Group justify="space-between" align="flex-end">
        <Stack gap={4}>
          <Group gap="xs">
            <LayoutDashboard size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} />
            <Title order={2} size="h3" c="dark" fw={800} style={{ letterSpacing: rem(-0.5) }}>
              プロジェクト一覧
            </Title>
          </Group>
          <Text size="sm" c="dimmed" fw={500}>
            進行中のプロジェクトとタスクの進捗を管理します
          </Text>
        </Stack>

        <Button 
          color="brand.6"
          size="sm"
          leftSection={<Plus size={18} strokeWidth={3} />}
          radius="md"
          onClick={() => router.push(`/spaces/${params.spaceId}/projects/save`)}
        >
          プロジェクトを新規作成
        </Button>
      </Group>

      {/* プロジェクトカードのグリッド */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {PROJECTS.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            spaceId={params.spaceId as string} 
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

// -----------------------------------------------------------------
// ProjectCard：個別のプロジェクトカードコンポーネント
// -----------------------------------------------------------------
function ProjectCard({ project, spaceId }: { project: any, spaceId: string }) {
  const router = useRouter();

  return (
    <Card 
      withBorder 
      padding="1.5rem" 
      radius="lg" 
      shadow="xs"
      style={{ 
        cursor: 'pointer',
        borderColor: 'oklch(0.963 0.007 256.7)', // gray-100
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative'
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--mantine-shadow-md)',
            borderColor: 'var(--mantine-color-brand-4)',
          }
        }
      }}
      onClick={() => router.push(`/spaces/${spaceId}/projects/${project.id}/tasks`)}
    >
      {/* ステータス & 操作メニュー */}
      <Group justify="space-between" mb="xs">
        <Badge 
          color={project.status === '進行中' ? 'brand.6' : 'gray'} 
          variant="light"
          size="md"
          radius="sm"
        >
          {project.status}
        </Badge>
        
        <Menu position="bottom-end" shadow="md" withinPortal>
          <Menu.Target>
            <ActionIcon 
              variant="subtle" 
              color="gray" 
              onClick={(e) => e.stopPropagation()} 
            >
              <EllipsisVertical size={20} strokeWidth={2.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>プロジェクト設定</Menu.Label>
            <Menu.Item leftSection={<Settings size={16} strokeWidth={2.5} />}>基本情報の編集</Menu.Item>
            <Divider />
            <Menu.Item color="red" leftSection={<Trash2 size={16} strokeWidth={2.5} />}>プロジェクトを削除</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {/* プロジェクトタイトル */}
      <Stack gap={rem(4)} mb="sm">
        <Text fw={800} size="lg" lineClamp={1} c="black" style={{ letterSpacing: rem(-0.2) }}>
          {project.title}
        </Text>
        <Text size="xs" c="dimmed" fw={500}>最終更新: 3時間前</Text>
      </Stack>

      {/* タグ */}
      <Group gap={6} mb="sm">
        {project.tags.map((tag: string) => (
          <Text key={tag} size="xs" c="dimmed" fw={600} bg="gray.1" px={6} py={2} style={{ borderRadius: rem(4) }}>
            #{tag}
          </Text>
        ))}
      </Group>
      
      {/* 進捗セクション */}
      <Box mb="md">
        <Group justify="space-between" mb={6}>
          <Text size="xs" fw={700} c="dimmed" tt="uppercase">進捗率</Text>
          <Text size="sm" fw={800} c="brand.6">{project.progress}%</Text>
        </Group>
        <Progress 
          value={project.progress} 
          color="brand.6" 
          size="md" 
          radius="xl" 
        />
      </Box>

      <Divider 
        mb="md" 
        style={{ 
          borderColor: 'oklch(0.929 0.013 255.5)', // gray-200
        }} 
      />

      <Group justify="space-between" align="center">
        <Avatar.Group spacing="xs">
          {project.members.map((m: any, i: number) => (
            <Avatar key={i} size="sm" radius="xl" color={m.color} src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + (i === 0 ? project.id : project.id + String(i))} />
          ))}
        </Avatar.Group>
          
        <Group gap={4} c="dimmed">
          <ListChecks size={18} color="var(--mantine-color-dimmed)" strokeWidth={2.5} />
          <Text size="xs" fw={700} me={8} c="dimmed">{project.tasks} タスク</Text>
        </Group>
      </Group>
    </Card>
  );
}