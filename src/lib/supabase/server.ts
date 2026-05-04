import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase/database.types'

// サーバーサイド専用：Service Role Keyを使用してRLSをバイパスする設定
export const supabaseServer = () => {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error('Supabaseの環境変数が設定されていません')
    }

    return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false,   // サーバー側なのでセッション保存不要
            autoRefreshToken: false, // サーバー側なので自動更新不要
        }
    })
}
