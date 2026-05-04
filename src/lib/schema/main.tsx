import * as z from "zod";

/**
 * メンバー管理: 招待入力用スキーマ
 * - 登録済ユーザはサジェスト選択前提
 * - 未登録の場合は有効なメール形式で追加
 */
export const inviteEmailSchema = z
    .string()
    .trim()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "有効なメールアドレスを入力してください" });

/**
 * メンバー管理: 招待入力（ID/メール）用スキーマ
 * サジェスト検索と組み合わせて使う想定。空入力のみ弾く。
 */
export const inviteInputSchema = z
    .string()
    .trim()
    .min(1, { message: "ユーザーIDまたはメールアドレスを入力してください" });

export type InviteEmailInput = z.infer<typeof inviteEmailSchema>;
export type InviteInput = z.infer<typeof inviteInputSchema>;
