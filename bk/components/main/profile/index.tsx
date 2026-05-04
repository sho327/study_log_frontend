"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Users } from "lucide-react";

const user = {
    name: '佐藤 健太',
    univ: '工学部 情報工学科 3年',
    catch: '学祭のWEBサイトを作ってくれる仲間を探してます！',
    bio: '普段はWeb制作サークルで活動しています。\nバックエンド（Rails）中心ですが、最近はReact / Next.jsを勉強中です。',
    tags: ['React', 'Next.js', 'Rails', 'TypeScript', 'Figma']
};

const userProjects = [
    {
        id: 'p1',
        title: '学祭公式サイト制作',
        category: 'Web制作',
        description: '2025年度の学園祭を盛り上げるための公式サイトを制作するプロジェクトです。Next.jsとSupabaseを使用します。',
        memberCount: 5,
    },
    {
        id: 'p2',
        title: '卒業制作: ARアプリ開発',
        category: 'アプリ開発',
        description: 'UnityとAR Foundationを使ったスマートフォン向けARアプリケーションの卒業制作プロジェクト。新しい表現に挑戦したいです。',
        memberCount: 3,
    }
];

const participatingProjects = [
    {
        id: 'p3',
        title: 'デザインゼミ ポートフォリオサイト',
        category: 'デザイン',
        description: '田中研究室の学生作品をまとめるポートフォリオサイトのデザインと実装。',
        memberCount: 8,
    },
    {
        id: 'p4',
        title: '学内ハッカソン運営',
        category: 'イベント運営',
        description: '冬休みに開催される学内ハッカソンの企画・運営メンバーを募集中です。',
        memberCount: 12,
    }];

export default function Profile() {
    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロフィール</h1>
                        <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">あなたの公開プロフィールです。</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* 左サイドバー */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card>
                            <CardBody className="text-center">
                                <div className="w-24 h-24 rounded-2xl bg-gray-100 border border-gray-200 mx-auto mb-4 overflow-hidden shadow-sm">
                                    <Image
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                        alt={user.name}
                                        width={96}
                                        height={96}
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-neutral">{user.name}</h2>
                                {/* <p className="text-xs text-primary font-bold mt-1 bg-primary/5 inline-block px-2 py-0.5 rounded">
                                    Webエンジニア
                                </p> */}
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
                                        Webエンジニア
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <Link href="/profile/edit">
                                        <Button variant="outline" className="w-full rounded-lg font-bold">
                                            プロフィールを編集
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-4">
                                    スキル・興味
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {user.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-gray-50 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-100"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* 右メインコンテンツ */}
                    <div className="lg:col-span-8 space-y-6">
                        <Card>
                            <CardBody className="sm:p-8">
                                <div>
                                    <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-2">
                                        詳細
                                    </h4>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {user.bio}
                                    </p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* 作成したプロジェクト一覧 */}
                        <Card>
                            <CardBody className="sm:p-8">
                                <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-4">
                                    作成したプロジェクト
                                </h4>
                                <div className="space-y-4">
                                    {userProjects.map(project => (
                                        <Link href="#" key={project.id} className="block border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{project.category}</span>
                                                    <h3 className="font-bold text-neutral mt-1">{project.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-1 text-secondary">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm font-bold">{project.memberCount}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{project.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* 参加しているプロジェクト一覧 */}
                        <Card>
                            <CardBody className="sm:p-8">
                                <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-4">
                                    参加中のプロジェクト
                                </h4>
                                <div className="space-y-4">
                                    {participatingProjects.map(project => (
                                        <Link href="#" key={project.id} className="block border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{project.category}</span>
                                                    <h3 className="font-bold text-neutral mt-1">{project.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-1 text-secondary">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm font-bold">{project.memberCount}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{project.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}