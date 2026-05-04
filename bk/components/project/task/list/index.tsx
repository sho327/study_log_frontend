"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Calendar, Clock, LayoutGrid, Table2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation"
import { pageRoutes } from "@/components/constants"

type TaskStatus = "todo" | "done";
type TaskPriority = "高" | "中" | "低";
type TaskListViewMode = "card" | "table";
type TaskStatusFilter = "all" | TaskStatus;
type TaskSort = "newest" | "due";

interface Member {
    id: string;
    name: string;
    avatar: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    mainAssignee: string;
    reviewer: string;
    endDate: string;
    manHours: string;
    createdAt: number;
}

// --- ダミーデータ (実際にはAPIから取得) ---
const PROJECT_MEMBERS: Member[] = [
    { id: 'u1', name: '田中 太郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanaka' },
    { id: 'u2', name: '佐藤 花子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato' },
    { id: 'u3', name: '鈴木 一郎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suzuki' },
    { id: 'u4', name: '高橋 教授', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prof' },
];

const INITIAL_TASKS: Task[] = [
    { id: '101', title: '学祭サイトのDB設計・API構成案の作成', description: 'Supabaseを利用した認証フローと、タスク管理用のテーブル設計を行う。', status: 'todo', priority: '高', mainAssignee: 'u1', reviewer: 'u4', endDate: '2025-12-20', manHours: '8.0h', createdAt: Date.parse('2025-12-03') },
    { id: '102', title: 'メインビジュアルのラフ制作と素材選定', description: 'デザインゼミの雰囲気が伝わるような明るい色調の素材を選定。', status: 'todo', priority: '中', mainAssignee: 'u2', reviewer: 'u1', endDate: '2025-12-22', manHours: '4.5h', createdAt: Date.parse('2025-12-02') },
    { id: '103', title: 'ロゴデザインの最終確認', description: 'ベクターデータでの納品。カラーバリエーションも含める。', status: 'done', priority: '低', mainAssignee: 'u3', reviewer: 'u1', endDate: '2025-11-30', manHours: '2.0h', createdAt: Date.parse('2025-12-01') }
];

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [viewMode, setViewMode] = useState<TaskListViewMode>("card");
    const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("todo");
    const [sort, setSort] = useState<TaskSort>("due");
    const router = useRouter();

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
        if (selectedTask && selectedTask.id === id) {
            setSelectedTask(prev => prev ? { ...prev, ...updates } : null);
        }
    };

    const getMember = (id: string): Member => PROJECT_MEMBERS.find(m => m.id === id) || { id: 'unknown', name: 'Unknown', avatar: '' };

    const displayedTasks = useMemo(() => {
        let result = [...tasks];

        if (statusFilter !== "all") {
            result = result.filter(t => t.status === statusFilter);
        }

        if (sort === "newest") {
            result.sort((a, b) => b.createdAt - a.createdAt);
        } else {
            // 期限が未設定の場合は末尾に寄せる
            result.sort((a, b) => {
                const aTime = Date.parse(a.endDate);
                const bTime = Date.parse(b.endDate);
                const aValid = Number.isFinite(aTime);
                const bValid = Number.isFinite(bTime);
                if (!aValid && !bValid) return 0;
                if (!aValid) return 1;
                if (!bValid) return -1;
                return aTime - bTime;
            });
        }

        return result;
    }, [tasks, statusFilter, sort]);

    const countTodo = useMemo(() => tasks.filter(t => t.status === "todo").length, [tasks]);
    const countDone = useMemo(() => tasks.filter(t => t.status === "done").length, [tasks]);

    const getPriorityClass = (priority: TaskPriority) => {
        switch (priority) {
            case '高': return 'bg-error/10 text-error';
            case '中': return 'bg-warning/10 text-warning';
            default: return 'bg-secondary/10 text-secondary';
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-center mb-2 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">タスク</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">現在進行中のタスク一覧</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                        onClick={() => router.push(`${pageRoutes.PROJECT.TASK.SAVE}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        新規作成
                    </Button>
                </div>
            </div>
            {/* プロジェクト一覧と同じ「余白・横幅感」に揃える */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-baseline gap-2">
                        {/* <span className="text-sm font-black text-secondary uppercase tracking-widest">タスク</span> */}
                        <span className="text-sm font-bold text-secondary">
                            {statusFilter === "all" ? `全 ${tasks.length}件` : statusFilter === "todo" ? `進行中 ${countTodo}件` : `完了 ${countDone}件`}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* 表示形式切替 */}
                        <div className="join">
                            <button
                                type="button"
                                className={`btn btn-sm join-item ${viewMode === "card" ? "btn-primary text-white" : "btn-ghost"}`}
                                onClick={() => setViewMode("card")}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                カード
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm join-item ${viewMode === "table" ? "btn-primary text-white" : "btn-ghost"}`}
                                onClick={() => setViewMode("table")}
                            >
                                <Table2 className="w-4 h-4" />
                                テーブル
                            </button>
                        </div>

                        {/* 表示対象切替 */}
                        <select
                            className="select select-sm select-bordered font-bold text-sm rounded-lg bg-white"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as TaskStatusFilter)}
                        >
                            <option value="todo">進行中</option>
                            <option value="done">完了</option>
                            <option value="all">すべて</option>
                        </select>

                        {/* 並び順切替 */}
                        <select
                            className="select select-sm select-bordered font-bold text-sm rounded-lg bg-white"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as TaskSort)}
                        >
                            <option value="newest">新着順</option>
                            <option value="due">期限順</option>
                        </select>
                    </div>
                </div>

                {/* 一覧 */}
                {viewMode === "card" ? (
                    <div className="flex flex-col gap-2">
                        {displayedTasks.map(task => (
                            <div
                                key={task.id}
                                onClick={() => setSelectedTask(task)}
                                className={`group bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer ${task.status === 'done' ? 'opacity-60' : ''} ${selectedTask?.id === task.id ? 'ring-2 ring-primary' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.status === 'done'}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' });
                                    }}
                                    className="checkbox checkbox-primary checkbox-sm rounded-md border-gray-300 shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black text-secondary tracking-tighter uppercase">#{task.id}</span>
                                        <span className={`text-xs font-black px-2 py-0.5 rounded tracking-wider ${getPriorityClass(task.priority)}`}>優先度:{task.priority}</span>
                                    </div>
                                    <h3 className={`text-base font-bold text-neutral truncate leading-tight group-hover:text-primary transition-colors ${task.status === 'done' ? 'line-through text-secondary' : ''}`}>
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-2 text-secondary">
                                        <span className="text-xs font-medium shrink-0">
                                            {task.endDate.replace('2025-', '').replace('-', '/')}
                                        </span>
                                        <span className="text-xs font-bold italic border-l border-gray-100 pl-4">{task.manHours}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 border-l border-gray-200 pl-4">
                                    <div className="avatar">
                                        <div className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white">
                                            <Image src={getMember(task.mainAssignee).avatar} alt={getMember(task.mainAssignee).name} width={32} height={32} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table
                                // className="table-zebra table-sm"
                                className="table-zebra"
                            >
                                <TableHead className="bg-gray-50">
                                    <TableRow className="text-sm font-black text-secondary uppercase tracking-widest">
                                        <TableHeader className="w-12"></TableHeader>
                                        <TableHeader>タスク</TableHeader>
                                        <TableHeader className="w-32 whitespace-nowrap">期限</TableHeader>
                                        <TableHeader className="w-28 whitespace-nowrap">工数</TableHeader>
                                        <TableHeader className="w-24 whitespace-nowrap">担当</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedTasks.map((task) => (
                                        <TableRow
                                            key={task.id}
                                            onClick={() => setSelectedTask(task)}
                                            className={`cursor-pointer hover ${task.status === "done" ? "opacity-60" : ""}`}
                                        >
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={task.status === "done"}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' });
                                                    }}
                                                    className="checkbox checkbox-primary checkbox-sm rounded-md border-gray-300"
                                                />
                                            </TableCell>
                                            <TableCell className="min-w-[280px]">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-black text-secondary tracking-tighter uppercase">#{task.id}</span>
                                                        <span className={`text-xs font-black px-2 py-0.5 rounded tracking-wider ${getPriorityClass(task.priority)}`}>
                                                            優先度:{task.priority}
                                                        </span>
                                                    </div>
                                                    <span className={`text-base font-bold text-neutral truncate ${task.status === "done" ? "line-through text-secondary" : ""}`}>
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-gray-500 whitespace-nowrap">
                                                {task.endDate.replace('2025-', '').replace('-', '/')}
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-gray-500 italic whitespace-nowrap">
                                                {task.manHours}
                                            </TableCell>
                                            <TableCell>
                                                <div className="avatar">
                                                    <div className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white">
                                                        <Image src={getMember(task.mainAssignee).avatar} alt={getMember(task.mainAssignee).name} width={32} height={32} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>

            {/* タスク詳細モーダル */}
            <Modal
                open={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                title="タスク詳細"
                maxWidthClassName="max-w-2xl"
            >
                {selectedTask && (
                    <>
                        <div className="p-6 flex flex-col gap-8">
                            {/* タイトル & 説明 */}
                            <section className="flex flex-col gap-3">
                                <input className="text-xl font-black text-neutral outline-none focus:text-primary transition-colors w-full bg-transparent"
                                    value={selectedTask.title} onChange={(e) => updateTask(selectedTask.id, { title: e.target.value })} />
                                <textarea className="textarea textarea-ghost p-0 min-h-[100px] text-[14px] leading-relaxed outline-none focus:bg-transparent resize-none"
                                    placeholder="タスクの詳細を入力..." value={selectedTask.description}
                                    onChange={(e) => updateTask(selectedTask.id, { description: e.target.value })} />
                            </section>

                            {/* ステータス & 優先度 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Status</label>
                                    <select className="select select-sm select-bordered font-bold text-xs rounded-lg" value={selectedTask.status} onChange={(e) => updateTask(selectedTask.id, { status: e.target.value as TaskStatus })}>
                                        <option value="todo">進行中</option>
                                        <option value="done">完了</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Priority</label>
                                    <select className="select select-sm select-bordered font-bold text-xs rounded-lg" value={selectedTask.priority} onChange={(e) => updateTask(selectedTask.id, { priority: e.target.value as TaskPriority })}>
                                        <option value="高">優先度：高</option>
                                        <option value="中">優先度：中</option>
                                        <option value="低">優先度：低</option>
                                    </select>
                                </div>
                            </div>

                            {/* 担当者 */}
                            <section className="flex flex-col gap-4">
                                <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Assignees</label>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar w-8 h-8 rounded-full overflow-hidden">
                                                <Image src={getMember(selectedTask.mainAssignee).avatar} alt={getMember(selectedTask.mainAssignee).name} width={32} height={32} />
                                            </div>
                                            <span className="text-[13px] font-bold">{getMember(selectedTask.mainAssignee).name}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-primary uppercase bg-primary/10 px-2 py-1 rounded">主担当</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {PROJECT_MEMBERS.map(member => (
                                            <button key={member.id} onClick={() => updateTask(selectedTask.id, { mainAssignee: member.id })}
                                                className={`avatar transition-opacity ${selectedTask.mainAssignee === member.id ? 'ring-2 ring-primary ring-offset-2 rounded-full' : 'opacity-40 hover:opacity-100'}`}>
                                                <div className="w-8 h-8 rounded-full">
                                                    <Image src={member.avatar} title={member.name} alt={member.name} width={32} height={32} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 期限 & 工数 */}
                            <section className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-[12px] font-bold">期限日</span>
                                    </div>
                                    <input type="date" className="text-[13px] font-bold text-neutral outline-none bg-transparent" value={selectedTask.endDate} onChange={(e) => updateTask(selectedTask.id, { endDate: e.target.value })} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-[12px] font-bold">見積工数</span>
                                    </div>
                                    <input className="text-[13px] font-bold text-neutral w-16 text-right outline-none focus:text-primary bg-transparent" value={selectedTask.manHours} onChange={(e) => updateTask(selectedTask.id, { manHours: e.target.value })} />
                                </div>
                            </section>
                        </div>

                        {/* モーダルフッター */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex gap-2 shrink-0">
                            <Button variant="primary" className="flex-1 font-black text-xs uppercase tracking-widest shadow-md" onClick={() => setSelectedTask(null)}>
                                保存して閉じる
                            </Button>
                            <Button variant="ghost" className="text-error btn-square">
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </main>
    );
}