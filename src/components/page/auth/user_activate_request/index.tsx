"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/page/auth/authCard";
import { AuthButton } from "@/components/page/auth/authButton";
import { useAppStore } from "@/store";

export default function UserActivateRequest() {
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleResendEmail = () => {
        setIsLoading(true);
        setGlobalLoading(true);
        // メール再送処理
        console.log("Resending activation email...");

        // 通信中をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
        }, 1500);
    };

    const handleChangeEmail = () => {
        // メールアドレス変更処理
        console.log("Changing email address...");
    };

    return (
        <>
            <AuthCard className="text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm shadow-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-lg font-black text-neutral mb-4">メールを確認してください</h1>

                <p className="text-[12px] font-medium text-gray-500 leading-relaxed mb-6">
                    本人確認用のメールを送信しました。<br />
                    メール内のリンクをクリックして、<br />
                    アカウントを有効化してください。
                </p>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                    <p className="text-[12px] font-black text-secondary uppercase tracking-widest">メールが届かない場合</p>
                    <div className="flex flex-col gap-2 pt-1">
                        <AuthButton
                            type="button"
                            variant="primary"
                            onClick={handleResendEmail}
                            isLoading={isLoading}
                        >
                            確認メールを再送する
                        </AuthButton>
                        <button
                            onClick={handleChangeEmail}
                            className="btn btn-outline border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 hover:text-neutral rounded-xl normal-case font-bold transition-all border-[1.5px] text-sm h-11 min-h-[44px]"
                        >
                            メールアドレスを変更する
                        </button>
                    </div>
                </div>
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
