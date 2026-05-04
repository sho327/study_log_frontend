"use client";

import React, { useRef } from "react";
import { useAppStore } from "@/store";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function SearchBar() {
    const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
    const searchRef = useRef<HTMLDivElement>(null);

    useClickOutside(searchRef, () => setSearchOpen(false), searchOpen);

    return (
        <div className="flex items-center max-w-full" ref={searchRef}>
            <div
                className={`flex items-center rounded-full transition-all duration-300 px-1 ${searchOpen
                    ? "w-40 max-w-[60vw] sm:w-64 sm:max-w-none bg-white border border-gray-200 shadow-sm"
                    : "w-10 bg-transparent"
                    }`}
            >
                <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {searchOpen && (
                    <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setSearchOpen(false);
                                setSearchQuery("");
                            }
                        }}
                        className="bg-transparent border-none outline-none text-sm w-full px-1 h-8 text-neutral animate-in fade-in duration-200"
                        autoFocus
                    />
                )}
            </div>
        </div>
    );
}
