import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import LoadingOverlay from "@/components/layout/loadingOverlay"

// --- MantineUI設定 ---
import { MantineProviderWrap } from "@/components/providers/mantineProvider"
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
// --- MantineUI設定 ---
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"] })

export const metadata: Metadata = {
  title: "Unimoa - Space (React Refined)",
  description: "Team collaboration and project management",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-theme="unimoa_light">
      <body className={`${inter.className} ${notoSansJP.className} antialiased`}>
        {/* --- MantineUI設定 --- */}
        <MantineProviderWrap>
          {children}
        </MantineProviderWrap>
        {/* --- MantineUI設定 --- */}
        <LoadingOverlay />
        <Analytics />
      </body>
    </html>
  )
}
