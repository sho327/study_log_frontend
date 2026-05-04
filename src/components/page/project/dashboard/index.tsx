"use client";

import React from 'react';

export default function ProjectDashboard() {
    return (
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10 transition-all duration-300">
            <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-secondary font-black uppercase tracking-widest bg-gray-50/20">
                <div className="flex flex-col items-center gap-4">
                    <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span>Project View Content (Tasks)</span>
                </div>
            </div>
        </main>
    );
}
