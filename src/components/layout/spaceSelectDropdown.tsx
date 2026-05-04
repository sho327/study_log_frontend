"use client";

import React, { useState, useRef } from "react";
import { ChevronDown, Plus, Check } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMobile } from "@/hooks/useMobile";
import type { Space } from "@/store";

interface SpaceSelectDropdownProps {
    activeSpace: Space;
    spaces: Space[];
    onSelectSpace: (space: Space) => void;
    /**
     * トリガーボタンの幅を上書きしたい場合に指定します（例: "w-full"）
     */
    triggerWidthClassName?: string;
    /**
     * ドロップダウンの幅を上書きしたい場合に指定します（例: "w-full"）
     */
    dropdownWidthClassName?: string;
}

/**
 * スペース選択ドロップダウンコンポーネント
 * 
 * 現在選択中のスペースの表示、スペースの切り替え、新しいスペースの作成機能を提供します。
 */
export function SpaceSelectDropdown({
    activeSpace,
    spaces,
    onSelectSpace,
    triggerWidthClassName,
    dropdownWidthClassName,
}: SpaceSelectDropdownProps) {
    const isMobile = useMobile();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    const handleSelectSpace = (space: Space) => {
        onSelectSpace(space);
        setIsOpen(false);
    };

    const onClickCreateSpace = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("スペース新規作成ボタンが押下されました");
    };

    const triggerWidth = triggerWidthClassName ?? (isMobile ? "w-40" : "w-56");
    const dropdownWidth = dropdownWidthClassName ?? "w-64";

    return (
        <div className="relative" ref={containerRef}>
            {/* トリガーボタン */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 h-10 transition-all rounded-lg border px-3 outline-none ${triggerWidth} ${isOpen
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
            >
                <div className="flex flex-1 items-center gap-2 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className={`truncate text-[15px] font-bold text-left ${isOpen ? "text-neutral" : ""}`}>
                        {activeSpace.name}
                    </span>
                </div>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 text-secondary ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>

            {/* ドロップダウンコンテンツ */}
            {isOpen && (
                <div className={`absolute top-full left-0 mt-2 ${dropdownWidth} bg-white border border-gray-100 rounded-xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-100`}>
                    {/* ヘッダー */}
                    <div className="px-4 py-3 border-b border-gray-200">
                        <span className="text-sm font-black text-neutral uppercase tracking-widest">スペースを選択</span>
                    </div>

                    <div className="py-1 max-h-80 overflow-y-auto no-scrollbar">
                        {spaces.map((space) => (
                            <button
                                key={space.id}
                                onClick={() => handleSelectSpace(space)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-[15px] transition-colors ${space.id === activeSpace?.id
                                    ? "bg-primary/10 text-primary font-bold"
                                    : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${space.id === activeSpace.id ? "bg-primary" : "bg-gray-200"}`} />
                                    <span className="text-sm truncate">{space.name}</span>
                                </div>
                                {space.id === activeSpace.id && (
                                    <Check className="h-4 w-4 shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 p-1.5">
                        <button
                            onClick={onClickCreateSpace}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-primary rounded-lg transition-colors group"
                        >
                            <div className="w-5 h-5 rounded-md bg-gray-100 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center transition-colors">
                                <Plus className="h-3 w-3" />
                            </div>
                            <span className="text-sm">新しいスペースを作成</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
