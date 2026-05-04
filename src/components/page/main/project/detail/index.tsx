"use client";

import React, { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import { ChevronLeft, Check, Users } from "lucide-react";
import { pageRoutes } from "@/components/constants";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

type ProjectDetailProps = {
    project: {
        id: string;
        title: string;
        category: string;
        description: string;
        leader: {
            id: string;
            name: string;
            university?: string;
            avatar?: string;
        };
        members: {
            id: string;
            name: string;
            univ: string;
            catch: string;
            tags: string[];
            avatar?: string;
        }[];
        requirements: string[];
        tags: string[];
    };
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div 
                // className="w-100 sm:w-[85%] sm:mx-auto"
                >
                <Card>
                    <CardBody className="p-6 sm:p-8">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
                                    {project.category}
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-black text-neutral leading-tight tracking-tight mb-4">
                                {project.title}
                            </h2>

                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                    <img
                                        src={project.leader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.leader.id}`}
                                        alt={project.leader.name}
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary font-black uppercase tracking-wider leading-none mb-1">
                                        プロジェクトリーダー
                                    </p>
                                    <p className="text-sm font-bold text-neutral">
                                        {project.leader.name}
                                        {project.leader.university && ` (${project.leader.university})`}
                                    </p>
                                </div>
                            </div>

                            {/* 参加メンバー数と一覧へのリンク */}
                            <div className="mb-8 pb-6 border-b border-gray-200">
                                <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-3">
                                    参加メンバー ({project.members.length}人)
                                </h4>
                                <div className="flex items-center gap-2">
                                    {project.members.slice(0, 5).map(member => (
                                        <div key={member.id} className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                            <img src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} />
                                        </div>
                                    ))}
                                    {project.members.length > 5 && <span className="text-sm text-gray-500">+{project.members.length - 5}</span>}
                                    <button onClick={() => setIsMembersModalOpen(true)} className="ml-auto text-sm font-bold text-primary hover:underline">
                                        参加者一覧を見る
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-3">
                                        プロジェクトについて
                                    </h4>
                                    <p className="text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </section>

                                {project.requirements && project.requirements.length > 0 && (
                                    <section>
                                        <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-3">
                                            募集要項・条件
                                        </h4>
                                        <ul className="space-y-3">
                                            {project.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-3 text-sm font-medium">
                                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {project.tags && project.tags.length > 0 && (
                                    <section>
                                        <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-3">
                                            使用ツール・タグ
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-gray-50 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-100"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                            <div className="mt-6 text-center gap-3">
                                <Link
                                    href={pageRoutes.MAIN.PROJECT_LIST}
                                    className="flex-1 sm:flex-none"
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full sm:w-auto h-12"
                                    >
                                        <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                                        一覧に戻る
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Modal
                open={isMembersModalOpen}
                onClose={() => setIsMembersModalOpen(false)}
                title={`参加メンバー (${project.members.length}人)`}
                maxWidthClassName="max-w-md"
            >
                <div className="max-h-[60vh] overflow-y-auto -mr-4 pr-4">
                    <div className="space-y-3">
                        {project.members.map(user => (
                            <div key={user.id} className="user-item rounded-xl p-3 sm:p-4 flex items-start gap-4 bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                <div className="shrink-0 mt-0.5">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                        <Image
                                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                            alt={user.name}
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                        <span className="font-bold text-neutral text-[15px]">{user.name}</span>
                                        <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1.5 py-0.5 rounded">{user.univ}</span>
                                    </div>
                                    <p className="text-[13px] leading-snug mb-2 truncate">{user.catch}</p>
                                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                                        {user.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] text-secondary font-medium">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </main>
    );
}
