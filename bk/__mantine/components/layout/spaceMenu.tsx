'use client';

import React from 'react';
import {
  Menu,
  UnstyledButton,
  Group,
  Text,
  Divider,
  Button,
  rem,
} from '@mantine/core';
import {
  User,
  ChevronUp,
  ChevronDown,
  Dot,
  Check,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { T_SpaceRow } from '@/types/supabase/space';

interface SpaceMenuProps {
  isMobile?: boolean;
  opened: boolean;
  onChange: (opened: boolean) => void;
  spaces: T_SpaceRow[];
  activeSpace: T_SpaceRow | null;
}

export const SpaceMenu = ({
  isMobile = false,
  opened,
  onChange,
  spaces,
  activeSpace,
}: SpaceMenuProps) => {
  const router = useRouter();

  const handleSpaceChange = (spaceId: string) => {
    router.push(`/spaces/${spaceId}/projects`);
    onChange(false);
  };

  const handleCreateNewSpace = () => {
    router.push('/spaces/save');
    onChange(false);
  };

  const menuItems = spaces.map((space) => (
    <Menu.Item
      key={space.id}
      py={12}
      px={12}
      leftSection={<Dot size={20} color={space.id === activeSpace?.id ? 'oklch(0.73 0.11 162)' : '#e9ecef'} />}
      rightSection={space.id === activeSpace?.id ? <Check size={18} color="oklch(0.73 0.11 162)" /> : null}
      style={{
        backgroundColor: space.id === activeSpace.id ? 'oklch(0.98 0.01 162)' : 'transparent',
        borderRadius: rem(8),
        marginBottom: rem(2),
      }}
      onClick={() => handleSpaceChange(space.id)}
    >
      <Text fw={800} size="sm" c={space.id === activeSpace?.id ? 'oklch(0.73 0.11 162)' : 'gray.6'}>
        {space.display_name}
      </Text>
    </Menu.Item>
  ));

  return (
    <Menu
      width={isMobile ? rem(212) : 260}
      position="bottom-start"
      offset={8}
      radius="lg"
      shadow="xl"
      opened={opened}
      onChange={onChange}
      zIndex={10005}
      portalProps={{ style: { zIndex: 10005 } }}
    >
      <Menu.Target>
        <UnstyledButton
          style={{
            border: opened ? '1px solid oklch(0.73 0.11 162)' : '1px solid oklch(0.929 0.013 255.5)',
            borderRadius: rem(8),
            padding: '8px 12px',
            backgroundColor: opened ? 'oklch(0.98 0.01 162)' : 'transparent',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto',
            height: rem(42),
          }}
        >
          <Group justify="space-between" style={{ width: '100%' }}>
            <Group gap="xs">
              <User size={18} color="oklch(0.73 0.11 162)" />
              <Text fw={800} size="sm" c="oklch(0.44 0.01 256.85)" truncate>
                {activeSpace?.display_name}
              </Text>
            </Group>
            {opened ? (
              <ChevronUp size={16} color="gray" />
            ) : (
              <ChevronDown size={16} color="gray" />
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown p={8}>
        <Menu.Label px={12} py={8}>
          <Text fw={900} size="sm" c="oklch(0.44 0.01 256.85)">
            スペースを選択
          </Text>
        </Menu.Label>

        <Divider my={4} style={{ opacity: 0.5 }} />

        {menuItems}

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
            onClick={handleCreateNewSpace}
          >
            新しいスペースを作成
          </Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};