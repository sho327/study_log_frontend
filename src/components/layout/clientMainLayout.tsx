"use client";

import Sidebar from "@/components/layout/sidebar";
import { useMobile } from "@/hooks/useMobile";
import AppHeader from "./appHeader";
import SearchBar from "./searchBar";
import { useAppStore } from "@/store";

export default function ClientMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useMobile();
    const { activeSpace } = useAppStore();

    return (
        <div className="h-screen flex flex-col relative">
            <AppHeader />

            {/* コンテンツエリア (Sidebar と Children) */}
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
                    {/* メインエリアの上部バー (各ページ共通) */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0 z-[100] flex items-center justify-between min-h-[56px] shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col min-w-0 min-h-[40px] justify-center px-1">
                                <span className="text-primary text-[12px] font-black uppercase tracking-widest leading-none mb-1">
                                    スペース
                                </span>
                                <h2 className="text-[15px] font-black truncate text-neutral max-w-[150px] sm:max-w-xs">
                                    {activeSpace.name}
                                </h2>
                            </div>
                        </div>

                        {/* 検索バー */}
                        <SearchBar />
                    </div>

                    {/* children は Dashboard や Members 等のコンテンツ */}
                    {children}
                </div>
            </div>
        </div>
    );
}
