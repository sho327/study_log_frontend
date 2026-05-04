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
  TextInput,
  Drawer
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconMenu2, 
  IconBell, 
  IconUser, 
  IconSettings, 
  IconLogout, 
  IconSelector, 
  IconUsers, 
  IconLayoutDashboard,
  IconSearch,
  IconCheck,
  IconChevronUp,
  IconChevronDown,
  IconPointFilled,
  IconPlus,
  IconChevronRight,
  IconMessageDots,
  IconInfoCircle,
  IconAppWindow
} from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { MenuLink } from '@/components/layout/menuLink';
import { SpaceMenu } from '@/components/layout/SpaceMenu';
import { SecondaryHeader } from '@/components/layout/SecondaryHeader';
import { HeaderActions } from '@/components/layout/HeaderActions';
import { AppSidebar } from '@/components/layout/AppSidebar';

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

  // スペース選択用データ
  const spaces = [
    { id: 'dev', label: '田中AIデザインゼミ' },
    { id: 'photo', label: '写真部 公式' },
  ];
  const activeSpace = spaces[0]; // 仮に最初のスペースをアクティブとする

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ 
        width: navbarWidth, 
        breakpoint: 'sm', // 'sm'以上の画面幅で表示
        collapsed: { mobile: !mobileOpened } 
      }}
      // 第2ヘッダーを自前で制御するためpaddingは0
      padding={0}
      transitionDuration={0}
      transitionTimingFunction="ease"
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
              <IconMenu2 style={{ width: 24, height: 24 }} />
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
                <SpaceMenu
                  opened={spaceMenuOpened}
                  onChange={setSpaceMenuOpened}
                  spaces={spaces}
                  activeSpace={activeSpace}
                />
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
      {/* PC用サイドバー */}
      <AppShell.Navbar p="xs" style={{ borderRight: '1px solid oklch(0.929 0.013 255.5)', zIndex: 1002 }}>
        <AppSidebar
          collapsed={collapsed}
          pathname={pathname}
          mobileSpaceMenuOpened={mobileSpaceMenuOpened}
          setMobileSpaceMenuOpened={setMobileSpaceMenuOpened}
          spaces={spaces}
          activeSpace={activeSpace}
          onLinkClick={toggleMobile} // スマホ時にリンククリックで閉じる
        />
      </AppShell.Navbar>

      {/* スマホ用ドロワー */}
      <Drawer opened={mobileOpened} onClose={toggleMobile} size="80%" withCloseButton={false} padding={0}>
        <AppSidebar
          collapsed={false} // ドロワー内では常に展開
          pathname={pathname}
          mobileSpaceMenuOpened={mobileSpaceMenuOpened}
          setMobileSpaceMenuOpened={setMobileSpaceMenuOpened}
          spaces={spaces}
          activeSpace={activeSpace}
          isMobileDrawer={true}
          onLinkClick={toggleMobile} // リンククリックで閉じる
        />
      </Drawer>

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
        <SecondaryHeader spaceName={activeSpace.label} />

        {/* ページコンテンツ本体 */}
        <Box p="lg" style={{ flexGrow: 1 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}