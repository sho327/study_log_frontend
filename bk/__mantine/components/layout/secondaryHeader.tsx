'use client';

import React from 'react';
import { T_SpaceRow } from '@/types/supabase/space';
import { T_ProjectRow } from '@/types/supabase/project';
import { SearchBar } from '@/components/layout/searchBar';
import { Box } from '@mantine/core';

interface SecondaryHeaderProps {
  activeSpace: T_SpaceRow | null;
  activeProject?: T_ProjectRow | null;
}

export const SecondaryHeader = ({ activeSpace, activeProject }: SecondaryHeaderProps) => {
  return (
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
        top: 0, // メインヘッダーの下に固定
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
            {/* プロジェクト名がある場合はスペース名、なければ「スペース」というラベルを表示 */}
            {activeProject ? activeSpace?.display_name : 'スペース'}
          </span>
          <h2 style={{
            fontSize: '15px',
            fontWeight: 900, // font-black
            color: 'black',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '250px' // max-w-[150px] -> 250pxに拡大
          }}>
            {/* プロジェクト名がある場合はプロジェクト名、なければスペース名を表示 */}
            {activeProject ? activeProject.title : activeSpace?.display_name}
          </h2>
        </div>
      </div>

      {/* 右側ユニット */}
      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
        <SearchBar />
      </div>
    </Box>
  );
};
