"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { inviteEmailSchema, inviteInputSchema } from "@/lib/schema/main";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/formInput";
import { FormSelect } from "@/components/ui/formSelect";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table";

type MemberStatus = "pending" | "active" | "declined";
type MemberRole = "admin" | "member" | "viewer";

type Member = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    joinedAt: string;
    status: MemberStatus;
    role: MemberRole;
    isRegistered: boolean;
};

type InviteTarget =
    | { type: "member"; id: string; name: string; email: string; avatar?: string }
    | { type: "email"; email: string };

export default function Members() {
    const [activeTab, setActiveTab] = useState<"registered" | "unregistered">("registered");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteInput, setInviteInput] = useState("");
    const [inviteError, setInviteError] = useState("");
    const [selectedInvites, setSelectedInvites] = useState<InviteTarget[]>([]);

    // ダミーデータ
    const registeredMembers: Member[] = [
        {
            id: "1",
            name: "田中 太郎",
            email: "tanaka@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka",
            joinedAt: "2024-01-15",
            status: "active",
            role: "admin",
            isRegistered: true,
        },
        {
            id: "2",
            name: "佐藤 花子",
            email: "sato@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sato",
            joinedAt: "2024-01-20",
            status: "active",
            role: "member",
            isRegistered: true,
        },
        {
            id: "3",
            name: "鈴木 一郎",
            email: "suzuki@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki",
            joinedAt: "2024-02-01",
            status: "pending",
            role: "member",
            isRegistered: true,
        },
    ];

    const unregisteredMembers: Member[] = [
        {
            id: "4",
            name: "",
            email: "yamada@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yamada",
            joinedAt: "2024-02-10",
            status: "pending",
            role: "member",
            isRegistered: false,
        },
    ];

    const currentMembers = activeTab === "registered" ? registeredMembers : unregisteredMembers;

    const getStatusBadge = (status: MemberStatus) => {
        const styles = {
            pending: "badge-warning px-2 py-2",
            active: "badge-primary px-2 py-2",
            declined: "badge-error px-2 py-2",
        };
        const labels = {
            pending: "招待中",
            active: "参加",
            declined: "辞退",
        };
        return <span className={`badge ${styles[status]} badge-sm font-bold`}>{labels[status]}</span>;
    };

    const closeInviteModal = () => {
        setShowInviteModal(false);
        setInviteError("");
        setInviteInput("");
        setSelectedInvites([]);
    };

    const normalizedInput = inviteInput.trim().toLowerCase();
    const suggestions = useMemo(() => {
        if (!normalizedInput) return [];
        return registeredMembers
            .filter((m) => {
                const name = m.name.toLowerCase();
                const email = m.email.toLowerCase();
                return name.includes(normalizedInput) || email.includes(normalizedInput) || m.id === normalizedInput;
            })
            .filter((m) => !selectedInvites.some((s) => s.type === "member" && s.id === m.id))
            .slice(0, 5);
    }, [normalizedInput, registeredMembers, selectedInvites]);

    const addMemberInvite = (member: Member) => {
        setSelectedInvites((prev) => [
            ...prev,
            { type: "member", id: member.id, name: member.name, email: member.email, avatar: member.avatar },
        ]);
        setInviteInput("");
        setInviteError("");
    };

    const addEmailInvite = (email: string) => {
        const normalized = email.trim().toLowerCase();
        if (selectedInvites.some((s) => s.type === "email" && s.email.toLowerCase() === normalized)) {
            setInviteError("同じメールアドレスが既に追加されています");
            return;
        }
        if (selectedInvites.some((s) => s.type === "member" && s.email.toLowerCase() === normalized)) {
            setInviteError("既にUnimoaユーザとして追加されています");
            return;
        }
        setSelectedInvites((prev) => [...prev, { type: "email", email: normalized }]);
        setInviteInput("");
        setInviteError("");
    };

    const removeInvite = (target: InviteTarget) => {
        setSelectedInvites((prev) => {
            if (target.type === "member") return prev.filter((s) => !(s.type === "member" && s.id === target.id));
            return prev.filter((s) => !(s.type === "email" && s.email === target.email));
        });
    };

    const handleInviteInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        // Enter は「メール形式なら外部ユーザとして追加」
        const emailResult = inviteEmailSchema.safeParse(inviteInput);
        if (emailResult.success) {
            addEmailInvite(emailResult.data);
            return;
        }

        // 入力がメール形式でなければサジェストから選択する想定
        const inputResult = inviteInputSchema.safeParse(inviteInput);
        if (inputResult.success) {
            setInviteError("登録済ユーザをサジェストから選択するか、有効なメールアドレスを入力してください");
        } else {
            setInviteError(inputResult.error.issues[0]?.message ?? "入力内容を確認してください");
        }
    };

    const handleInvite = () => {
        if (selectedInvites.length === 0) {
            setInviteError("招待するユーザを選択してください");
            return;
        }

        // NOTE: 現状はお試し実装のため、実際の送信はせずコンソールに出す
        console.log("Inviting targets:", selectedInvites);
        closeInviteModal();
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">メンバー管理</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">登録時み/未登録メンバーの一覧</p>
                </div>
                {/* 招待ボタン */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                        onClick={() => setShowInviteModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        ユーザ招待
                    </Button>
                </div>
            </div>

            {/* タブ */}
            <div className="tabs tabs-boxed bg-white mb-6 inline-flex p-1 rounded-xl">
                <button
                    className={`tab font-bold text-[13px] ${activeTab === "registered" ? "tab-active bg-white shadow-sm" : ""}`}
                    style={activeTab === "registered" ? { color: "white" } : {}}
                    onClick={() => setActiveTab("registered")}
                >
                    登録済ユーザ ({registeredMembers.length})
                </button>
                <button
                    className={`tab font-bold text-[13px] ${activeTab === "unregistered" ? "tab-active bg-white shadow-sm" : ""}`}
                    style={activeTab === "unregistered" ? { color: "white" } : {}}
                    onClick={() => setActiveTab("unregistered")}
                >
                    外部(未登録)ユーザ ({unregisteredMembers.length})
                </button>
            </div>

            {/* メンバー一覧テーブル */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="table-zebra">
                        <TableHead className="bg-gray-50">
                            <TableRow>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap">メンバー</TableHeader>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap">メールアドレス</TableHeader>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap">参加日</TableHeader>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap">ステータス</TableHeader>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap">権限</TableHeader>
                                <TableHeader className="font-black text-sm text-gray-500 uppercase tracking-widest whitespace-nowrap"></TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentMembers.map((member) => (
                                <TableRow key={member.id} className="hover">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full">
                                                    <img src={member.avatar} alt={member.name || member.email} />
                                                </div>
                                            </div>
                                            <div className="font-bold text-sm text-neutral whitespace-nowrap">
                                                {member.name || "未登録"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm whitespace-nowrap">{member.email}</TableCell>
                                    <TableCell className="text-sm whitespace-nowrap">{member.joinedAt}</TableCell>
                                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                                    <TableCell className="min-w-[150px]">
                                        <FormSelect
                                            sizeVariant="md"
                                            defaultValue={member.role}
                                            disabled={member.status !== "active"}
                                            className="w-full"
                                        >
                                            <option value="admin">管理者</option>
                                            <option value="member">メンバー</option>
                                            <option value="viewer">閲覧者</option>
                                        </FormSelect>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            {member.status === "pending" && (
                                                <Button
                                                    variant="ghost"
                                                    className="btn-sm text-primary hover:bg-primary/10 font-bold gap-1 px-2 rounded-lg transition-all"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                        <path d="M3 3v5h5" />
                                                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                                        <path d="M16 16h5v5" />
                                                    </svg>
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                className="btn-sm text-error hover:bg-error/10 font-bold gap-1 px-2 rounded-lg transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    <line x1="10" x2="10" y1="11" y2="17" />
                                                    <line x1="14" x2="14" y1="11" y2="17" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Unimoaユーザー招待モーダル */}
            <Modal
                open={showInviteModal}
                onClose={closeInviteModal}
                title="ユーザを招待する"
            >
                <p className="text-sm">対象のユーザID または メールアドレスを入力してください。</p>
                <p className="text-xs font-bold text-error mt-1 mb-4">※未登録ユーザの場合は招待メールが送信されます。</p>
                {selectedInvites.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {selectedInvites.map((t) => (
                            <div
                                key={t.type === "member" ? `m:${t.id}` : `e:${t.email}`}
                                className="badge badge-ghost px-3 py-3 gap-2"
                            >
                                <span className="font-bold text-xs">
                                    {t.type === "member" ? `${t.name}（${t.email}）` : t.email}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-xs px-1"
                                    onClick={() => removeInvite(t)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <FormInput
                    label="ユーザーID または メールアドレス"
                    type="text"
                    placeholder="例：tanaka@example.com"
                    value={inviteInput}
                    onChange={(e) => {
                        setInviteInput(e.target.value);
                        setInviteError("");
                    }}
                    onKeyDown={handleInviteInputKeyDown}
                    error={inviteError}
                />
                {suggestions.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                        {suggestions.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                                onClick={() => addMemberInvite(m)}
                            >
                                <div className="avatar">
                                    <div className="w-8 h-8 rounded-full">
                                        <img src={m.avatar} alt={m.name || m.email} />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-sm text-neutral truncate">{m.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{m.email}</div>
                                </div>
                                <div className="ml-auto text-[10px] font-black text-secondary">選択</div>
                            </button>
                        ))}
                    </div>
                )}
                <div className="modal-action">
                    <Button
                        variant="outline"
                        onClick={closeInviteModal}
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                    >
                        キャンセル
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleInvite}
                        disabled={selectedInvites.length === 0}
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                    >
                        招待する
                    </Button>
                </div>
            </Modal>
        </main>
    );
}
