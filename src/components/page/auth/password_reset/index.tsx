"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { AuthButton } from "@/components/page/auth/authButton";
import { passwordResetSchema, PasswordResetFormValues } from "@/lib/schema/auth";
import { useAppStore } from "@/store";

export default function PasswordReset() {
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordResetFormValues>({
        resolver: zodResolver(passwordResetSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: PasswordResetFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- パスワード更新試行 ---");
        console.log("Data:", data);

        // 通信中をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
        }, 1500);
    };

    return (
        <>
            <AuthCard>
                <h1 className="text-base font-black text-neutral mb-8 border-b border-gray-200 pb-4">
                    パスワードの更新
                </h1>

                <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-6">
                    新しいパスワードを設定してください。<br />設定後、自動的にログインします。
                </p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* 新しいパスワード入力 */}
                    <FormInput
                        label="新しいパスワード"
                        type="password"
                        placeholder="8文字以上の英数字"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    {/* パスワード確認入力 */}
                    <FormInput
                        label="パスワード（確認）"
                        type="password"
                        placeholder="もう一度入力してください"
                        error={errors.passwordConfirm?.message}
                        {...register("passwordConfirm")}
                    />

                    <div className="pt-2">
                        <AuthButton
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            パスワードを更新
                        </AuthButton>
                    </div>
                </form>
            </AuthCard>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <Link
                    href="/login"
                    className="text-[12px] font-bold text-secondary hover:text-neutral flex items-center justify-center gap-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    ログイン画面へ戻る
                </Link>
            </div>
        </>
    );
}
