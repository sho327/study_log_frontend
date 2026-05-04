'use server'
// Supabase
import { supabaseServerAdmin } from '@/lib/supabase/serverAdmin'
// ServerUtils
import { getAppCookie, setAppCookie, deleteAppCookie } from '@/lib/server-utils/cookie'
// Schema
import { getSpaceSelectionSchema } from "@/lib/schema/auth";
// Constants
import { selectedSpaceIdCookieKey } from "@/components/constants";
// Repository
import { commonRepository } from "@/lib/supabase/repository/common";
import { spaceRepository } from "@/lib/supabase/repository/space";
// Types
import { T_SpaceRow } from '@/types/supabase/space'
import { SyncSpaceResponse } from '@/types/action/auth/syncSpaceSelection'

/**
 * スペース選択状態の同期 (Server Action)
 * @args 
 *   - userId: ユーザーID
 * @returns 
 *   - success: true/false
 *   - spaceId: スペースID
 * @createdBy KatoShogo
 * @createdAt 2026/01/27
 */
export async function syncSpaceSelection(rawUserId: string): Promise<SyncSpaceResponse> {
    // ----------------------------------------------------
    // 1. 入力値バリデーション(Zod)
    // ----------------------------------------------------
    const result = getSpaceSelectionSchema.safeParse({ userId: rawUserId });
    // バリデーション失敗（フロントを突き抜けてきた場合）
    if (!result.success) {
        return { error: "ユーザーIDが正しくありません。" };
    }
    const userId = result.data.userId;
    // ----------------------------------------------------
    // 2. セッションとの整合性チェック
    // ----------------------------------------------------
    const sessionUser = await commonRepository.getSessionUser();
    // セッション取得失敗
    if (!sessionUser) {
        return { error: 'セッションが見つかりませんでした。' }
    }
    if (sessionUser.id !== userId) {
        return { error: 'セッションと整合性がありません。' }
    }
    // ----------------------------------------------------
    // 3. Cookieに設定されたスペース取得
    // ----------------------------------------------------
    const adminClient = await supabaseServerAdmin();
    const selectedSpaceId = await getAppCookie(selectedSpaceIdCookieKey)
    if (selectedSpaceId) {
        // 自身が所属するスペースの取得
        const joinedSpacesData = await spaceRepository.listJoinedByProfileId(adminClient, userId)
        // 自身が所属するスペース一覧にCookieに設定されたスペースが存在するかのチェック
        const isJoinedSpace = joinedSpacesData.some((space: T_SpaceRow) => space.id === selectedSpaceId)
        if (isJoinedSpace) {
            // 存在する場合、成功としてスペースIDを返却
            return { success: true, spaceId: selectedSpaceId }
        } else {
            // 存在しない場合、Cookieを削除して次処理へ進む
            await deleteAppCookie(selectedSpaceIdCookieKey)
        }
    }
    // ----------------------------------------------------
    // 4. ユーザIDを基に個人スペースIDの取得(Cookieへの設定)
    // ----------------------------------------------------
    const spaceData = await spaceRepository.getPersonalSpaceByOwnerId(adminClient, userId)
    // 個人スペースの取得失敗
    if (!spaceData) {
        // Cookieの削除
        await deleteAppCookie(selectedSpaceIdCookieKey)
        return { error: '個人スペースが見つかりませんでした。' }
    } else {
        // Cookieの設定
        await setAppCookie(selectedSpaceIdCookieKey, spaceData.id)
    }
    // ----------------------------------------------------
    // 6. ログイン成功(スペースIDを返却)
    // ----------------------------------------------------
    return { success: true, spaceId: spaceData.id }
}
