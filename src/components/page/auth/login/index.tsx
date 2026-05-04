"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { SocialLoginButtons } from "@/components/page/auth/socialLoginButtons";
import { useAppStore } from "@/store";
import { AuthButton } from "@/components/page/auth/authButton";
import { loginSchema, LoginFormValues } from "@/lib/schema/auth";

export default function Login() {
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    // ==========================================
    // 1. React Hook Form の設定
    // ==========================================
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur", // 入力欄からフォーカスが外れた時にバリデーション実行
    });

    // ==========================================
    // 2. 送信時の処理
    // ==========================================
    const onSubmit = (data: LoginFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        // 指定のテストアカウントかチェック
        // 実際の実装ではここで Supabase の signInWithPassword 等を呼び出します
        if (data.email === "test@test.com" && data.password === "test") {
            console.log("--- ログイン成功 ---");
            console.log("Email:", data.email);
            console.log("Password:", data.password);
            // alert("ログインに成功しました！");
        } else {
            console.log("--- ログイン失敗 ---");
            console.log("入力された値:", data);
        }

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
                    ログイン
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
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                        rightLabel={
                            <Link href="/password_reset_request" className="text-[12px] font-bold text-primary hover:underline transition-all">
                                パスワードを忘れた場合
                            </Link>
                        }
                    />

                    <AuthButton
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        ログイン
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
                    アカウントをお持ちでないですか？
                    <Link href="/signup" className="text-primary hover:underline ml-2">
                        新規登録
                    </Link>
                </p>
            </div>

            <div className="flex justify-center gap-6 mt-12 text-[12px] font-black text-secondary uppercase tracking-[0.2em] opacity-80">
                <a href="#" className="hover:text-primary transition-colors">
                    サポート
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                    プライバシー
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                    利用規約
                </a>
            </div>
        </>
    );
}