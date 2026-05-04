"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/page/auth/authCard";
import { AuthButton } from "@/components/page/auth/authButton";
import { useAppStore } from "@/store";

export default function UserActivateSuccess() {
    const router = useRouter();
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigateToSpace = () => {
        setIsLoading(true);
        setGlobalLoading(true);

        // 遷移前の処理をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
            router.push("/dashboard");
        }, 1200);
    };

    return (
        <>
            <AuthCard className="text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm shadow-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-lg font-black text-neutral mb-4">アカウントの有効化完了</h1>

                <p className="text-[12px] font-medium text-gray-500 leading-relaxed mb-8">
                    メールアドレスの確認が完了しました。<br />
                    このまま「ログインする」ボタンを押して、<br />
                    ログインできます。
                </p>

                <div>
                    <AuthButton
                        variant="primary"
                        onClick={handleNavigateToSpace}
                        isLoading={isLoading}
                    >
                        ログインする
                    </AuthButton>
                </div>
            </AuthCard>

            <div className="mt-8 text-center text-[12px] font-black text-secondary uppercase tracking-widest opacity-60">
                <p>Welcome to Unimoa Space</p>
            </div>
        </>
    );
}
