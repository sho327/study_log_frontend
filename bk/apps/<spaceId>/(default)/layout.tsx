'use server'
// Modules
import { useParams } from 'next/navigation';
// Layout/Components
import ClientDefaultLayout from "@/components/layout/clientDefaultLayout";
// Libs/ServerUtils
import { commonRepository } from '@/lib/supabase/repository/common'
import { supabaseServerAdmin } from '@/lib/supabase/serverAdmin'
import { User } from '@supabase/supabase-js'
import { currentUser } from '@/lib/supabase/repository/common'
/**
 * スペースレイアウト
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default async function SpaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const params = useParams()
    const selectedSpaceId = params.spaceId as string
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
