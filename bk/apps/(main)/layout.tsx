'use server'
// Layout/Components
import ClientDefaultLayout from "@/components/layout/clientDefaultLayout";
// Libs/ServerUtils
// import { getSessionData } from '@/lib/server-utils/getSessionData'
import { commonRepository } from '@/lib/supabase/repository/common'
import { supabaseServerAdmin } from '@/lib/supabase/serverAdmin'
import { User } from '@supabase/supabase-js'
import { currentUser } from '@/lib/supabase/repository/common'
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
    const adminClient = await supabaseServerAdmin()
    let sessionUser: User | null = await commonRepository.getSessionUser()
    let profileWithSpaces: currentUser | null = null
    if (sessionUser) {
        profileWithSpaces = await commonRepository.getCurrentUserById(adminClient, sessionUser?.id)
    }
    console.log(profileWithSpaces)
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <ClientDefaultLayout>
            {children}
        </ClientDefaultLayout>
    )
}
