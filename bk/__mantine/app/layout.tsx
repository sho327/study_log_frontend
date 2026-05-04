import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { createTheme, MantineColorsTuple } from '@mantine/core';
import { rem } from '@mantine/core';
// import { theme } from '../theme';
import { Inter, Noto_Sans_JP } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"] })

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

// const brand = [
//   '#e8f8f5', // 0: 最も薄い背景
//   '#d1f1eb', // 1: Hover時の背景
//   '#a3e3d7', // 2: Disabled等
//   '#75d5c3', // 3
//   '#47c7af', // 4
//   '#18bc9c', // 5: ここをメインに使用 (Primary)
//   '#15a98c', // 6: 少し濃いめ
//   '#12967b', // 7: 濃い（Hover用）
//   '#0f836b', // 8
//   '#0c705b', // 9: 最も濃い（テキスト用）
// ];

const theme = createTheme({
  // colors: {
  //   brand,
  // },
  // primaryColor: 'brand',
  // 日本語が綺麗に見えるフォントスタック
  // fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',

  // 1. 黒の薄さを解消 (DaisyUI base-content に完全一致させる)
  // black: 'oklch(0.27 0.01 256.85)', 
  black: 'oklch(0.193 0.042 265.8)',
  white: '#ffffff',

  primaryColor: 'brand',
  primaryShade: 6, // DaisyUI のメインカラーが [6] に来るように指定

  colors: {
    // ■ brand (Primary / Success と同一) -> oklch(0.73 0.11 162)
    brand: [
      'oklch(0.98 0.01 162)', 'oklch(0.95 0.03 162)', 'oklch(0.90 0.05 162)',
      'oklch(0.85 0.08 162)', 'oklch(0.80 0.10 162)', 'oklch(0.76 0.11 162)',
      'oklch(0.73 0.11 162)', // [6] Primary / Success
      'oklch(0.65 0.10 162)', 'oklch(0.55 0.09 162)', 'oklch(0.45 0.08 162)',
    ],

    // ■ secondary -> oklch(0.71 0.01 220.0)
    secondary: [
      'oklch(0.98 0.005 220)', 'oklch(0.95 0.005 220)', 'oklch(0.90 0.01 220)',
      'oklch(0.85 0.01 220)', 'oklch(0.80 0.01 220)', 'oklch(0.75 0.01 220)',
      'oklch(0.71 0.01 220)', // [6] Secondary
      'oklch(0.60 0.01 220)', 'oklch(0.50 0.01 220)', 'oklch(0.40 0.01 220)',
    ],

    // ■ accent -> oklch(0.65 0.07 45)
    accent: [
      'oklch(0.98 0.02 45)', 'oklch(0.95 0.03 45)', 'oklch(0.90 0.04 45)',
      'oklch(0.85 0.05 45)', 'oklch(0.80 0.06 45)', 'oklch(0.72 0.07 45)',
      'oklch(0.65 0.07 45)', // [6] Accent
      'oklch(0.55 0.07 45)', 'oklch(0.45 0.07 45)', 'oklch(0.35 0.07 45)',
    ],

    // ■ info -> oklch(0.61 0.15 243.64)
    info: [
      'oklch(0.95 0.05 243.64)', 'oklch(0.90 0.08 243.64)', 'oklch(0.85 0.10 243.64)',
      'oklch(0.80 0.12 243.64)', 'oklch(0.75 0.14 243.64)', 'oklch(0.68 0.15 243.64)',
      'oklch(0.61 0.15 243.64)', // [6] Info
      'oklch(0.55 0.14 243.64)', 'oklch(0.45 0.12 243.64)', 'oklch(0.35 0.10 243.64)',
    ],

    // ■ warning -> oklch(0.71 0.16 52.33)
    warning: [
      'oklch(0.96 0.05 52.33)', 'oklch(0.92 0.08 52.33)', 'oklch(0.88 0.11 52.33)',
      'oklch(0.84 0.13 52.33)', 'oklch(0.80 0.15 52.33)', 'oklch(0.75 0.16 52.33)',
      'oklch(0.71 0.16 52.33)', // [6] Warning
      'oklch(0.60 0.15 52.33)', 'oklch(0.50 0.13 52.33)', 'oklch(0.40 0.11 52.33)',
    ],

    // ■ error (danger) -> oklch(0.60 0.20 27.33)
    error: [
      'oklch(0.95 0.05 27.33)', 'oklch(0.90 0.08 27.33)', 'oklch(0.80 0.12 27.33)',
      'oklch(0.75 0.15 27.33)', 'oklch(0.70 0.18 27.33)', 'oklch(0.65 0.19 27.33)',
      'oklch(0.60 0.20 27.33)', // [6] Error
      'oklch(0.55 0.18 27.33)', 'oklch(0.45 0.15 27.33)', 'oklch(0.35 0.12 27.33)',
    ],

    // ■ neutral (base-content 等のグレー系) -> oklch(0.27 0.01 256.85)
    neutral: [
      // 'oklch(0.98 0.01 256.85)',
      'oklch(0.193 0.042 265.8)',

      'oklch(0.96 0.003 264.54)', // [1] base-300 (Hover)
      'oklch(0.95 0.006 162)',    // [2] base-100 / base-200 (Background/Border)
      
      // 'oklch(0.85 0.01 256.85)',
      // 'oklch(0.75 0.01 256.85)',
      // 'oklch(0.55 0.01 256.85)',
      // 'oklch(0.27 0.01 256.85)', // [6] base-content (Text)
      // 'oklch(0.35 0.01 256.85)',
      // 'oklch(0.27 0.01 256.85)', // [8] neutral
      // 'oklch(0.15 0.01 256.85)',
      'oklch(0.193 0.042 265.8)',
      'oklch(0.193 0.042 265.8)',
      'oklch(0.193 0.042 265.8)',
      'oklch(0.193 0.042 265.8)', // [6] base-content (Text)
      'oklch(0.193 0.042 265.8)',
      'oklch(0.193 0.042 265.8)', // [8] neutral
      'oklch(0.193 0.042 265.8)',
    ],
  },
  
  // 全体的にサイズを底上げ (Mantineのデフォルトは14px)
  fontSizes: {
    // xs: rem(12),
    // sm: rem(14), // 日本の標準的な「小さめ」
    // md: rem(16), // 日本の「読みやすさ重視」の標準
    // lg: rem(18),
    // xl: rem(20),

    xs: '12px',
    sm: '14px', // 日本の標準的な「小さめ」
    md: '16px', // 日本の「読みやすさ重視」の標準
    lg: '18px',
    xl: '20px',
  },

  spacing: {
    xs: '10px',
    sm: '12px', // 日本の標準的な「小さめ」
    md: '16px', // 日本の「読みやすさ重視」の標準
    lg: '20px',
    xl: '32px',
  },

  // コンポーネントごとの微調整
  components: {
    AppShell: {
      styles: {
        main: {
          backgroundColor: '#f2f5f4', // base-100 相当
        },
      },
    },
    // Card: {
    //   defaultProps: {
    //     shadow: 'sm',
    //     padding: 'md',
    //     radius: 'md',
    //     bg: '#ffffff', // base-100 は背景色なので、カードは明示的に白
    //   },
    //   styles: {
    //     root: {
    //       backgroundColor: '#ffffff', // カードは白固定
    //       borderColor: '#f2f5f4',     // base-200 相当
    //     }
    //   }
    // },
    // Table: {
    //   styles: {
    //     thead: { backgroundColor: 'oklch(0.96 0.003 264.54)' }, // base-300
    //   },
    // },
    // Button: {
    //   defaultProps: {
    //     radius: 'md',
    //   }
    // },
    // NavLink: {
    //   styles: {
    //     label: { fontSize: rem(15), fontWeight: 500 }, // サイドバーの文字を少し大きく
    //   },
    // },
  },

  // デフォルトでmd(16px)を使うように設定
  // defaultRadius: 'md',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={`${inter.className} ${notoSansJP.className} antialiased`} style={{ color: '#444b52' }}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
