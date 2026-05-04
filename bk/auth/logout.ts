'use server'
// Modules
import { redirect } from 'next/navigation'
// Supabase
import { supabaseServer } from '@/lib/supabase/server'
// ServerUtils
import { deleteAppCookie } from '@/lib/server-utils/cookie'
// Constants
import { selectedSpaceIdCookieKey, pageRoutes } from "@/components/constants";

/**
 * ログアウト処理 (Server Action)
 * @args 
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export async function logout() {
    // ----------------------------------------------------
    // 1. Supabaseクライアントの初期化
    // ----------------------------------------------------
    const supabase = await supabaseServer()
    // ----------------------------------------------------
    // 2. Supabaseのセッションを破棄
    // ----------------------------------------------------
    const { error } = await supabase.auth.signOut()
    // ログアウト失敗
    if (error) {
        console.error('Supabase sign out failed:', error)
        // 失敗しても、Cookieクリアとリダイレクトは続行し、セキュリティを優先
    }
    // ----------------------------------------------------
    // 3. 選択スペースIDのCookieを破棄
    // ----------------------------------------------------
    await deleteAppCookie(selectedSpaceIdCookieKey)
    // ----------------------------------------------------
    // 4. ログインページへリダイレクト
    // ----------------------------------------------------
    redirect(pageRoutes.AUTH.LOGIN)
}


// ログイン・新規登録・データ取得は「サーバーサイドで `Service Role`（管理者）」が行い、
// **ログアウトや現在のセッション維持だけは「`Anon Key`」に任せる

// ログアウトに `Anon Key` が必要なのか
// ログアウトの本質は、DBの操作ではなく「ブラウザ（またはサーバー）にある認証クッキーを安全に破棄すること」

// * **Service Role:** クッキーを無視して動く「特権」なので、ブラウザのセッションを消すのが苦手。
// * **Anon Key:** 常にクッキー（セッション）とセットで動くので、`signOut()` を呼ぶだけでブラウザのクッキーを掃除してくれる。

// 1. **RLSが全拒否なので安全**: `Anon Key` は公開されますが、
// すべてのテーブルに RLS をかけてポリシーを空（または自分のみ）にしているため、万が一キーが漏れても第三者がデータを抜くことは不可能。
// 2. **管理権限の局所化**: `Service Role` を使うコードは `loginAction` や `signupAction` 
// などの「サーバーサイド限定」に閉じ込めることで、クライアント側に特権が漏れるリスクをゼロにできる。

// | クライアント | キー | 主な役割 |
// | --- | --- | --- |
// | **`supabaseServer` (Admin)** | `Service Role` | ログイン、新規登録、管理者としてのデータ操作（RLSバイパス） |
// | **`supabaseBrowser` (Standard)** | `Anon Key` | **ログアウト**、現在のログインユーザー情報の取得、セッション維持 |

// 'use server'
// import { createClient } from '@/lib/supabase/server' // Anon Key版のクライアント
// import { redirect } from 'next/navigation'

// export async function logout() {
//     // Anon Key版はブラウザのCookieを読み取れるので、
//     // 実行すると対象ユーザーのセッションをサーバー・ブラウザ両方で破棄します
//     const supabase = createClient() 
//     await supabase.auth.signOut()

//     // 業務用のCookieも忘れず削除
//     await deleteAppCookie(selectedSpaceIdCookieKey)
    
//     redirect('/login')
// }
