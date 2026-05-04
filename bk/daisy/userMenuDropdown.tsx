"use client"
import React, { useState, useRef } from "react"
import Link from "next/link"
import { User, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
// Components
import { supabaseClient } from "@/lib/supabase/client"
// Constants
import { pageRoutes } from "@/components/constants";
// Hooks
import { useMobile } from "@/hooks/useMobile"
import { useClickOutside } from "@/hooks/useClickOutside"

interface UserMenuDropdownProps {
    displayUserName: string;
    userIconSrc?: string | null;
}

/**
 * ユーザーメニュードロップダウンコンポーネント
 * 
 * プロフィール管理、設定、ログアウト機能を提供します。
 */
export function UserMenuDropdown({
    displayUserName,
    userIconSrc,
}: UserMenuDropdownProps) {
    const router = useRouter()
    const isMobile = useMobile();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    const onClickLogout = async () => {
        // === Supabase Auth ログアウト ===
        const { error } = await supabaseClient.auth.signOut()
        if (error) {
            console.error('Supabase sign out failed:', error)
            // 失敗しても、Cookieクリアとリダイレクトは続行し、セキュリティを優先
        }
        router.push(pageRoutes.AUTH.LOGIN)
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* トリガーボタン */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-9 w-9 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden shadow-sm outline-none ${isOpen
                    ? "border-primary shadow-md text-primary"
                    : "border-white bg-gray-200 hover:opacity-80"
                    }`}
            >
                {userIconSrc ? (
                    <img src={userIconSrc} alt={displayUserName} className="w-full h-full object-cover" />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center font-black text-[10px] uppercase ${isOpen ? "bg-primary/10" : "bg-primary text-primary-content"
                        }`}>
                        {displayUserName.charAt(0)}
                    </div>
                )}
            </button>

            {/* ドロップダウンコンテンツ */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {/* ユーザー名ヘッダー */}
                    <div className="px-4 pt-4 pb-3 border-b border-gray-200">
                        <p className="font-black text-neutral truncate leading-none mb-1">{displayUserName}</p>
                        <p className="text-xs mt-2 font-bold text-secondary uppercase tracking-widest leading-none">管理者</p>
                    </div>

                    <div className="py-1.5 px-1.5">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-neutral rounded-xl transition-all group"
                        >
                            <User className="h-4 w-4 text-secondary group-hover:text-primary transition-colors" />
                            <span>プロフィール</span>
                        </Link>
                        <Link
                            href="/setting"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-neutral rounded-xl transition-all group"
                        >
                            <Settings className="h-4 w-4 text-secondary group-hover:text-primary transition-colors" />
                            <span>アプリ設定</span>
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 py-1.5 px-1.5">
                        <button
                            onClick={onClickLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-error hover:bg-error/10 rounded-xl transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>ログアウト</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
