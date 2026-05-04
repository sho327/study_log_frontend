"use client";

import React from "react";

export default function ClientAuthLayout({
    children,
    maxWidth = "380px",
}: {
    children: React.ReactNode;
    maxWidth?: string;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div
                className="w-full animate-in fade-in duration-700"
                style={{ maxWidth }}
            >
                {/* ロゴセクション */}
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="bg-primary text-primary-content w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <g transform="translate(3.5, 4) scale(0.7)">
                                <circle cx="9" cy="7" r="4" />
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M17 3.13a4 4 0 0 1 0 7.75" />
                            </g>
                        </svg>
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-neutral">
                        Unimoa
                    </span>
                </div>

                {/* 各ページのコンテンツ (AuthCard等) */}
                {children}
            </div>
        </div>
    );
}
