"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { SocialLoginButtons } from "@/components/page/auth/socialLoginButtons";
import { useAppStore } from "@/store";
import { AuthButton } from "@/components/page/auth/authButton";
import { signupSchema, SignupFormValues } from "@/lib/schema/auth";

export default function Signup() {
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: SignupFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- 新規登録試行 ---");
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
                    新規登録
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* メールアドレス入力 */}
                    <FormInput
                        label="メールアドレス"
                        placeholder="tanaka@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    {/* パスワード入力 */}
                    <FormInput
                        label="パスワード"
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

                    <AuthButton
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        新規登録
                    </AuthButton>
                </form>

                {/* 区切り線 */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[12px] font-black text-secondary uppercase tracking-widest">
                        <span className="bg-white px-4">または</span>
                    </div>
                </div>

                {/* ソーシャルボタン */}
                <SocialLoginButtons />
            </AuthCard>

            {/* 下部リンク */}
            <div className="mt-8 text-center">
                <p className="text-[12px] font-bold text-gray-500">
                    既にアカウントをお持ちですか？
                    <Link href="/login" className="text-primary hover:underline ml-2">
                        ログイン
                    </Link>
                </p>
            </div>

            <p className="mt-8 text-[12px] text-center text-gray-500 leading-relaxed px-6">
                登録することで、Unimoaの<a href="#" className="underline">利用規約</a>および<a href="#"
                    className="underline">プライバシーポリシー</a>に同意したものとみなされます。
            </p>
        </>
    );
}
