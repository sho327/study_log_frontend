import * as z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "メールアドレスを入力してください" })
        .email({ message: "正しいメールアドレス形式で入力してください" }),
    password: z
        .string()
        .min(1, { message: "パスワードを入力してください" })
        .min(4, { message: "パスワードは4文字以上である必要があります" }),
});

export const signupSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "メールアドレスを入力してください" })
            .email({ message: "正しいメールアドレス形式で入力してください" }),
        password: z
            .string()
            .min(1, { message: "パスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export const passwordResetRequestSchema = z.object({
    email: z
        .string()
        .min(1, { message: "メールアドレスを入力してください" })
        .email({ message: "正しいメールアドレス形式で入力してください" }),
});

export const passwordResetSchema = z
    .object({
        password: z
            .string()
            .min(1, { message: "新しいパスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export const quickSetupSchema = z
    .object({
        nickname: z
            .string()
            .min(1, { message: "ニックネームを入力してください" })
            .max(20, { message: "ニックネームは20文字以内で入力してください" }),
        password: z
            .string()
            .min(1, { message: "パスワードを入力してください" })
            .min(8, { message: "パスワードは8文字以上である必要があります" }),
        passwordConfirm: z
            .string()
            .min(1, { message: "パスワード（確認）を入力してください" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
    });

export const initialSetupSchema = z
    .object({
        displayName: z
            .string()
            .min(1, { message: "表示名を入力してください" })
            .max(30, { message: "表示名は30文字以内で入力してください" }),
        planMode: z.enum(["personal", "shared-free", "shared-pro", "invite"]),
        inviteCode: z.string().optional(),
        workspaceName: z.string().optional(),
        workspaceIcon: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.planMode === "shared-free" || data.planMode === "shared-pro") {
            if (!data.workspaceName || data.workspaceName.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "ワークスペース名を入力してください",
                    path: ["workspaceName"],
                });
            }

        }
        if (data.planMode === "invite") {
            if (!data.inviteCode || data.inviteCode.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "招待コードを入力してください",
                    path: ["inviteCode"],
                });
            }
        }
    });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PasswordResetRequestFormValues = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
export type QuickSetupFormValues = z.infer<typeof quickSetupSchema>;
export type InitialSetupFormValues = z.infer<typeof initialSetupSchema>;