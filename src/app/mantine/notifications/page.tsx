'use client';

import React, { useState, useEffect } from 'react';
import { 
  Title, 
  Text, 
  Stack, 
  Card, 
  Group, 
  Box, 
  rem, 
  Badge, 
  ActionIcon, 
  Tooltip, 
  Divider, 
  UnstyledButton,
  Tabs,
  Avatar,
  Button,
  Menu
} from '@mantine/core';
// Lucide React アイコンのインポート
import { 
  Bell, 
  Check, 
  EllipsisVertical, 
  Trash2, 
  UserPlus, 
  ListChecks, 
  Info 
} from 'lucide-react';

// -----------------------------------------------------------------
// サンプルデータ：実際の運用を想定した詳細なデータ構造
// -----------------------------------------------------------------
const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'task',
    title: 'タスクの期限間近',
    description: '「ログイン画面のUI実装」の期限が明日までです。至急確認をお願いします。',
    time: '2時間前',
    isUnread: true,
    // アイコンを Lucide に差し替え
    icon: <ListChecks size={18} strokeWidth={2.5} />,
    color: 'blue'
  },
  {
    id: '2',
    type: 'invite',
    title: 'スペースへの招待',
    description: '田中 太郎さんがあなたを「マーケティング部」スペースに招待しました。内容を確認し、承認または辞退を選択してください。',
    time: '5時間前',
    isUnread: true,
    icon: <UserPlus size={18} strokeWidth={2.5} />,
    color: 'green'
  },
  {
    id: '3',
    type: 'system',
    title: 'システムメンテナンスのお知らせ',
    description: '今週の日曜日 02:00 - 04:00 にかけて、データベースの最適化を目的としたシステムメンテナンスを実施します。',
    time: '昨日',
    isUnread: false,
    icon: <Info size={18} strokeWidth={2.5} />,
    color: 'gray'
  },
  {
    id: '4',
    type: 'task',
    title: '新しいコメント',
    description: '「API設計書」のタスクに新しいコメントが投稿されました。',
    time: '2日前',
    isUnread: false,
    icon: <ListChecks size={18} strokeWidth={2.5} />,
    color: 'blue'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 全て既読にする処理
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <Box style={{ width: '100%', margin: '0 auto' }}>
      <Stack gap="xl">
        {/* --- ヘッダーエリア --- */}
        <Group justify="space-between" align="flex-end">
          <Stack gap={4}>
            <Group gap="xs">
              <Bell size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} />
              <Title order={2} size="h3" fw={800} style={{ letterSpacing: rem(-0.5) }}>
                お知らせ
              </Title>
            </Group>
            <Text size="sm" c="dimmed" fw={500}>
              あなたに関連する最新の通知を確認できます
            </Text>
          </Stack>

          <Button 
            variant="subtle" 
            size="sm" 
            color="brand.6" 
            leftSection={<Check size={16} strokeWidth={3} />}
            onClick={markAllAsRead}
          >
            すべて既読にする
          </Button>
        </Group>

        {/* --- フィルタータブエリア --- */}
        <Tabs defaultValue="all" variant="pills" color="brand.6" radius="md">
          <Tabs.List mb="lg">
            <Tabs.Tab value="all" py="xs">すべて</Tabs.Tab>
            <Tabs.Tab value="unread" py="xs">
              未読
              <Badge size="xs" ml={8} variant="filled" color="red" radius="sm">
                {notifications.filter(n => n.isUnread).length}
              </Badge>
            </Tabs.Tab>
            <Tabs.Tab value="tasks" py="xs">タスク関連</Tabs.Tab>
            <Tabs.Tab value="invites" py="xs">招待</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            <Stack gap="sm">
              {notifications.map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="unread">
            <Stack gap="sm">
              {notifications.filter(n => n.isUnread).map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Box>
  );
}

// -----------------------------------------------------------------
// NotificationItem：コンポーネント
// -----------------------------------------------------------------
function NotificationItem({ item }: { item: any }) {
  return (
    <Box 
      style={{ 
        width: '100%',
        cursor: 'pointer'
      }}
      onClick={() => console.log(`通知 ${item.id} をクリックしました`)}
    >
      <Card 
        withBorder 
        padding="md" 
        radius="md"
        shadow={item.isUnread ? "sm" : "xs"}
        style={{ 
          backgroundColor: '#ffffff',
          borderColor: item.isUnread ? 'var(--mantine-color-brand-6)' : 'oklch(0.95 0.006 162)',
          borderWidth: item.isUnread ? rem(1.5) : rem(1),
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative'
        }}
        styles={{
          root: {
            '&:hover': {
              backgroundColor: 'oklch(0.96 0.003 264.54) !important',
              transform: 'translateY(-1px)',
              boxShadow: 'var(--mantine-shadow-sm)'
            }
          }
        }}
      >
        <Group gap="md" wrap="nowrap" align="center">
          
          {/* 赤丸ドット */}
          <Box style={{ width: rem(12), display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            {item.isUnread && (
              <Box 
                style={{ 
                  width: rem(8), 
                  height: rem(8), 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--mantine-color-red-6)',
                  boxShadow: '0 0 0 2px #fff, 0 0 8px rgba(255, 0, 0, 0.3)',
                  zIndex: 10
                }} 
              />
            )}
          </Box>

          {/* アイコン部分 */}
          <Avatar 
            color={item.color} 
            radius="md" 
            size="md" 
            variant={item.isUnread ? "filled" : "light"}
            style={{ 
              border: item.isUnread ? 'none' : '1px solid var(--mantine-color-gray-2)',
              flexShrink: 0 
            }}
          >
            {item.icon}
          </Avatar>

          {/* コンテンツメイン */}
          <Stack gap={2} style={{ flex: 1 }}>
            <Group justify="space-between" wrap="nowrap" align="center">
              <Group gap="xs">
                <Text size="sm" fw={item.isUnread ? 800 : 600} c={item.isUnread ? 'black' : 'gray.8'}>
                  {item.title}
                </Text>
                {item.isUnread && (
                  <Badge size="xs" variant="filled" color="brand.6" radius="sm">
                    NEW
                  </Badge>
                )}
              </Group>
              <Text size="xs" c="dimmed" fw={500}>
                {item.time}
              </Text>
            </Group>
            
            <Text size="sm" c={item.isUnread ? 'gray.9' : 'dimmed'} lineClamp={1} style={{ lineHeight: 1.5 }}>
              {item.description}
            </Text>
          </Stack>

          {/* 操作メニュー */}
          <Menu position="bottom-end" shadow="md" withinPortal transitionProps={{ transition: 'pop-top-right' }}>
            <Menu.Target>
              <ActionIcon 
                variant="subtle" 
                color="gray" 
                size="lg"
                onClick={(e) => {
                  e.stopPropagation(); 
                }}
              >
                <EllipsisVertical size={18} strokeWidth={2.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>アクション</Menu.Label>
              <Menu.Item leftSection={<Check size={14} strokeWidth={2.5} />}>既読にする</Menu.Item>
              <Divider />
              <Menu.Item color="red" leftSection={<Trash2 size={14} strokeWidth={2.5} />}>通知を削除</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card>
    </Box>
  );
}