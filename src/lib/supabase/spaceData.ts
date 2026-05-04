// Modules
import { SupabaseClient } from '@supabase/supabase-js';
// Types
import { T_ProfileRow } from '@/types/supabase/profile'
import { T_SpaceRow } from '@/types/supabase/space'

// プロフィールの Row に、関連する Space のリスト（spaces）をネストして追加
export type ProfileWithSpaces = T_ProfileRow & {
    spaces: T_SpaceRow[]
}

// ----------------------------------------------------
// Space関連/SELECT
// ----------------------------------------------------
/**
 * SpaceIDを元にSpace情報を取得
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function getSpaceById(supabase: SupabaseClient, spaceId: string) {
    return await supabase
        .from('t_space')
        .select('*')
        .eq('id', spaceId)
        .single();
}

/**
 * ユーザーが所属するスペース一覧を取得
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function getSpacesByUserId(supabase: SupabaseClient, userId: string) {
    return await supabase
        .from('r_space')
        .select('*')
        .eq('profile_id', userId);
}

/**
 * ユーザーIDを基に個人スペースを取得
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function getPersonalSpaceByUserId(supabase: SupabaseClient, userId: string) {
    return await supabase
        .from('r_space')
        .select('*')
        .eq('profile_id', userId)
        .eq('is_personal', true);
}

// ----------------------------------------------------
// Space関連/INSERT
// ----------------------------------------------------
/**
 * Spaceを作成
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function createSpace(supabase: SupabaseClient, name: string, ownerId: string) {
    return await supabase
        .from('t_space')
        .insert({ name, owner_id: ownerId })
        .select()
        .single();
}
