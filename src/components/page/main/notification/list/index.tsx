"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { pageRoutes } from "@/components/constants";

type NotificationType = 'task' | 'info' | 'schedule' | 'file';

type Notification = {
    id: number;
    type: NotificationType;
    title: string;
    body: string;
    date: string;
    isUnread: boolean;
};

export default function NotificationList() {
    const router = useRouter();
    const [notifs, setNotifs] = useState<Notification[]>([
        { id: 1, type: 'task', title: 'タスクの期限が近づいています', body: '「卒業研究の資料提出」の期限があと2時間で終了します。至急内容を確認し、提出ボタンを押してください。', date: '2024/05/20 10:30', isUnread: true },
        { id: 2, type: 'info', title: 'システムメンテナンスのお知らせ', body: '今週末の深夜2:00〜5:00の間、サーバーメンテナンスのため全サービスを停止いたします。', date: '2024/05/19 15:00', isUnread: false },
        { id: 3, type: 'schedule', title: '予定が変更されました', body: '田中教授とのゼミ会議の場所が「第3会議室」から「オンライン（Zoom）」に変更されました。', date: '2024/05/18 09:00', isUnread: true },
        { id: 4, type: 'file', title: 'ファイルが共有されました', body: '佐藤さんが「プロジェクト要件定義書_v2.pdf」をアップロードしました。', date: '2024/05/17 18:20', isUnread: false },
        { id: 5, type: 'task', title: '新しいコメントがあります', body: 'あなたが投稿した「デザイン案」に対して、リーダーから3件のフィードバックが届いています。', date: '2024/05/17 14:00', isUnread: false },
    ]);

    const getBadgeClass = (type: NotificationType) => {
        switch (type) {
            case 'task': return 'bg-error';
            case 'info': return 'bg-info';
            case 'schedule': return 'bg-primary';
            case 'file': return 'bg-warning';
            default: return 'bg-secondary';
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">お知らせ</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">通知・アナウンス一覧</p>
                </div>
                <button className="btn btn-ghost btn-xs sm:btn-sm text-primary font-bold hover:bg-primary/5">すべて既読</button>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {notifs.map((notif) => (
                    <div
                        key={notif.id}
                        onClick={() => router.push(`${pageRoutes.MAIN.NOTIFICATION_DETAIL}`)}
                        className="card rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="p-4 sm:p-4 flex items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0 ms-2.5 sm:ms-2">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <span className={`w-2 h-2 rounded-full ${getBadgeClass(notif.type)}`}></span>
                                    <span className="text-[12.5px] sm:text-[13px] font-black text-secondary uppercase tracking-widest">
                                        {notif.date}
                                    </span>
                                    {notif.isUnread && (
                                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[12.5px] sm:text-[13px] font-black">新着</span>
                                    )}
                                </div>
                                <h3 className={`truncate mb-1.5 ${notif.isUnread ? 'font-black text-neutral' : 'font-bold text-gray-500'}`}>
                                    {notif.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {notif.body}
                                </p>
                            </div>

                            <div className="shrink-0 flex items-center pt-1">
                                <div className="bg-gray-50 p-2 rounded-xl text-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
