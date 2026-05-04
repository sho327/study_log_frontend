'use client';

import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, Text, ActionIcon, Box, rem, Divider, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconMenu2,
  IconListCheck, 
  IconBook, 
  IconFiles, 
} from '@tabler/icons-react';
import { useParams, usePathname } from 'next/navigation';
import { SpaceMenu } from '@/components/layout/SpaceMenu';
import { SecondaryHeader } from '@/components/layout/SecondaryHeader';
import { HeaderActions } from '@/components/layout/HeaderActions';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [collapsed, { toggle: toggleDesktop }] = useDisclosure(false);
  
  const [spaceMenuOpened, setSpaceMenuOpened] = useState(false);
  const [mobileSpaceMenuOpened, setMobileSpaceMenuOpened] = useState(false);
  
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ background: 'oklch(0.929 0.013 255.5)', minHeight: '100vh' }} />;
  }

  const navbarWidth = collapsed ? 64 : 240;

  // モックデータ
  const spaces = [
    { id: 'dev', label: '田中AIデザインゼミ' },
    { id: 'photo', label: '写真部 公式' },
  ];
  const activeSpace = spaces.find(s => s.id === params.spaceId) || spaces[0];
  const projectName = "プロジェクトA"; // 本来はAPIなどから取得

  const projectLinks = [
    { href: `/spaces/${params.spaceId}/projects/${params.projectId}/wiki`, label: "Wiki", icon: <IconBook style={{ width: 22, height: 22 }} /> },
    { href: `/spaces/${params.spaceId}/projects/${params.projectId}/files`, label: "ファイル共有", icon: <IconFiles style={{ width: 22, height: 22 }} /> },
  ];

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ 
        width: navbarWidth, 
        breakpoint: 'sm', // 'sm'以上の画面幅で表示
        collapsed: { mobile: !mobileOpened } 
      }}
      padding={0}
      transitionDuration={0}
      transitionTimingFunction="ease"
    >
      <AppShell.Header px="lg" style={{ borderBottom: '1px solid oklch(0.95 0.006 162)', zIndex: 1001 }}>
        <Group h="100%" justify="space-between">
          <Group gap="sm">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            
            <ActionIcon variant="subtle" onClick={toggleDesktop} visibleFrom="sm" color="oklch(0.551 0.027 264.4)" size="lg">
              <IconMenu2 style={{ width: 24, height: 24 }} />
            </ActionIcon>
            
            <Group gap="1">
              <Group gap="xs">
                <ActionIcon variant="subtle" bg="brand.6" size="md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="scale-75">
                    <g transform="translate(3.5, 4) scale(0.7)">
                      <circle cx="9" cy="7" r="4" />
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                    </g>
                  </svg>
                </ActionIcon>
                <Text fw={900} size="xl" c="dark" style={{ letterSpacing: rem(-0.5) }}>
                  Unimoa
                </Text>
              </Group>

              <Divider orientation="vertical" mx="xs" h={35} visibleFrom="sm" style={{ borderColor: 'oklch(0.929 0.013 255.5)' }} />
              
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

      <AppShell.Navbar p="xs" style={{ borderRight: '1px solid oklch(0.929 0.013 255.5)', zIndex: 1002 }} visibleFrom="sm">
        <AppSidebar
          collapsed={collapsed}
          pathname={pathname}
          mobileSpaceMenuOpened={mobileSpaceMenuOpened}
          setMobileSpaceMenuOpened={setMobileSpaceMenuOpened}
          spaces={spaces}
          activeSpace={activeSpace}
          projectLinks={projectLinks}
          backLink={`/spaces/${params.spaceId}/projects`}
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
          projectLinks={projectLinks}
          backLink={`/spaces/${params.spaceId}/projects`}
          isMobileDrawer={true}
          onLinkClick={toggleMobile} // リンククリックで閉じる
        />
      </Drawer>

      <AppShell.Main bg="oklch(0.95 0.006 162)" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SecondaryHeader spaceName={activeSpace.label} projectName={projectName} />

        <Box p="lg" style={{ flexGrow: 1 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}