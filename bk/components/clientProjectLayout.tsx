"use client";

import React from "react";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { pageRoutes } from "@/components/constants"

export default function ClientProjectLayout({
    children,
    projectTitle = "Unimoaアプリケーション/デザイン作成",
}: {
    children: React.ReactNode;
    projectTitle?: string;
}) {
    const { activeSpace } = useAppStore();
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col relative">
            <AppHeader />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* プロジェクト上部バー */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center">
                                <span className="text-[12px] font-black text-primary/70 uppercase tracking-widest leading-none mb-1">
                                    {activeSpace.name}
                                </span>
                                <h2 className="text-[15px] font-black truncate text-neutral max-w-[150px] sm:max-w-xs">
                                    {projectTitle}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <SearchBar />
                    </div>

                    {/* メインエリア */}
                    {/* children 側で overflow-y-auto を効かせるため、ここは flex コンテナにして高さを渡す */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
