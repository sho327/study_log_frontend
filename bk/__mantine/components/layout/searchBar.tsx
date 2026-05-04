'use client';

import React, { useRef } from 'react';
import { ActionIcon, TextInput, Box, rem, Group } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { Search, X } from 'lucide-react';
import { useAppStore } from '@/store';

export const SearchBar = () => {
    const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
    const searchRef = useClickOutside(() => {
        if (searchOpen) setSearchOpen(false);
    });

    return (
        <Box ref={searchRef} style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
            <Group
                gap={4}
                style={{
                    borderRadius: rem(9999),
                    transition: 'all 0.3s ease',
                    paddingLeft: searchOpen ? '4px' : '0px',
                    paddingRight: searchOpen ? '4px' : '0px',
                    width: searchOpen ? '240px' : '40px',
                    backgroundColor: searchOpen ? '#ffffff' : 'transparent',
                    border: searchOpen ? '1px solid oklch(0.929 0.013 255.5)' : 'none',
                    boxShadow: searchOpen ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                    overflow: 'hidden',
                    flexWrap: 'nowrap'
                }}
            >
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    radius="xl"
                    size="lg"
                    onClick={() => setSearchOpen(!searchOpen)}
                    style={{ flexShrink: 0 }}
                >
                    <Search size={20} strokeWidth={2.5} />
                </ActionIcon>

                {searchOpen && (
                    <TextInput
                        variant="unstyled"
                        placeholder="検索..."
                        size="sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setSearchOpen(false);
                                setSearchQuery('');
                            }
                        }}
                        styles={{
                            input: {
                                height: rem(32),
                                minHeight: rem(32),
                                padding: 0,
                                fontSize: '14px',
                                fontWeight: 500,
                            },
                            root: {
                                flex: 1,
                            }
                        }}
                        autoFocus
                    />
                )}

                {searchOpen && searchQuery && (
                    <ActionIcon
                        variant="transparent"
                        color="gray"
                        size="sm"
                        onClick={() => setSearchQuery('')}
                        style={{ flexShrink: 0 }}
                    >
                        <X size={14} />
                    </ActionIcon>
                )}
            </Group>
        </Box>
    );
};
