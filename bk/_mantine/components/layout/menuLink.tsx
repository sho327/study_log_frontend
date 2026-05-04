'use client';

import React from 'react';
import { NavLink, Badge, Box } from '@mantine/core';
import Link from 'next/link';

interface MenuLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  badge?: number;
}

export const MenuLink = ({ href, label, icon, active, collapsed, badge }: MenuLinkProps) => {
  return (
    <NavLink
      component={Link}
      href={href}
      label={!collapsed && label}
      active={active}
      leftSection={
        <Box style={{
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
      }
      rightSection={
        badge && !collapsed && (
          <Badge size="xs" variant="filled" color="red" circle>
            {badge}
          </Badge>
        )
      }
      styles={{
        root: {
          borderRadius: '8px',
          marginBottom: '2px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '8px 12px',
          height: '42px',
          '&:hover': {
            backgroundColor: 'oklch(0.96 0.003 264.54)',
          }
        },
        section: {
          margin: collapsed ? 0 : undefined,
        },
        label: {
          fontWeight: 600,
          fontSize: '14px'
        }
      }}
    />
  );
};