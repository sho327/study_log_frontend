"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { pageRoutes } from "@/components/constants";
import { Button } from "@/components/ui/button";

type NotificationType = 'task' | 'info' | 'schedule' | 'file';

type NotificationDetailProps = {
    notification: {
        id: number;
        type: NotificationType;
        title: string;
        body: string;
        date: string;
        isUnread: boolean;
    };
};

export default function NotificationDetail({ notification }: NotificationDetailProps) {
    const getBadgeInfo = (type: NotificationType) => {
        switch (type) {
            case 'task': return { class: 'bg-error text-error-content', label: 'タスク', action: 'タスク詳細を見る' };
            case 'info': return { class: 'bg-info text-info-content', label: 'お知らせ', action: 'リンクを開く' };
            case 'schedule': return { class: 'bg-primary text-primary-content', label: '予定', action: 'カレンダーで確認' };
            case 'file': return { class: 'bg-warning text-warning-content', label: 'ファイル', action: 'ファイルを開く' };
            default: return { class: 'bg-secondary text-secondary-content', label: 'その他', action: '詳細を見る' };
        }
    };

    const info = getBadgeInfo(notification.type);

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="w-100 sm:w-[85%] sm:mx-auto">
                <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${info.class}`}>
                            {info.label}
                        </span>
                        <span className="text-sm font-bold text-secondary tracking-wider font-mono">{notification.date}</span>
                    </div>

                    <h2 className="text-lg font-black text-neutral leading-tight tracking-tight">
                        {notification.title}
                    </h2>

                    <div className="divider opacity-50 my-2 sm:my-3"></div>

                    <div className="leading-relaxed space-y-4 text-sm">
                        {notification.body.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-3">
                        <Link
                            href={pageRoutes.MAIN.NOTIFICATION_LIST}
                            className="flex-1 sm:flex-none"
                        >
                            <Button
                                variant="ghost"
                                className="flex-1 sm:flex-none !h-11 !min-h-11"
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                                一覧に戻る
                            </Button>
                        </Link>
                        <Button
                            variant="primary"
                            onClick={() => console.log("Action:", info.action, notification)}
                            className="flex-1 sm:flex-none !h-11 !min-h-11"
                        >
                            {info.action}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
