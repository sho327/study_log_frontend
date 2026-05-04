"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type TaskStatus = 'in_progress' | 'done' | 'todo';
type TaskPriority = 'high' | 'medium' | 'low';

interface User {
    id: string;
    display_name: string;
    avatar_url: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    status_label: string;
    priority: TaskPriority;
    priority_label: string;
    start_date: string | null;
    end_date: string | null;
    man_hours: number | null;
    created_at: string;
    updated_at: string;
    main_assignee: User;
    sub_assignees: User[];
    reviewer: User;
}

const sampleTask: Task = {
    id: 'TASK-101',
    title: '学祭公式サイトのDB設計とAPI構成案の作成',
    description: 'Supabaseを利用した認証フローと、タスク管理用のテーブル設計を行う。\n特にRLS（Row Level Security）のポリシー設定について、ゼミ生が自分のデータのみ編集できるような構成を重点的に検討すること。',
    status: 'in_progress',
    status_label: '進行中',
    priority: 'high',
    priority_label: '高',
    start_date: '2026/01/10',
    end_date: '2026/02/10',
    man_hours: 12.5,
    created_at: '2026/01/05 10:00',
    updated_at: '2026/01/22 20:30',
    main_assignee: { id: 'u1', display_name: '田中 健太', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta' },
    sub_assignees: [
        { id: 'u2', display_name: '鈴木 アリス', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
        { id: 'u3', display_name: '高橋 拓海', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Takumi' }
    ],
    reviewer: { id: 'u4', display_name: '佐藤 翔太', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato' }
};

export default function TaskDetail({ projectId, taskId }: { projectId: string, taskId: string }) {
    // TODO: taskId を使ってAPIからタスク詳細を取得する
    const task = sampleTask;

    const getPriorityClass = (priority: TaskPriority) => {
        switch (priority) {
            case 'high': return 'bg-error/10 text-error';
            case 'medium': return 'bg-warning/10 text-warning';
            default: return 'bg-secondary/10 text-secondary';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
            <div className="max-w-5xl mx-auto w-full">
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-2">
                        <Button variant="ghost" className="btn-sm text-[10px] font-black text-secondary">削除</Button>
                        <Button variant="primary" className="btn-sm px-6 rounded-xl text-white font-black border-none shadow-lg shadow-primary/20">編集する</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* メインエリア */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[10px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded tracking-widest">
                                    {task.status_label}
                                </span>
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded tracking-widest ${getPriorityClass(task.priority)}`}>
                                    優先度：{task.priority_label}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-neutral leading-tight mb-10">
                                {task.title}
                            </h1>

                            <div className="grid grid-cols-3 gap-6 mb-12 pb-10 border-b border-gray-50">
                                <div>
                                    <label className="label-jp block mb-2 text-secondary">開始日</label>
                                    <span className="text-sm font-black text-gray-700">{task.start_date || '未設定'}</span>
                                </div>
                                <div>
                                    <label className="label-jp block mb-2 text-secondary">完了期限</label>
                                    <span className="text-sm font-black text-error">{task.end_date || '未設定'}</span>
                                </div>
                                <div>
                                    <label className="label-jp block mb-2 text-secondary">予定工数</label>
                                    <span className="text-sm font-black text-gray-700">{task.man_hours ? `${task.man_hours}h` : '--'}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="label-jp block text-secondary">タスク詳細</label>
                                <div className="description-text text-[15px] text-gray-700 font-medium whitespace-pre-wrap pl-1">
                                    {task.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* サイドエリア */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-7 shadow-sm">
                            <h3 className="label-jp mb-6 px-1">担当メンバー</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[9px] font-black text-primary mb-3 block opacity-80 uppercase tracking-tighter">Main Assignee</label>
                                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                        <img src={task.main_assignee.avatar_url} className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100" alt={task.main_assignee.display_name} />
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-neutral truncate">{task.main_assignee.display_name}</p>
                                            <p className="text-[10px] font-bold text-secondary">主担当者</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] font-black text-secondary mb-3 block uppercase tracking-tighter">Sub Assignees</label>
                                    <div className="flex flex-wrap gap-2">
                                        {task.sub_assignees.map(sub => (
                                            <div key={sub.id} className="flex items-center gap-2 bg-white border border-gray-100 pr-3 py-1.5 pl-1.5 rounded-full shadow-sm hover:border-primary/30 transition-all cursor-default">
                                                <img src={sub.avatar_url} className="w-6 h-6 rounded-full" alt={sub.display_name} />
                                                <span className="text-[11px] font-bold">{sub.display_name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="divider opacity-50"></div>

                                <div>
                                    <label className="text-[9px] font-black text-warning mb-3 block uppercase tracking-tighter">Reviewer</label>
                                    <div className="flex items-center gap-3 px-1">
                                        <img src={task.reviewer.avatar_url} className="w-8 h-8 rounded-full grayscale opacity-60 border border-gray-200" alt={task.reviewer.display_name} />
                                        <span className="text-xs font-black text-gray-500">{task.reviewer.display_name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="label-jp">作成日時</span>
                                <span className="text-[10px] font-bold text-secondary">{task.created_at}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="label-jp">最終更新</span>
                                <span className="text-[10px] font-bold text-secondary">{task.updated_at}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
