// Layout/Components
import ClientMainLayout from "@/components/layout/clientMainLayout";
// Libs/ServerUtils
// import { getSessionData } from '@/lib/server-utils/getSessionData'

/**
 * メインレイアウト
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    // const {
    //     profileWithSpaces,
    //     selectedSpaceId: finalSelectedSpaceId,
    //     needsCookieUpdate,
    // } = await getSessionData()

    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <ClientMainLayout>
            {children}
        </ClientMainLayout>
    )
}
