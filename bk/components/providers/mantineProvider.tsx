'use client';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import 'dayjs/locale/ja'; // dayjsの日本語ロケールを読み込む
import { theme } from '@/lib/theme';

export function MantineProviderWrap({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ColorSchemeScript defaultColorScheme="auto" />
            <MantineProvider theme={theme}>
                <Notifications position="top-right" />
                {/* 日付設定を日本語にする */}
                <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0, weekendDays: [0, 6] }}>
                    {children}
                </DatesProvider>
            </MantineProvider>
        </>
    )
}