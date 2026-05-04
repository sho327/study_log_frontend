"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

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

    const getStatusClass = (status: TaskStatus) => {
        switch (status) {
            case "done":
                return "bg-secondary/10 text-secondary";
            case "todo":
                return "bg-warning/10 text-warning";
            default:
                return "bg-primary/10 text-primary";
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight truncate">タスク詳細</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold truncate">
                        {/* {projectId} / {taskId} */}
                        Unimoaアプリケーション/デザイン作成 / #UNIMOA-101
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="btn-sm text-error hover:bg-error/10 font-bold gap-1 px-3 rounded-lg transition-all"
                    >
                        削除
                    </Button>
                    <Button variant="primary" className="flex-1 sm:flex-none !h-11 !min-h-11">
                        編集する
                    </Button>
                </div>
            </div>

            <Card>
                <CardBody className="p-6 sm:p-8">
                    <div className="space-y-8">
                        {/* ステータス・優先度 */}
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-md uppercase ${getStatusClass(task.status)}`}>
                                {task.status_label}
                            </span>
                            <span className={`text-xs font-black px-2 py-0.5 rounded-md uppercase ${getPriorityClass(task.priority)}`}>
                                優先度:{task.priority_label}
                            </span>
                            <span className="ml-auto text-xs font-black text-secondary tracking-tighter uppercase">
                                #{task.id}
                            </span>
                        </div>

                        {/* タイトル */}
                        <h2 className="text-lg sm:text-xl font-black text-neutral leading-tight tracking-tight">
                            {task.title}
                        </h2>

                        {/* 日付・工数 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-gray-200">
                            <div>
                                <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                    開始日
                                </p>
                                <p className="text-sm font-bold text-neutral">
                                    {task.start_date || "未設定"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                    完了期限
                                </p>
                                <p className={`text-sm font-bold ${task.end_date ? "text-error" : "text-neutral"}`}>
                                    {task.end_date || "未設定"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                    予定工数
                                </p>
                                <p className="text-sm font-bold text-neutral">
                                    {task.man_hours ? `${task.man_hours}h` : "--"}
                                </p>
                            </div>
                        </div>

                        {/* タスク詳細 */}
                        <section className="space-y-3">
                            <h4 className="text-xs font-black text-secondary uppercase tracking-widest">
                                タスク詳細
                            </h4>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {task.description}
                            </p>
                        </section>

                        {/* 担当メンバー */}
                        <section className="space-y-4 pt-6 border-t border-gray-200">
                            <h4 className="text-xs font-black text-secondary uppercase tracking-widest">
                                担当メンバー
                            </h4>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-4">
                                    <div>
                                        <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                            主担当
                                        </p>
                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 rounded-full bg-white overflow-hidden border border-gray-200">
                                                <img
                                                    src={task.main_assignee.avatar_url}
                                                    alt={task.main_assignee.display_name}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-neutral truncate">
                                                    {task.main_assignee.display_name}
                                                </p>
                                                <p className="text-xs font-bold text-secondary">
                                                    主担当者
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                            副担当
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {task.sub_assignees.map((sub) => (
                                                <div
                                                    key={sub.id}
                                                    className="flex items-center gap-2 bg-white border border-gray-200 pr-3 py-1.5 pl-1.5 rounded-full"
                                                >
                                                    <img src={sub.avatar_url} className="w-6 h-6 rounded-full" alt={sub.display_name} />
                                                    <span className="text-xs font-bold">
                                                        {sub.display_name}
                                                    </span>
                                                </div>
                                            ))}
                                            {task.sub_assignees.length === 0 && (
                                                <span className="text-sm text-gray-500 font-bold">
                                                    未設定
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-2">
                                        レビュアー
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                            <img
                                                src={task.reviewer.avatar_url}
                                                alt={task.reviewer.display_name}
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-neutral">
                                            {task.reviewer.display_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 作成・更新 */}
                        <div className="pt-6 border-t border-gray-200 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                                <span className="text-xs font-black text-secondary uppercase tracking-widest">作成日時</span>
                                <span className="text-sm font-bold text-gray-500">{task.created_at}</span>
                            </div>
                            <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                                <span className="text-xs font-black text-secondary uppercase tracking-widest">最終更新</span>
                                <span className="text-sm font-bold text-gray-500">{task.updated_at}</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </main>
    );
}
