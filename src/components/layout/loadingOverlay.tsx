"use client";

import React from "react";
import { useAppStore } from "@/store";
import { Loader2 } from "lucide-react";

/**
 * ページローディング表示コンポーネント
 * 
 * グローバル状態の isLoading が true の場合に表示されます。
 * スピナー形式を採用し、確実に中央揃えされるように設計されています。
 */
export default function LoadingOverlay() {
    const { isLoading } = useAppStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col items-center">
                {/* メインスピナー部分 */}
                <div className="relative flex justify-center items-center mb-2">
                    {/* 背景の光輪 */}
                    <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-full animate-pulse scale-150" />

                    {/* メインスピナー */}
                    <Loader2 className="h-10 w-10 text-primary animate-spin relative z-10" />
                </div>

                {/* 読み込みテキスト */}
                <p className="text-lg font-medium tracking-tight">
                    読み込み中です...
                </p>

                {/* 装飾用のドットアニメーション */}
                <div className="flex justify-center gap-1 mt-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
            </div>
        </div>
    );
}
