"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, Trophy, Megaphone, CheckCircle, FolderOpen, MoreHorizontal } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatTimestamp } from "@/utils/date";
import { pageRoutes } from "@/components/constants";

export type Notification = {
    id: string;
    type: "task" | "note" | "calendar" | "fileManagement";
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
};

interface NotificationDropdownProps {
    notifications: Notification[];
    unreadCount: number;
}

/**
 * お知らせドロップダウンコンポーネント
 * 
 * shadcn/ui のデザインを参考に、リッチなUIとインタラクションを提供します。
 */
export function NotificationDropdown({
    notifications,
    unreadCount,
}: NotificationDropdownProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    const getNotificationIcon = (type: Notification["type"]) => {
        switch (type) {
            case "task":
                return <Trophy className="h-5 w-5 text-amber-600" />;
            case "note":
                return <Megaphone className="h-5 w-5 text-blue-600" />;
            case "calendar":
                return <CheckCircle className="h-5 w-5 text-emerald-600" />;
            case "fileManagement":
                return <FolderOpen className="h-5 w-5 text-purple-600" />;
            default:
                return <Bell className="h-5 w-5 text-slate-600" />;
        }
    };

    const onClickNotificationItem = (notification: Notification) => {
        console.log("OnClickNotificationItem", notification);
        setIsOpen(false);
    };

    const onClickAllRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("OnClickAllRead");
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* トリガーボタン */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-200 ${isOpen ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-100"
                    }`}
            >
                <Bell className={`h-7 w-7 ${isOpen ? "fill-current" : ""}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-error text-[8px] font-black text-error-content border-[1.5px] border-white ring-error/10 ring-2">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {/* ドロップダウンコンテンツ */}
            {isOpen && (
                <div className="absolute -right-5 mt-3 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* ヘッダー */}
                    <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-black text-neutral tracking-tight">お知らせ</span>
                        {notifications.length > 0 && unreadCount > 0 && (
                            <button
                                onClick={onClickAllRead}
                                className="text-xs font-black text-primary hover:underline"
                            >
                                すべて既読にする
                            </button>
                        )}
                    </div>

                    {/* お知らせリスト */}
                    <div className={`${notifications.length === 0 ? "h-40" : "max-h-[400px]"} overflow-y-auto no-scrollbar`}>
                        {notifications.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="h-6 w-6 text-secondary" />
                                </div>
                                <p className="text-xs font-bold text-secondary">お知らせはありません</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => onClickNotificationItem(notification)}
                                        className={`group relative flex items-start gap-3 p-4 cursor-pointer transition-colors ${!notification.isRead ? "bg-blue-50/30 hover:bg-blue-50/60" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <p className={`text-sm leading-snug font-bold line-clamp-2 ${!notification.isRead ? "text-neutral" : "text-gray-500"}`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.isRead && (
                                                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-info ring-4 ring-info/10" />
                                                )}
                                            </div>
                                            <p className="text-xs leading-relaxed line-clamp-2 font-medium">
                                                {notification.description}
                                            </p>
                                            <p className="mt-2 text-[11px] text-secondary font-bold uppercase tracking-wider">
                                                {formatTimestamp(notification.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* フッター */}
                    {notifications.length > 0 && (
                        <div className="p-2 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    router.push(pageRoutes.MAIN.NOTIFICATION_LIST);
                                    setIsOpen(false);
                                }}
                                className="w-full py-2.5 text-center text-xs font-black hover:text-neutral hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center gap-1"
                            >
                                すべてのお知らせを見る
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
