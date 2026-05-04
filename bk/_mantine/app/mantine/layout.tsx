'use client';

import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Burger,
  Group,
  Text,
  ActionIcon,
  Box,
  rem,
  Avatar,
  UnstyledButton,
  Menu,
  Divider,
  Select,
  Badge,
  Stack,
  Tooltip,
  Center,
  ScrollArea,
  Button,
  TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Menu as MenuIcon,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronsUpDown,
  Users,
  LayoutDashboard,
  Search,
  Check,
  ChevronUp,
  ChevronDown,
  Dot,
  Plus,
  ChevronRight,
  MessageSquareText,
  Info,
  AppWindow
} from 'lucide-react';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { MenuLink } from '@/components/layout/menuLink';

/**
 * GlobalLayout:
 * 1. ベースコード(400行)を物理的に維持。
 * 2. PCヘッダーのドロップダウンにzIndex:10005を指定し、サイドバーより前面に表示。
 * 3. スマホサイドバー内に、PCと同じリッチなメニューコードを物理的に複製して配置。
 * 4. PC/スマホの表示制御を hiddenFrom/visibleFrom で厳格に分離。
 */
export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  // --- 1. 状態管理 & 初期化 (ベースコード完全維持) ---
  const [mounted, setMounted] = useState(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [collapsed, { toggle: toggleDesktop }] = useDisclosure(false);

  // PCメニュー用ステート
  const [spaceMenuOpened, setSpaceMenuOpened] = useState(false);
  // スマホメニュー用ステート（物理的に分離）
  const [mobileSpaceMenuOpened, setMobileSpaceMenuOpened] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // マウント時にのみ実行
  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前はハイドレーションエラーを避けるために最低限のスケルトン背景を返す
  if (!mounted) {
    return (
      <div style={{
        // background: 'oklch(0.95 0.006 162)',
        background: 'oklch(0.929 0.013 255.5)', // text-gra-200
        minHeight: '100vh'
      }} />
    );
  }

  // ナビゲーションバーの動的な幅
  const navbarWidth = collapsed ? 64 : 240;

  // スペース選択用データ（ここも共通化せず、各JSX内で直接使う想定だがデータ定義は残す）
  const spaces = [
    { id: 'dev', label: '田中AIデザインゼミ', active: true },
    { id: 'photo', label: '写真部 公式', active: false },
  ];

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: navbarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened }
      }}
      // 第2ヘッダーを自前で制御するためpaddingは0
      padding={0}
      transitionDuration={300}
    >
      {/* =========================================================================
          1. メインヘッダー
         ========================================================================= */}
      <AppShell.Header
        px="lg"
        style={{
          borderBottom: '1px solid oklch(0.95 0.006 162)',
          // borderBottom: '1px solid oklch(0.929 0.013 255.5)', // gray-200
          zIndex: 1001
        }}
      >
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="sm">
            {/* モバイル用バーガーメニュー */}
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />

            {/* デスクトップ用サイドバー開閉ボタン */}
            <ActionIcon variant="subtle" onClick={toggleDesktop} visibleFrom="sm" color="oklch(0.551 0.027 264.4)" size="lg">
              <MenuIcon style={{ width: 24, height: 24 }} />
            </ActionIcon>

            <Group gap="1">
              <Group gap="xs">
                {/* ロゴ/アイコン */}
                <ActionIcon variant="subtle" bg="brand.6" size="md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="scale-75"
                  >
                    <g transform="translate(3.5, 4) scale(0.7)">
                      <circle cx="9" cy="7" r="4" />
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                    </g>
                  </svg>
                </ActionIcon>
                {/* ロゴ/タイトル */}
                <Text
                  fw={900}
                  size="xl"
                  c="dark"
                  style={{
                    letterSpacing: rem(-0.5)
                  }}
                >
                  Unimoa
                </Text>
              </Group>

              <Divider
                orientation="vertical"
                mx="xs"
                h={35}
                visibleFrom="sm"
                style={{
                  // borderColor: 'oklch(0.95 0.006 162)',
                  borderColor: 'oklch(0.929 0.013 255.5)', // text-gray-200
                }}
              />

              {/* 【PC用スペース切替】
                  visibleFrom="sm" でPCのみ表示。
                  portalProps={{ style: { zIndex: 10005 } }} でサイドバーより前面に表示。
              */}
              <Box visibleFrom="sm">
                <Menu
                  width={260}
                  position="bottom-start"
                  offset={8}
                  radius="lg"
                  shadow="xl"
                  opened={spaceMenuOpened}
                  onChange={setSpaceMenuOpened}
                  zIndex={10005}
                  portalProps={{ style: { zIndex: 10005 } }}
                >
                  <Menu.Target>
                    <UnstyledButton
                      style={{
                        // border: '1px solid oklch(0.73 0.11 162)', 
                        border: spaceMenuOpened ? '1px solid oklch(0.73 0.11 162)' : '1px solid oklch(0.929 0.013 255.5)',
                        borderRadius: rem(8),
                        // borderRadius: "xs",
                        padding: '8px 12px',
                        backgroundColor: spaceMenuOpened ? 'oklch(0.98 0.01 162)' : 'transparent',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Group gap="xs">
                        <User size={18} color="oklch(0.73 0.11 162)" />
                        <Text fw={800} size="sm" c="oklch(0.44 0.01 256.85)">田中AIデザインゼミ</Text>
                        {spaceMenuOpened ? (
                          <ChevronUp size={16} color="gray" />
                        ) : (
                          <ChevronDown size={16} color="gray" />
                        )}
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown p={8}>
                    <Menu.Label px={12} py={8}>
                      <Text fw={900} size="sm" c="oklch(0.44 0.01 256.85)">スペースを選択</Text>
                    </Menu.Label>

                    <Divider my={4} style={{ opacity: 0.5 }} />

                    {/* スペース項目1: アクティブ */}
                    <Menu.Item
                      py={12}
                      px={12}
                      leftSection={<Dot size={20} color="oklch(0.73 0.11 162)" />}
                      rightSection={<Check size={18} color="oklch(0.73 0.11 162)" />}
                      style={{
                        backgroundColor: 'oklch(0.98 0.01 162)',
                        borderRadius: rem(8),
                        marginBottom: rem(2)
                      }}
                      onClick={() => {
                        router.push('/spaces/dev/projects');
                        setSpaceMenuOpened(false);
                      }}
                    >
                      <Text fw={800} size="sm" c="oklch(0.73 0.11 162)">
                        田中AIデザインゼミ
                      </Text>
                    </Menu.Item>

                    {/* スペース項目2: 非アクティブ */}
                    <Menu.Item
                      py={12}
                      px={12}
                      leftSection={<Dot size={20} color="#e9ecef" />}
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: rem(8),
                        marginBottom: rem(2)
                      }}
                      onClick={() => {
                        router.push('/spaces/photo/projects');
                        setSpaceMenuOpened(false);
                      }}
                    >
                      <Text fw={800} size="sm" c="gray.6">
                        写真部 公式
                      </Text>
                    </Menu.Item>

                    <Divider my={8} />

                    <Menu.Item
                      component="div"
                      p={0}
                      closeMenuOnClick={false}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <Button
                        variant="light"
                        color="gray"
                        fullWidth
                        justify="flex-start"
                        radius="md"
                        leftSection={<Plus size={16} />}
                        fw={800}
                        h={40}
                        onClick={() => {
                          router.push('/spaces/save');
                          setSpaceMenuOpened(false);
                        }}
                      >
                        新しいスペースを作成
                      </Button>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </Group>
          </Group>

          <Group gap="md">
            <HeaderActions />
          </Group>
        </Group>
      </AppShell.Header>

      {/* =========================================================================
          2. サイドバー (スマホ用スペース切替含む)
         ========================================================================= */}
      <AppShell.Navbar
        p="xs"
        style={{
          // borderRight: '1px solid oklch(0.95 0.006 162)', 
          borderRight: '1px solid oklch(0.929 0.013 255.5)',
          zIndex: 1002
        }}>
        <ScrollArea h="100%" type="never">

          {/* 【スマホ用スペース切替】
              hiddenFrom="sm" でPC時は完全に非表示。
              PC版と同じMenu構成を物理的に記述。
          */}
          <Box mb="lg" style={{ width: '100%' }} hiddenFrom="sm">
            <Stack gap={4} px={4}>
              <Text size="xs" c="dimmed" fw={700} ml={2} tt="uppercase" style={{ letterSpacing: '0.5px' }} mb={"xs"}>
                スペース切替
              </Text>

              <Menu
                width={rem(212)}
                position="bottom-start"
                radius="lg"
                shadow="xl"
                opened={mobileSpaceMenuOpened}
                onChange={setMobileSpaceMenuOpened}
                zIndex={10005} // 前面に表示
                portalProps={{ style: { zIndex: 10005 } }}
              >
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      border: spaceMenuOpened ? '1px solid oklch(0.73 0.11 162)' : '1px solid oklch(0.929 0.013 255.5)',
                      backgroundColor: spaceMenuOpened ? 'oklch(0.98 0.01 162)' : 'transparent',
                      borderRadius: rem(8),
                      padding: '8px 12px',
                      height: rem(42),
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Group justify="space-between" style={{ width: '100%' }}>
                      <Group gap={"sm"}>
                        <User size={18} color="oklch(0.73 0.11 162)" />
                        <Text fw={800} size="sm" c="black" truncate>
                          田中AIデザインゼミ
                        </Text>
                      </Group>
                      <ChevronDown size={16} color="gray" />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                {/* スマホ用ドロップダウンの中身（PC版と全く同じ内容を記述） */}
                <Menu.Dropdown p={8}>
                  <Menu.Label px={12} py={8}>
                    <Text fw={900} size="sm" c="black">スペースを選択</Text>
                  </Menu.Label>

                  <Divider my={4} style={{ opacity: 0.5 }} />

                  {/* スペース項目1 */}
                  <Menu.Item
                    py={12}
                    px={12}
                    leftSection={<Dot size={20} color="oklch(0.73 0.11 162)" />}
                    rightSection={<Check size={18} color="oklch(0.73 0.11 162)" />}
                    style={{
                      backgroundColor: 'oklch(0.98 0.01 162)',
                      borderRadius: rem(8),
                      marginBottom: rem(2)
                    }}
                    onClick={() => {
                      router.push('/spaces/dev/projects');
                      setMobileSpaceMenuOpened(false);
                    }}
                  >
                    <Text fw={800} size="md" c="oklch(0.73 0.11 162)">
                      田中AIデザインゼミ
                    </Text>
                  </Menu.Item>

                  {/* スペース項目2 */}
                  <Menu.Item
                    py={12}
                    px={12}
                    leftSection={<Dot size={20} color="#e9ecef" />}
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: rem(8),
                      marginBottom: rem(2)
                    }}
                    onClick={() => {
                      router.push('/spaces/photo/projects');
                      setMobileSpaceMenuOpened(false);
                    }}
                  >
                    <Text fw={800} size="md" c="gray.6">
                      写真部 公式
                    </Text>
                  </Menu.Item>

                  <Divider my={8} />

                  <Menu.Item
                    component="div"
                    p={0}
                    closeMenuOnClick={false}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Button
                      variant="light"
                      color="gray"
                      fullWidth
                      justify="flex-start"
                      radius="md"
                      leftSection={<Plus size={16} />}
                      fw={800}
                      h={40}
                      onClick={() => {
                        router.push('/spaces/save');
                        setMobileSpaceMenuOpened(false);
                      }}
                    >
                      新しいスペースを作成
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Stack>
          </Box>

          {/* PCでのcollapsed時用アイコン: visibleFrom="sm" でPC限定表示 */}
          {/* {collapsed && (
            <Box mb="lg" visibleFrom="sm">
              <Tooltip label="スペースを切り替え" position="right" withArrow>
                <ActionIcon variant="light" size={40} mx="auto" display="flex" color="brand.6" radius="md">
                  <IconSelector style={{ width: 22, height: 22 }} />
                </ActionIcon>
              </Tooltip>
            </Box>
          )} */}

          {/* メニューリンク一覧：ベースコードを物理的に完全維持 */}
          <Stack gap={2} px={collapsed ? 0 : 4} align={collapsed ? "center" : "stretch"}>
            {!collapsed &&
              <Text size="xs" c="dimmed" fw={700} ml={collapsed ? 0 : 2} tt="uppercase" style={{ letterSpacing: '0.5px' }} mb={"xs"}>
                スペースメニュー
              </Text>
            }

            <MenuLink
              href="/spaces/xxx/projects"
              label="プロジェクト一覧"
              icon={<LayoutDashboard style={{ width: 22, height: 22 }} />}
              active={pathname.includes('/projects')}
              collapsed={collapsed}
            />

            {/* Globalラベルセクション */}
            <Divider
              my="sm"
            // label={!collapsed && "Global"} 
            // labelPosition="center" 
            // styles={{ 
            //   label: { 
            //     fontSize: '11px', 
            //     textTransform: 'uppercase', 
            //     fontWeight: 700,
            //     color: 'oklch(0.44 0.01 256.85)' 
            //   } 
            // }}
            />

            {!collapsed &&
              <Text
                size="xs"
                c="dimmed"
                fw={700}
                ml={collapsed ? 0 : 2}
                tt="uppercase"
                style={{ letterSpacing: '0.5px' }}
                // mt={"md"} 
                mb={"xs"}
              >
                グローバルメニュー
              </Text>
            }

            <MenuLink
              href="/spaces/xxx/notifications"
              label="お知らせ一覧"
              icon={<Bell style={{ width: 22, height: 22 }} />}
              active={pathname === '/spaces/xxx/notifications'}
              collapsed={collapsed}
              badge={3}
            />

            <MenuLink
              href="/spaces/xxx/invitations"
              label="承認待ち招待"
              icon={<Users style={{ width: 22, height: 22 }} />}
              active={pathname === '/spaces/xxx/invitations'}
              collapsed={collapsed}
            />

            <MenuLink
              href="/profile"
              label="プロフィール"
              icon={<User style={{ width: 22, height: 22 }} />}
              active={pathname === '/profile'}
              collapsed={collapsed}
            />

            <MenuLink
              href="/settings"
              label="アプリ設定"
              icon={<Settings style={{ width: 22, height: 22 }} />}
              active={pathname === '/settings'}
              collapsed={collapsed}
            />
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      {/* =========================================================================
          3. メインコンテンツ & 第2ヘッダー (HTML構造完全移植)
         ========================================================================= */}
      <AppShell.Main
        bg="oklch(0.95 0.006 162)" // ボディ背景色 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* 第2ヘッダー：HTML構造に基づきメインヘッダー下に物理固定 */}
        <Box
          style={{
            backgroundColor: '#ffffff', // bg-white
            borderBottom: '1px solid #f3f4f6', // border-gray-100
            paddingLeft: '16px', paddingRight: '16px', // px-4
            paddingTop: '8px', paddingBottom: '8px', // py-2
            flexShrink: 0,
            zIndex: 100, // z-[100]
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '56px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
            position: 'sticky',
            top: 0 // メインヘッダーの下に固定
          }}
        >
          {/* 左側ユニット */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '40px', justifyContent: 'center', paddingLeft: '4px', paddingRight: '4px' }}>
              <span style={{
                color: 'oklch(0.73 0.11 162)', // text-primary
                fontSize: '12px',
                fontWeight: 900, // font-black
                textTransform: 'uppercase',
                letterSpacing: '0.1em', // tracking-widest
                lineHeight: 1,
                marginBottom: '4px'
              }}>
                スペース
              </span>
              <h2 style={{
                fontSize: '15px',
                fontWeight: 900, // font-black
                // color: 'oklch(0.44 0.01 256.85)', // text-neutral
                color: 'black',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '150px' // max-w-[150px]
              }}>
                田中AIデザインゼミ
              </h2>
            </div>
          </div>

          {/* 右側ユニット */}
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '9999px', transition: 'all 0.3s', paddingLeft: '4px', paddingRight: '4px', width: '40px', backgroundColor: 'transparent' }}>
              <button style={{
                height: '32px', width: '32px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px', border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280'
              }}>
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Box>

        {/* ページコンテンツ本体 */}
        <Box p="lg" style={{ flexGrow: 1 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

// -----------------------------------------------------------------
// HeaderActions：通知・ユーザーメニュー (ベースコードのロジックを完全復元)
// -----------------------------------------------------------------
function HeaderActions() {
  const badgeCount = 3;

  return (
    <Group gap="md" wrap="nowrap">
      {/* 通知ドロップダウン */}
      <Menu id="global-notif-menu" shadow="md" width={280} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            color="oklch(0.551 0.027 264.4)" // gray-500
            // color="dimmed" 
            size="lg"
            pos="relative"
            style={{ overflow: 'visible' }}
          >
            <Bell style={{ width: 26, height: 26 }} />
            {badgeCount > 0 && (
              <Badge
                color="error"
                variant="filled"
                pos="absolute"
                top={4}
                right={4}
                circle
                size="xs"
                style={{
                  border: '1.5px solid white',
                  minWidth: '16px',
                  height: '16px',
                  padding: 0,
                  fontSize: '10px',
                  zIndex: 10,
                  transform: 'translate(45%, -45%)',
                  pointerEvents: 'none'
                }}
              >
                {badgeCount}
              </Badge>
            )}
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label><Text fw={800} size="sm">直近の通知</Text></Menu.Label>
          <Menu.Item leftSection={<Bell style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>新しい共有事項があります</Text>
          </Menu.Item>
          <Menu.Item leftSection={<Users style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>スペースへの招待が届いています</Text>
          </Menu.Item>
          <Divider />
          <Menu.Item
            component={Link}
            href="/notifications"
            style={{
              textAlign: 'center',
              color: 'oklch(0.73 0.11 162)',
              fontWeight: 800
            }}
          >
            <Text size="sm">すべてを見る</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* ユーザーアバターメニュー */}
      <Menu id="global-user-menu" shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <UnstyledButton style={{ borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
            <Avatar radius="xl" size="md" color="brand.6" src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + "18"} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label><Text fw={800} size="sm">ユーザー設定</Text></Menu.Label>
          <Menu.Item leftSection={<User style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>プロフィール</Text>
          </Menu.Item>
          <Menu.Item leftSection={<Settings style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={500}>設定</Text>
          </Menu.Item>
          <Divider />
          <Menu.Item color="error" leftSection={<LogOut style={{ width: 16, height: 16 }} />}>
            <Text size="sm" fw={800}>ログアウト</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}