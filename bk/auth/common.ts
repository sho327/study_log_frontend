'use server'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
// Server-Utils
import { setAppCookie, deleteAppCookie } from '@/lib/server-utils/cookie'
// Constants
import { selectedSpaceIdCookieKey } from '@/components/constants'

/**
 * ログインユーザーの個人スペースIDを取得し、Cookieに設定する
 * @param userId ログインユーザーのID
 */
export async function getAndSetDefaultSpaceId(userId: string) {
    if (!userId) {
        throw new Error('User ID is required.')
    }
    const supabase = await supabaseServer()
    // 1. サーバー側で安全に個人スペースIDを取得
    // t_profile 経由ではなく、r_space (メンバーシップ) テーブルを直接参照して
    // profile_id でフィルタリングし、結合された t_space の情報を取得する形に変更
    const { data: spacesData, error: fetchError } = await supabase
        .from('r_space')
        .select(`
            space_id,
            t_space!inner (
                id,
                is_personal
            )
        `)
        .eq('profile_id', userId)

    if (fetchError) {
        console.error('Failed to fetch user spaces:', fetchError.message)
        console.error('Supabase error detail:', fetchError)
        throw new Error('Failed to find default team.')
    }

    // 2. 個人スペースIDを特定
    let personalSpaceId: string | null = null
    if (spacesData && spacesData.length > 0) {
        // t_space!inner により t_space は必ず存在するはずだが、配列フィルタリングで探す
        const personalSpaceRow = spacesData.find((r: any) => r.t_space?.is_personal)
        if (personalSpaceRow && personalSpaceRow.t_space) {
            personalSpaceId = personalSpaceRow.t_space.id
        }
    }

    if (personalSpaceId) {
        // 3. 取得したIDをCookieに設定
        await setAppCookie(selectedSpaceIdCookieKey, personalSpaceId)
    } else {
        // 個人スペースが見つからない場合は、Cookieをクリア
        await deleteAppCookie(selectedSpaceIdCookieKey)
        throw new Error('No personal space found for the user.')
    }
}
