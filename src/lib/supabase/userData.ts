// Modules
import { supabaseServer } from './server'
import type { User } from '@supabase/supabase-js'
// Types
import { T_ProfileRow } from '@/types/supabase/profile'
import { T_SpaceRow } from '@/types/supabase/space'

// プロフィールの Row に、関連する Space のリスト（spaces）をネストして追加
export type ProfileWithSpaces = T_ProfileRow & {
    spaces: T_SpaceRow[]
}

// ----------------------------------------------------
// 認証済みユーザーのプロフィールとチームを取得する関数
// ----------------------------------------------------
/**
 * 現在ログインしているユーザーセッション情報を取得
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export const getSessionUser = async (): Promise<User | null> => {
    const supabase = await supabaseServer()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) return null
    return data.user
}

/**
 * 認証済みユーザーのプロフィールとスペースをフェッチする
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function fetchAuthenticatedUserData(): Promise<ProfileWithSpaces | null> {
    const user = await getSessionUser()
    if (!user) {
        return null
    }
    const supabase = await supabaseServer()
    const { data: profileData, error } = await supabase
        .from('t_profile')
        .select(`
            *, 
            spaces: r_space (...t_space (*))
        `)
        .eq('id', user.id)
        .single()

    if (error) {
        console.error('Error fetching user data in server utils:', error.message)
        return null
    }

    // `as unknown as ProfileWithSpaces` で型キャストを強制
    // (ランタイムのデータ構造は正しいため、パーサーエラーを回避するために使用)
    return profileData as unknown as ProfileWithSpaces
}
