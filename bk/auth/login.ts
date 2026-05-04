'use server'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
import { getPersonalSpaceByUserId } from '@/lib/supabase/spaceData'
// ServerUtils
import { setAppCookie, deleteAppCookie } from '@/lib/server-utils/cookie'
// Schema
import { loginSchema, LoginFormValues } from "@/lib/schema/auth";
// Constants
import { selectedSpaceIdCookieKey } from "@/components/constants";

/**
 * ログイン処理 (Server Action)
 * @args 
 *   - formData: ログインフォームデータ
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function loginAction(formData: LoginFormValues) {
    // ----------------------------------------------------
    // 1. 入力値バリデーション(Zod)
    // ----------------------------------------------------
    const result = loginSchema.safeParse(formData);
    // バリデーション失敗（フロントを突き抜けてきた場合）
    if (!result.success) {
        return { error: "メールアドレスまたはパスワードが正しくありません。" };
    }
    const { email, password } = result.data;
    // ----------------------------------------------------
    // 2. Supabaseクライアントの初期化
    // ----------------------------------------------------
    const authClient = await supabaseServer();
    // ----------------------------------------------------
    // 3. ログイン処理
    // ----------------------------------------------------
    const { data, error } = await authClient.auth.signInWithPassword({
        email: email,
        password: password,
    })
    // ログイン失敗
    if (error) {
        return { error: 'メールアドレスまたはパスワードが正しくありません。' }
    }
    // ユーザー情報の取得失敗
    if (!data.user) {
        return { error: 'ユーザー情報の取得に失敗しました。' }
    }
    // ----------------------------------------------------
    // 4. ユーザIDを基に個人スペースIDの取得
    // ----------------------------------------------------
    const adminClient = await supabaseServer();
    const { data: spacesData, error: fetchError } = await getPersonalSpaceByUserId(adminClient, data.user.id)
    // 個人スペースの取得失敗
    if (fetchError) {
        if (fetchError.code === 'PGRST116') {
            // 整合性のためサインアウト
            await authClient.auth.signOut()
            // Cookieの削除
            await deleteAppCookie(selectedSpaceIdCookieKey)
            return { error: '個人スペースが見つかりませんでした。' }
        }
        // 整合性のためサインアウト
        await authClient.auth.signOut()
        // Cookieの削除
        await deleteAppCookie(selectedSpaceIdCookieKey)
        return { error: 'ログイン後の初期設定に失敗しました。' }
    }
    // ----------------------------------------------------
    // 5. 個人スペースIDをCookieに設定
    // ----------------------------------------------------
    const personalSpaceId = spacesData.id
    // Cookieの設定
    await setAppCookie(selectedSpaceIdCookieKey, personalSpaceId)
    // ----------------------------------------------------
    // 6. ログイン成功
    // ----------------------------------------------------
    return { success: true }
}
