"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { FormInputContext } from "@/components/ui/formInputProvider";
import { FormSelectContext } from "@/components/ui/formSelectProvider";
import { FormTextarea } from "@/components/ui/formTextarea";
import { pageRoutes } from "@/components/constants";

// 1. Zodスキーマの定義
const taskSchema = z.object({
    title: z.string().min(1, { message: "タスク名は必須です。" }),
    desc: z.string().optional(),
    priority: z.enum(["低", "中", "高"], {
        required_error: "優先度を選択してください。",
    }),
    category: z.string().optional(),
    status: z.string().optional(),
    main_assignee: z.string().optional(),
    assignees: z.array(z.string()),
    reviewer: z.string().optional(),
    start_plan: z.string().optional(),
    end_plan: z.string().optional(),
    estimated_hours: z.number().min(0).optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

// モックデータ（本来はAPIから取得）
const PROJECT_MEMBERS = [
    { id: "1", name: "山田 太郎", icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { id: "2", name: "佐藤 花子", icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { id: "3", name: "田中 一郎", icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
];

const CATEGORIES = ["要件定義", "設計", "開発", "単体テスト"];
const STATUSES = ["未対応", "着手中", "処理済み", "完了"];

// 担当者選択コンポーネント
const AssigneesInput = ({ name }: { name: "assignees" }) => {
    const { field } = useController({ name });
    const [selectValue, setSelectValue] = useState("");

    const addAssignee = (memberId: string) => {
        if (memberId && !field.value.includes(memberId)) {
            field.onChange([...field.value, memberId]);
        }
        setSelectValue("");
    };

    const removeAssignee = (index: number) => {
        const newAssignees = [...field.value];
        newAssignees.splice(index, 1);
        field.onChange(newAssignees);
    };

    const getMemberName = (memberId: string) => {
        return PROJECT_MEMBERS.find((m) => m.id === memberId)?.name || "不明";
    };

    const getMemberIcon = (memberId: string) => {
        return PROJECT_MEMBERS.find((m) => m.id === memberId)?.icon || "";
    };

    // 未選択のメンバーリスト（既に選択されているメンバーは除外）
    const availableMembers = PROJECT_MEMBERS.filter((m) => !field.value.includes(m.id));

    return (
        <div>
            <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">
                担当者
            </label>
            {/* 選択済みメンバーのバッジ */}
            {field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mb-2">
                    {field.value.map((memberId, index) => (
                        <div
                            key={memberId}
                            className="inline-flex items-center gap-1 bg-white border border-gray-200 pr-2 py-1.5 pl-1.5 rounded-full"
                        >
                            <img
                                src={getMemberIcon(memberId)}
                                className="w-6 h-6 rounded-full shrink-0"
                                alt={getMemberName(memberId)}
                            />
                            <span className="text-xs font-bold whitespace-nowrap">{getMemberName(memberId)}</span>
                            <button
                                type="button"
                                onClick={() => removeAssignee(index)}
                                className="hover:text-error text-secondary transition-colors shrink-0"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {/* メンバー選択ドロップダウン */}
            {availableMembers.length > 0 ? (
                <select
                    value={selectValue}
                    onChange={(e) => {
                        if (e.target.value) {
                            addAssignee(e.target.value);
                        }
                    }}
                    className="select select-bordered font-bold text-neutral w-full bg-white focus:!shadow-none select-sm text-xs"
                >
                    <option value="">担当者を選択</option>
                    {availableMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
            ) : (
                <p className="text-xs text-secondary font-bold">すべてのメンバーが追加済みです</p>
            )}
        </div>
    );
};

export default function TaskSave() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // 2. React Hook Form の設定
    const methods = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            desc: "",
            priority: "中",
            category: "",
            status: "",
            main_assignee: "",
            assignees: [],
            reviewer: "",
            start_plan: "",
            end_plan: "",
            estimated_hours: 0,
        },
        mode: "onBlur",
    });

    const { handleSubmit, watch, setValue } = methods;
    const priority = watch("priority");

    // 3. 送信時の処理
    const onSubmit = (data: TaskFormValues) => {
        setIsLoading(true);
        console.log("Creating Task:", data);
        // TODO: API呼び出し
        setTimeout(() => {
            setIsLoading(false);
            // タスク一覧に戻る
            router.push(pageRoutes.PROJECT.TASK.LIST);
        }, 1500);
    };

    return (
        <FormProvider {...methods}>
            <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">タスクの新規作成</h1>
                        <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">
                            プロジェクトの進捗を管理するための詳細を入力します。
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="flex-1 sm:flex-none !h-11 !min-h-11"
                            // variant="ghost"
                            // className="btn-sm text-secondary font-bold"
                            // onClick={() => router.push(`${pageRoutes.PROJECT.TASK.SAVE}`)}
                            onClick={() => router.back()}
                        >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg> */}
                            キャンセル
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1 sm:flex-none !h-11 !min-h-11"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            {isLoading ? "保存中..." : "保存する"}
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* 左カラム（メイン） */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* 基本情報カード */}
                            <Card>
                                <CardBody className="p-6 sm:p-8 space-y-6">
                                    <FormInputContext
                                        name="title"
                                        label="タスク名"
                                        placeholder="例：ログイン画面のマークアップ"
                                        className="h-12 font-bold text-lg"
                                    />

                                    <FormTextarea
                                        label="詳細・メモ"
                                        placeholder="タスクの具体的な内容や、参考リンクなどを記入してください..."
                                        {...methods.register("desc")}
                                        className="h-48 leading-relaxed"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormSelectContext name="category" label="カテゴリ" sizeVariant="sm">
                                            <option value="">選択してください</option>
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </FormSelectContext>

                                        <FormSelectContext name="status" label="ステータス" sizeVariant="sm">
                                            <option value="">選択してください</option>
                                            {STATUSES.map((st) => (
                                                <option key={st} value={st}>
                                                    {st}
                                                </option>
                                            ))}
                                        </FormSelectContext>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* 添付ファイルカード */}
                            <Card>
                                <CardBody className="p-6">
                                    <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">
                                        添付ファイル
                                    </label>
                                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-10 w-10 text-secondary"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm">
                                                <span className="relative cursor-pointer rounded-md font-bold text-primary hover:text-primary/80">
                                                    ファイルをアップロード
                                                </span>
                                                <p className="pl-1 text-secondary">またはドラッグ＆ドロップ</p>
                                            </div>
                                            <p className="text-xs text-secondary">PNG, JPG, PDF up to 10MB</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* 右カラム（サイドバー） */}
                        <div className="space-y-4">
                            <Card>
                                <CardBody className="p-6 space-y-6">
                                    {/* 優先度 */}
                                    <div>
                                        <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">
                                            優先度
                                        </label>
                                        <div className="flex gap-2">
                                            {(["低", "中", "高"] as const).map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setValue("priority", p)}
                                                    className={`flex-1 py-2 text-xs font-black rounded-lg border transition-all ${
                                                        priority === p
                                                            ? "bg-primary text-white border-primary"
                                                            : "bg-white text-secondary border-gray-200"
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* 主担当者 */}
                                    <FormSelectContext name="main_assignee" label="主担当者 (Owner)" sizeVariant="sm">
                                        <option value="">未設定</option>
                                        {PROJECT_MEMBERS.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </FormSelectContext>

                                    {/* 担当者（複数選択） */}
                                    <AssigneesInput name="assignees" />

                                    {/* レビュアー */}
                                    <FormSelectContext name="reviewer" label="レビュアー" sizeVariant="sm">
                                        <option value="">未設定</option>
                                        {PROJECT_MEMBERS.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </FormSelectContext>

                                    <hr className="border-gray-200" />

                                    {/* 日付・工数 */}
                                    <div className="space-y-4">
                                        <FormInputContext
                                            name="start_plan"
                                            label="作業開始予定"
                                            type="date"
                                            className="text-sm"
                                        />
                                        <FormInputContext
                                            name="end_plan"
                                            label="作業終了予定"
                                            type="date"
                                            className="text-sm"
                                        />
                                        <div>
                                            <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">
                                                予定工数 (h)
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                className="input input-sm input-minimal w-full font-bold text-sm"
                                                {...methods.register("estimated_hours", { valueAsNumber: true })}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* 保存ボタン（モバイル用） */}
                            <Button
                                variant="primary"
                                className="w-full rounded-xl text-white font-black shadow-xl shadow-primary/20 border-none h-14 lg:hidden"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                            >
                                {isLoading ? "保存中..." : "タスクを作成する"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </FormProvider>
    );
}
