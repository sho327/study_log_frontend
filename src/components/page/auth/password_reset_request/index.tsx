"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { AuthButton } from "@/components/page/auth/authButton";
import { passwordResetRequestSchema, PasswordResetRequestFormValues } from "@/lib/schema/auth";
import { useAppStore } from "@/store";

export default function PasswordResetRequest() {
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordResetRequestFormValues>({
        resolver: zodResolver(passwordResetRequestSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: PasswordResetRequestFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- パスワード再設定請求 ---");
        console.log("Email:", data.email);

        // 通信中をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
            setSent(true);
        }, 1500);
    };

    return (
        <>
            <AuthCard>
                {!sent ? (
                    <>
                        <h1 className="text-base font-black text-neutral mb-8 border-b border-gray-200 pb-4">
                            パスワード再設定
                        </h1>

                        <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-6">
                            登録済みのメールアドレスを入力してください。<br />パスワード再設定用のリンクを送信します。
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <FormInput
                                label="メールアドレス"
                                placeholder="tanaka@example.com"
                                error={errors.email?.message}
                                {...register("email")}
                            />

                            <AuthButton
                                type="submit"
                                variant="primary"
                                disabled={isLoading}
                                isLoading={isLoading}
                            >
                                送信する
                            </AuthButton>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-base font-black text-neutral mb-2">メールを送信しました</h2>
                        <p className="text-[12px] font-bold text-gray-500 leading-relaxed mb-8 px-2">
                            メール内のリンクをクリックして、<br />新しいパスワードを設定してください。
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-[12px] font-black text-primary uppercase tracking-widest hover:underline"
                        >
                            メールが届かない場合
                        </button>
                    </div>
                )}
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
                    ログインに戻る
                </Link>
            </div>
        </>
    );
}
