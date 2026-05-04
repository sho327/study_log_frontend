'use client';

import React from 'react';
import { 
  Title, 
  Text, 
  Stack, 
  Card, 
  Group, 
  Box, 
  rem, 
  Badge, 
  Avatar, 
  Button, 
  Tabs,
  ActionIcon,
  Tooltip,
  Divider
} from '@mantine/core';
// Lucide React アイコンのインポート
import { 
  Users, 
  Check, 
  X, 
  Clock, 
  SendHorizontal,
  UserPlus
} from 'lucide-react';

// サンプルデータ：届いている招待
const RECEIVED_INVITES = [
  {
    id: 'inv-1',
    spaceName: 'マーケティング戦略室',
    inviter: '佐藤 美咲',
    role: 'メンバー',
    date: '2024/01/30',
    avatar: ''
  },
  {
    id: 'inv-2',
    spaceName: '新規事業開発プロジェクト',
    inviter: '鈴木 健一',
    role: '管理者',
    date: '2024/01/28',
    avatar: ''
  }
];

export default function InvitationsPage() {
  return (
    <Box style={{ margin: '0 auto' }}>
      <Stack gap="lg">
        {/* ヘッダー */}
        <Stack gap={4}>
          <Group gap="xs">
            <Users size={28} color="var(--mantine-color-brand-6)" strokeWidth={2.5} />
            <Title order={2} size="h2" fw={800} style={{ letterSpacing: rem(-0.5) }}>
              招待管理
            </Title>
          </Group>
          <Text size="sm" c="dimmed" fw={500}>
            スペースへの招待の承諾、または送信済みの招待状況を確認できます
          </Text>
        </Stack>

        <Tabs defaultValue="received" variant="pills" color="brand.6" radius="md">
          <Tabs.List mb="md">
            <Tabs.Tab value="received" leftSection={<UserPlus size={16} strokeWidth={2.5} />}>
              届いた招待
              <Badge size="xs" ml={6} variant="filled" color="error">2</Badge>
            </Tabs.Tab>
            <Tabs.Tab value="sent" leftSection={<SendHorizontal size={16} strokeWidth={2.5} />}>
              送信済み
            </Tabs.Tab>
          </Tabs.List>

          {/* 届いた招待パネル */}
          <Tabs.Panel value="received">
            <Stack gap="sm">
              {RECEIVED_INVITES.length > 0 ? (
                RECEIVED_INVITES.map((invite) => (
                  <InviteCard key={invite.id} invite={invite} type="received" />
                ))
              ) : (
                <EmptyState message="現在届いている招待はありません" />
              )}
            </Stack>
          </Tabs.Panel>

          {/* 送信済みパネル（モック） */}
          <Tabs.Panel value="sent">
            <Card withBorder padding="xl" radius="md" style={{ borderStyle: 'dashed', backgroundColor: 'transparent' }}>
              <Stack align="center" gap="xs">
                <Clock size={32} color="gray" strokeWidth={2} />
                <Text c="dimmed" size="sm" fw={500}>送信済みの保留中招待はありません</Text>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Box>
  );
}

// -----------------------------------------------------------------
// InviteCard: 招待カードコンポーネント
// -----------------------------------------------------------------
function InviteCard({ invite, type }: { invite: typeof RECEIVED_INVITES[0], type: 'received' | 'sent' }) {
  return (
    <Card 
      withBorder 
      padding="lg" 
      radius="md" 
      shadow="sm"
      style={{ 
        backgroundColor: '#ffffff',
        borderColor: 'oklch(0.95 0.006 162)' // base-200
      }}
    >
      <Group justify="space-between" align="center">
        <Group gap="md">
          <Avatar size="md" radius="xl" color="brand.6">
            {invite.inviter.substring(0, 1)}
          </Avatar>
          <Stack gap={2}>
            <Group gap="xs">
              <Text fw={800} size="sm">{invite.spaceName}</Text>
              <Badge variant="outline" color="brand.6" size="sm">{invite.role}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              招待者: <Text component="span" fw={600} c="black">{invite.inviter}</Text> • {invite.date}
            </Text>
          </Stack>
        </Group>

        <Group gap="sm">
          <Button 
            variant="light" 
            color="gray" 
            radius="md"
            size="sm"
            leftSection={<X size={18} strokeWidth={2.5} />}
          >
            辞退
          </Button>
          <Button 
            color="brand.6" 
            radius="md"
            size="sm"
            leftSection={<Check size={18} strokeWidth={3} />}
          >
            承認して参加
          </Button>
        </Group>
      </Group>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card p="xl" radius="md" bg="oklch(0.96 0.003 264.54)" style={{ border: '1px dashed oklch(0.95 0.006 162)' }}>
      <Text c="dimmed" ta="center" size="sm">{message}</Text>
    </Card>
  );
}