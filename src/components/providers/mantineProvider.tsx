'use client';
import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ja'; // dayjsの日本語ロケールを読み込む

export function MantineProviderWrap({ children }: { children: React.ReactNode }) {
    const theme = createTheme({
        // Mantineのコンポーネント全体のメインカラーを指定したパレット名にする
        primaryColor: 'brand', 
        colors: {
            // 10段階のカラーパレット（薄い色 -> 濃い色）。
            // 面倒な場合、使いたい色(真ん中あたり)以外は適当に近い色でも動作はします
            brand: [
                'oklch(0.98 0.01 162)', 
                'oklch(0.95 0.03 162)', 
                'oklch(0.90 0.05 162)',
                'oklch(0.85 0.08 162)', 
                'oklch(0.80 0.10 162)', 
                'oklch(0.76 0.11 162)',
                'oklch(0.73 0.11 162)', // [6] Primary / Success
                'oklch(0.65 0.10 162)', 
                'oklch(0.55 0.09 162)', 
                'oklch(0.45 0.08 162)',
            ],
        },
    });
    return (
        <MantineProvider
            // withGlobalStyles
            // withNormalizeCSS
            theme={theme}
        >
            {/* 日付設定を日本語にする */}
            <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0, weekendDays: [0, 6] }}>
                {children}
            </DatesProvider>
        </MantineProvider>
    )
}