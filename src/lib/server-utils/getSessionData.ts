'use server'
// Modules
import { cookies } from 'next/headers'
// Supabase
import { fetchAuthenticatedUserData, ProfileWithSpaces } from '@/lib/supabase/userData'
// Constants
import { selectedSpaceIdCookieKey } from '@/components/constants'

interface SessionData {
    profileWithSpaces: ProfileWithSpaces | null
    selectedSpaceId: string | null
    needsCookieUpdate: boolean
}

/**
 * 認証ユーザーのプロフィールを取得し、選択中のスペースIDを検証/決定する ServerUtility関数
 * @returns {SessionData} 認証データと最終的な選択スペースID、Cookie更新フラグ
 */
export async function getSessionData(): Promise<SessionData> {
    // 1. プロファイルとスペース情報を取得
    const profileWithSpaces = await fetchAuthenticatedUserData()

    // 2. Cookieから選択スペースIDを安全に取得
    const cookieStore = await cookies()
    const selectedSpaceIdFromCookie: string | null =
        cookieStore.get(selectedSpaceIdCookieKey)?.value || null

    // 3. スペースIDの検証と決定ロジック
    const spaces = profileWithSpaces?.spaces || []
    const personalSpace = spaces.find((m: any) => m.is_personal) || null
    const personalSpaceId: string | null = personalSpace?.id || null

    let finalSelectedSpaceId: string | null = null

    if (spaces.length === 0) {
        // 所属スペースがない場合
        finalSelectedSpaceId = null
    } else if (selectedSpaceIdFromCookie) {
        // Cookieが設定されている場合
        const isSpaceExist = spaces.some((m: any) => m.id === selectedSpaceIdFromCookie)
        if (isSpaceExist) {
            finalSelectedSpaceId = selectedSpaceIdFromCookie
        } else {
            // 存在しない場合、個人スペースに切り替え
            finalSelectedSpaceId = personalSpaceId
        }
    } else {
        // Cookieが未設定の場合（初回アクセス）: 個人スペースIDを採用
        finalSelectedSpaceId = personalSpaceId
    }

    // Cookieの更新が必要かどうかのフラグ
    const needsCookieUpdate = finalSelectedSpaceId !== selectedSpaceIdFromCookie

    return {
        profileWithSpaces,
        selectedSpaceId: finalSelectedSpaceId,
        needsCookieUpdate,
    }
}