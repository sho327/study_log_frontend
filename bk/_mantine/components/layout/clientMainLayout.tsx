import { AppShell, Burger, Group, Skeleton, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function ClientMainLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* ヘッダー部分 */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text fw={700} style={{ color: 'var(--mantine-color-brand-filled)' }}>
            LOGO / PROJECT NAME
          </Text>
        </Group>
      </AppShell.Header>

      {/* サイドバー（ナビゲーション）部分 */}
      <AppShell.Navbar p="md">
        Navbar
        <Skeleton height={28} mt="sm" animate={false} />
        <Skeleton height={28} mt="sm" animate={false} />
        <Skeleton height={28} mt="sm" animate={false} />
      </AppShell.Navbar>

      {/* メインコンテンツエリア */}
      <AppShell.Main>
        Main Content Area (Empty)
        {/* 開発時のレイアウト確認用スケルトン */}
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </AppShell.Main>
    </AppShell>
  );
}