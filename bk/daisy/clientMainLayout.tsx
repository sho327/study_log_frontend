"use client";
// Components
import Sidebar from "@/components/layout/sidebar";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import { useAppStore } from "@/store";
import React, { useEffect } from "react";
// Types
import { currentUser } from '@/types/repository/common'
import { T_SpaceRow } from '@/types/supabase/space'
import { T_ProjectRow } from '@/types/supabase/project'

/**
 * メインレイアウトコンポーネント(クライアントコンポーネント)
 * @args
 * @createdBy KatoShogo
 * @createdAt 2026/01/26
 */
export default function ClientMainLayout({
    children,
    currentUser,
    activeSpace,
    activeProject,
}: {
    children: React.ReactNode;
    currentUser: currentUser | null
    activeSpace: T_SpaceRow | null
    activeProject: T_ProjectRow | null
}) {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const spaces = currentUser?.spaces || []
    const { mobileMenuOpen } = useAppStore();

    // モバイルメニューが開いている間、ボディのスクロールを禁止
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <div className="h-screen flex flex-col relative overflow-hidden">
            <AppHeader
                activeSpace={activeSpace}
                spaces={spaces}
            />

            {/* コンテンツエリア (Sidebar と Children) */}
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    activeSpace={activeSpace}
                    spaces={spaces}
                    activeProject={activeProject}
                />

                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* メインエリアの上部バー (各ページ共通) */}
                    <div className="bg-white border-b border-gray-100 px-4 shrink-0 z-[100] flex items-center justify-between min-h-[54px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center px-1">
                                <span className="text-primary text-[12px] font-black uppercase tracking-widest leading-none mb-1">
                                    {activeProject ? activeSpace?.display_name : 'スペース'}
                                </span>
                                <h2 className="text-[15px] font-black truncate text-neutral max-w-[150px] sm:max-w-xs">
                                    {activeProject ? activeProject.title : activeSpace?.display_name}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <SearchBar />
                    </div>
                    <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
