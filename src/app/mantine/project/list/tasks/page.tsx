'use client';

import React from 'react';
import { 
  Title, 
  Text, 
  Button, 
  Table, 
  Group, 
  Stack, 
  Badge, 
  Avatar, 
  ActionIcon, 
  Menu, 
  TextInput, 
  rem, 
  Card, 
  Checkbox, 
  Box,
  Divider,
  Tooltip
} from '@mantine/core';
// Lucide React アイコンのインポート
import { 
  Plus, 
  Search, 
  Filter, 
  EllipsisVertical, 
  Pencil, 
  Trash2, 
  CalendarDays,
  ListChecks,
  ArrowRight
} from 'lucide-react';

// -----------------------------------------------------------------
// サンプルデータ：実際のプロジェクト運用を想定したデータ構造
// -----------------------------------------------------------------
const TASKS = [
  { id: '1', title: 'API仕様書の作成', assignee: '山田 太郎', priority: '高', deadline: '2026/02/05', status: '進行中' },
  { id: '2', title: 'フロントエンドのモックアップ作成', assignee: '佐藤 花子', priority: '中', deadline: '2026/02/10', status: '未着手' },
  { id: '3', title: 'データベースのマイグレーション', assignee: '鈴木 一郎', priority: '高', deadline: '2026/02/03', status: '進行中' },
  { id: '4', title: 'バグ修正：ログインエラー', assignee: '山田 太郎', priority: '緊急', deadline: '2026/02/01', status: '完了' },
  { id: '5', title: 'デザインシステムの新コンポーネント定義', assignee: '佐藤 花子', priority: '低', deadline: '2026/03/01', status: '未着手' },
];

export default function TaskListPage() {
  // 1. 各行（Row）の生成ロジック
  const rows = TASKS.map((task) => {
    const isOverdue = new Date(task.deadline) < new Date() && task.status !== '完了';
    
    return (
      <Table.Tr key={task.id}>
        <Table.Td style={{ width: rem(40) }}><Checkbox size="sm" cursor="pointer" /></Table.Td>
        <Table.Td>
          <Stack gap={0}>
            <Text size="sm" fw={700} c="gray.8" style={{ lineHeight: 1.4 }}>{task.title}</Text>
            <Text size="xs" c="dimmed" fw={500}>ID: {task.id}</Text>
          </Stack>
        </Table.Td>
        <Table.Td style={{ width: rem(100) }}>
          <Badge 
            variant="light" 
            color={task.priority === '緊急' ? 'red' : task.priority === '高' ? 'orange' : task.priority === '低' ? 'cyan' : 'gray'}
            size="md" radius="sm" fw={700}
          >
            {task.priority}
          </Badge>
        </Table.Td>
        <Table.Td style={{ width: rem(150) }}>
          <Group gap="xs" wrap="nowrap">
            <Avatar size={24} radius="xl" color="brand.6" fw={700}>{task.assignee.substring(0, 1)}</Avatar>
            <Text size="sm" fw={600} c="gray.7">{task.assignee}</Text>
          </Group>
        </Table.Td>
        <Table.Td style={{ width: rem(130) }}>
          <Group gap={6} wrap="nowrap">
            <CalendarDays size={16} color={isOverdue ? 'var(--mantine-color-red-6)' : 'gray'} strokeWidth={2.5} />
            <Text size="sm" fw={700} c={isOverdue ? 'red.7' : 'gray.7'}>{task.deadline}</Text>
          </Group>
        </Table.Td>
        <Table.Td style={{ width: rem(100) }}>
          <Badge 
            size="md" variant="filled" 
            color={task.status === '完了' ? 'teal.6' : task.status === '進行中' ? 'brand.6' : 'gray.5'}
            radius="xl"
          >
            {task.status}
          </Badge>
        </Table.Td>
        <Table.Td style={{ width: rem(40) }}>
          <Menu id={`task-menu-${task.id}`} shadow="md" position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <EllipsisVertical size={18} strokeWidth={2.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>タスク操作</Menu.Label>
              <Menu.Item leftSection={<Pencil size={14} strokeWidth={2.5} />}>編集</Menu.Item>
              <Divider />
              <Menu.Item color="red" leftSection={<Trash2 size={14} strokeWidth={2.5} />}>削除</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box style={{ width: '100%' }}>
      <Stack gap="xl">
        {/* --- ページヘッダーエリア --- */}
        <Group justify="space-between" align="flex-end">
          <Stack gap={4}>
            <Group gap="xs">
              <ListChecks size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} />
              <Title order={2} size="h3" fw={800} style={{ letterSpacing: rem(-0.5) }}>タスク一覧</Title>
            </Group>
            <Text size="sm" c="dimmed" fw={500}>プロジェクトの現在の進捗と期限を確認・管理します</Text>
          </Stack>
          <Button 
            color="brand.6" size="sm" radius="md" shadow="md"
            leftSection={<Plus size={18} strokeWidth={3} />} 
          >
            新規タスク作成
          </Button>
        </Group>

        {/* --- メインコンテンツ：テーブルカード --- */}
        <Card 
          withBorder radius="md" padding={0} shadow="sm" 
          style={{ backgroundColor: '#ffffff', borderColor: 'oklch(0.95 0.006 162)', overflow: 'hidden' }}
        >
          {/* ツールバーエリア */}
          <Box p="md" style={{ backgroundColor: 'oklch(0.98 0.001 264)' }}>
            <Group justify="space-between">
              <TextInput 
                placeholder="タスク名や担当者で検索..." 
                leftSection={<Search size={16} strokeWidth={2} />}
                size="sm" style={{ flex: 1, maxWidth: rem(400) }} radius="md"
                styles={{ input: { borderColor: 'oklch(0.95 0.006 162)' } }}
              />
              <Group gap="xs">
                <Button variant="light" color="gray" size="sm" leftSection={<Filter size={14} strokeWidth={2.5} />} radius="md">フィルタ</Button>
                <ActionIcon variant="outline" color="gray" size="lg" radius="md" style={{ borderColor: 'oklch(0.95 0.006 162)' }}>
                  <EllipsisVertical size={18} strokeWidth={2.5} />
                </ActionIcon>
              </Group>
            </Group>
          </Box>

          {/* テーブル */}
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md" horizontalSpacing="md" highlightOnHover withColumnBorders={false}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: 'oklch(0.96 0.003 264.54)' }}>
                  <Table.Th style={{ width: 40 }}></Table.Th>
                  <Table.Th><Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>タスク内容</Text></Table.Th>
                  <Table.Th><Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>優先度</Text></Table.Th>
                  <Table.Th><Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>担当者</Text></Table.Th>
                  <Table.Th><Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>期限</Text></Table.Th>
                  <Table.Th><Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>ステータス</Text></Table.Th>
                  <Table.Th style={{ width: 40 }}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          
          {/* フッターエリア */}
          <Box p="sm" style={{ borderTop: '1px solid oklch(0.95 0.006 162)', backgroundColor: 'oklch(0.98 0.001 264)' }}>
            <Group justify="space-between" px="md">
              <Text size="xs" c="dimmed" fw={600}>全 {TASKS.length} 件中 {TASKS.length} 件を表示</Text>
              <Group gap={4}>
                <Button variant="subtle" size="compact-xs" color="gray" disabled>前へ</Button>
                <Button variant="subtle" size="compact-xs" color="gray" disabled>次へ</Button>
              </Group>
            </Group>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}