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
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const MenuLink = ({ href, label, icon, active, collapsed, badge, style, onClick }: MenuLinkProps) => {
  return (
    <NavLink
      component={Link}
      href={href}
      label={!collapsed && label}
      active={active}
      // ↓ アイコンの加工をやめ、そのまま表示する
      onClick={onClick}
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
          padding: '8px 12px', // paddingは常に維持
          height: '42px',
          width: collapsed ? '42px' : 'auto', // 縮小時は正方形にする
          '&:hover': {
            backgroundColor: 'oklch(0.96 0.003 264.54)',
          }
        },
        body: {
          justifyContent: collapsed ? 'center' : 'flex-start', // 縮小時に中央揃え
        },
        section: {
          marginRight: collapsed ? 0 : undefined, // 縮小時にmarginを0にして中央揃えを実現
        },
        label: {
          fontWeight: 600,
          fontSize: '14px'
        }
      }}
      style={style ? { ...style } : undefined}
    />
  );
};