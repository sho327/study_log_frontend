"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { AuthButton } from "@/components/page/auth/authButton";
import { useAppStore } from "@/store";
import { quickSetupSchema, QuickSetupFormValues } from "@/lib/schema/auth";

export default function QuickSetup() {
    const router = useRouter();
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuickSetupFormValues>({
        resolver: zodResolver(quickSetupSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: QuickSetupFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- クイックセットアップ完了試行 ---");
        console.log("Data:", data);

        // 通信中をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <>
            <AuthCard>
                {/* 招待情報 */}
                <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                    <div className="avatar online">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Space" alt="Space avatar" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[13px] font-black text-neutral leading-tight">
                            「情報デザイン佐藤ゼミ」<br />
                            <span className="text-primary font-bold">への招待を承諾しました</span>
                        </h2>
                    </div>
                </div>

                <h1 className="text-base font-black text-neutral mb-2 uppercase tracking-tighter">
                    アカウント作成
                </h1>
                <p className="text-[11px] text-gray-500 mb-8 font-bold">
                    参加を完了するために詳細を設定してください
                </p>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* アバター選択 */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="avatar">
                            <div className="w-16 rounded-full bg-gray-100">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser" alt="User avatar" />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                        >
                            画像を選択
                        </button>
                    </div>

                    {/* ニックネーム */}
                    <FormInput
                        label="ニックネーム (表示名)"
                        placeholder="例：たなか"
                        error={errors.nickname?.message}
                        {...register("nickname")}
                    />

                    {/* パスワード */}
                    <FormInput
                        label="パスワード"
                        type="password"
                        placeholder="8文字以上の英数字"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    {/* パスワード確認 */}
                    <FormInput
                        label="パスワード（確認）"
                        type="password"
                        placeholder="もう一度入力してください"
                        error={errors.passwordConfirm?.message}
                        {...register("passwordConfirm")}
                    />

                    {/* 送信ボタン */}
                    <div className="pt-2">
                        <AuthButton
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            登録を完了して参加する
                        </AuthButton>
                    </div>
                </form>
            </AuthCard>

            {/* 下部説明 */}
            <div className="mt-8 text-center px-4">
                <p className="text-[10px] font-bold text-secondary leading-relaxed">
                    この登録を完了すると、自動的に「個人スペース」と「招待されたスペース」の2つが作成されます。
                </p>
            </div>
        </>
    );
}
