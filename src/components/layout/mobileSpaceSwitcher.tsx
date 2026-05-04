"use client";

import React, { useState, useRef } from "react";
import { Check, Plus } from "lucide-react";
import { useAppStore } from "@/store";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMobile } from "@/hooks/useMobile";

export default function MobileSpaceSwitcher() {
    const isMobile = useMobile();
    const { activeSpace, setActiveSpace, spaces, mobileMenuOpen: sidebarMobileMenuOpen } = useAppStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setMobileMenuOpen(false), mobileMenuOpen);

    // スマホのサイドバーが開いている間は、下部固定UIを消して重複を防ぐ
    if (!isMobile || sidebarMobileMenuOpen) return null;

    const handleSelectSpace = (space: any) => {
        setActiveSpace(space);
        setMobileMenuOpen(false);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[100]" ref={containerRef}>
            <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 px-2 py-1 flex-1 min-w-0">
                    <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-black text-[11px] shrink-0 shadow-sm border border-white/20">
                        {activeSpace.name.substring(0, 2)}
                    </div>
                    <span className="font-bold text-sm text-neutral truncate tracking-tight">{activeSpace.name}</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`px-4 py-2 text-[12px] font-black rounded-xl transition-all ${mobileMenuOpen ? "bg-primary text-white" : "text-primary bg-primary/10"
                            }`}
                    >
                        切替
                    </button>

                    {mobileMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[210] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                                <span className="text-[10px] font-black text-secondary uppercase tracking-widest leading-none">スペースを選択</span>
                            </div>
                            <ul className="py-1 max-h-[40vh] overflow-y-auto no-scrollbar">
                                {spaces.map((space) => (
                                    <li key={space.id}>
                                        <button
                                            onClick={() => handleSelectSpace(space)}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between transition-colors ${space.id === activeSpace.id ? "text-primary bg-primary/5 font-bold" : "font-bold"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`w-2 h-2 rounded-full shrink-0 ${space.id === activeSpace.id ? "bg-primary" : "bg-gray-200"}`} />
                                                <span className="text-sm truncate">{space.name}</span>
                                            </div>
                                            {space.id === activeSpace.id && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-100 p-2">
                                <button className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-all group">
                                    <div className="w-5 h-5 rounded-md bg-gray-100 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-xs font-bold group-hover:text-primary transition-colors">新しいスペースを作成</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
