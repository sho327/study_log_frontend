"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, MessageSquare, UserPlus, UserCheck } from "lucide-react";
import { FormInput } from "@/components/ui/formInput";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface User {
    id: number;
    name: string;
    univ: string;
    catch: string;
    tags: string[];
    isFollowing: boolean;
    bio: string;
}

const MOCK_USERS: User[] = [
    { id: 1, name: '佐藤 健太', univ: '工学部 3年', catch: '学祭のWEBサイトを作ってくれる仲間を探してます！', tags: ['React', 'Next.js', 'Node.js'], isFollowing: false, bio: '普段はWeb制作サークルで活動しています。バックエンドも少し触れます。冬休み中にJavaScriptのハッカソンに出たいので、興味ある人連絡ください！' },
    { id: 2, name: '田中 美咲', univ: 'デザイン学部 2年', catch: 'UI/UXの勉強会を月1で主催しています。興味ある方ぜひ！', tags: ['Figma', 'UI/UX', 'Illustrator'], isFollowing: true, bio: 'デザインの力で使いにくいものを解消するのが好きです。最近はAdobe XDからFigmaに完全移行しました。デザイン初心者の方も大歓迎です！' },
    { id: 3, name: '鈴木 一郎', univ: '経済学部 4年', catch: 'データサイエンスと起業に関心。気軽にお話ししましょう。', tags: ['Python', 'SQL', 'Tableau'], isFollowing: false, bio: 'マーケティングにおけるデータ活用を研究しています。将来はスタートアップでのキャリアを考えています。趣味はサウナです。' },
    { id: 4, name: '高橋 結衣', univ: '文学部 1年', catch: 'プログラミング初心者です。冬休みにサービスを作りたい。', tags: ['Web', 'HTML', 'CSS'], isFollowing: false, bio: '大学に入ってからITに興味を持ちました。今はドットインストールやProgateで学習中です。一緒に教え合える友達を募集中です！' },
    { id: 5, name: '山田 太郎', univ: '情報科学部 2年', catch: 'AI/機械学習に興味があります。一緒に研究しませんか？', tags: ['Python', 'TensorFlow', 'Keras'], isFollowing: false, bio: '画像認識や自然言語処理に挑戦中です。論文を読み解くのが好きです。' },
    { id: 6, name: '小林 花子', univ: '芸術学部 3年', catch: 'イラストレーターとしてプロジェクトに参加したいです！', tags: ['Photoshop', 'Illustrator', 'ClipStudio'], isFollowing: true, bio: 'キャラクターデザインやUIイラストが得意です。チームでの制作経験もあります。' },
];

export default function ProjectMemberList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return MOCK_USERS;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return MOCK_USERS.filter(user =>
            user.name.toLowerCase().includes(lowerCaseQuery) ||
            user.univ.toLowerCase().includes(lowerCaseQuery) ||
            user.catch.toLowerCase().includes(lowerCaseQuery) ||
            user.bio.toLowerCase().includes(lowerCaseQuery) ||
            user.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );
    }, [searchQuery]);

    const handleToggleFollow = (userId: number) => {
        setSelectedUser(prev => {
            if (!prev || prev.id !== userId) return prev;
            return { ...prev, isFollowing: !prev.isFollowing };
        });
        // 実際のアプリケーションではAPIコールなどを行う
        console.log(`User ${userId} follow status toggled.`);
    };

    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-auto transition-all duration-300">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロジェクトメンバーを探す</h1>
                        <p className="hidden sm:block text-xs text-gray-500 mt-1 font-bold">プロジェクトに最適なメンバーを見つけましょう。</p>
                    </div>
                </div>

                <div className="mb-6">
                    <FormInput
                        label="キーワード検索"
                        type="text"
                        placeholder="名前、スキル、大学などで検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<Search className="w-4 h-4 text-secondary" />}
                        className="pl-10"
                    />
                </div>

                <div className="space-y-3">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`user-item rounded-xl p-3 sm:p-4 flex items-start gap-4 cursor-pointer transition-all duration-150 ${selectedUser?.id === user.id ? 'border-primary bg-primary/5' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                                <div className="shrink-0 mt-0.5">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                        <Image
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
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
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            該当するメンバーが見つかりません。
                        </div>
                    )}
                </div>
            </div>

            <Modal
                open={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title="プロフィール詳細"
                maxWidthClassName="max-w-lg"
            >
                {selectedUser && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-2xl bg-gray-100 border border-gray-200 mx-auto mb-4 overflow-hidden">
                                <Image
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                                    alt={selectedUser.name}
                                    width={96}
                                    height={96}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-neutral">{selectedUser.name}</h3>
                            <p className="text-sm text-primary font-bold mt-1">{selectedUser.univ}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleToggleFollow(selectedUser.id)}
                                className={`flex-1 btn-md rounded-xl font-bold ${selectedUser.isFollowing ? 'bg-gray-100 text-secondary' : 'bg-primary text-white'}`}
                                variant={selectedUser.isFollowing ? "outline" : "primary"}
                            >
                                {selectedUser.isFollowing ? <UserCheck className="w-4 h-4 mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
                                {selectedUser.isFollowing ? 'フォロー中' : 'フォローする'}
                            </Button>
                            <Button variant="outline" className="btn-md rounded-xl px-4">
                                <MessageSquare className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[11px] font-black text-secondary uppercase tracking-wider">自己紹介 / 募集</h4>
                            <p className="text-[14px] leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">{selectedUser.bio}</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[11px] font-black text-secondary uppercase tracking-wider">スキル・興味</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedUser.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-white border border-gray-200 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}