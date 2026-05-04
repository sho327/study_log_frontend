"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { pageRoutes } from "@/components/constants";
import { useForm, FormProvider, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormInputContext } from "@/components/ui/formInputProvider";
import { FormSelectContext } from "@/components/ui/formSelectProvider";
import { FormTextarea } from "@/components/ui/formTextarea";

// 1. Zodスキーマの定義
const projectSchema = z.object({
    title: z.string().min(1, { message: "プロジェクト名は必須です。" }),
    category: z.string(),
    slots: z.number().min(1).max(10),
    desc: z.string().min(1, { message: "概要は必須です。" }),
    deadline: z.string().min(1, { message: "締め切りは必須です。" }),
    tags: z.array(z.string()),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const TagInput = ({ name }: { name: "tags" }) => {
    const { field } = useController({ name });
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const tag = inputValue.trim();
        if (tag && !field.value.includes(tag)) {
            field.onChange([...field.value, tag]);
        }
        setInputValue("");
    };

    const removeTag = (index: number) => {
        const newTags = [...field.value];
        newTags.splice(index, 1);
        field.onChange(newTags);
    };

    return (
        <div>
            <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">必要なスキル・タグ</label>
            <div className="input-minimal p-2 flex flex-wrap gap-2 min-h-[48px]">
                {field.value.map((tag, index) => (
                    <span key={index} className="bg-primary/5 text-primary text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
                        <span>{tag}</span>
                        <button type="button" onClick={() => removeTag(index)} className="hover:text-error">×</button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    className="bg-transparent border-none focus:ring-0 text-xs flex-1 min-w-[80px]"
                    placeholder="+ 追加"
                />
            </div>
        </div>
    );
};

export default function ProjectSave() {
    const [isLoading, setIsLoading] = useState(false);

    // 2. React Hook Form の設定
    const methods = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            category: "Web制作",
            slots: 3,
            desc: "",
            deadline: "",
            tags: [],
        },
        mode: "onBlur",
    });

    const { register, handleSubmit, formState: { errors }, watch } = methods;
    const slots = watch("slots");

    // 3. 送信時の処理
    const onSubmit = (data: ProjectFormValues) => {
        setIsLoading(true);
        console.log("Publishing:", data);
        alert("プロジェクトを公開しました！メンバーが集まるのを待ちましょう。");
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <FormProvider {...methods}>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロジェクト新規登録</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">プロジェクトの新規作成</p>
                </div>
            </div>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                // className="w-100 sm:w-[85%] sm:mx-auto"
                >
                <div className="bg-white rounded-2xl p-6 sm:p-10 space-y-10 shadow-sm border border-gray-100">
                    <section className="space-y-6">
                        <FormInputContext name="title" label="プロジェクト名" placeholder="例：2025年度 学祭公式サイト制作" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormSelectContext name="category" label="カテゴリー">
                                <option>Web制作</option>
                                <option>アプリ開発</option>
                                <option>デザイン</option>
                                <option>データ分析</option>
                                <option>イベント運営</option>
                            </FormSelectContext>
                            <div>
                                <label className="block text-[12px] font-black text-secondary uppercase tracking-[0.15em] mb-2 px-1">募集人数</label>
                                <div className="flex items-center gap-4 h-12">
                                    <input type="range" min="1" max="10" {...register("slots", { valueAsNumber: true })} className="range range-primary range-xs flex-1" />
                                    <span className="text-lg font-black text-primary w-8">{slots}人</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <FormTextarea
                            label="プロジェクトの概要・目的"
                            placeholder="どのようなプロジェクトか、何を達成したいかを詳しく書いてください..."
                            error={errors.desc?.message}
                            {...register("desc")}
                            className="h-40"
                        />
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormInputContext name="deadline" label="応募締め切り" type="date" />
                        <TagInput name="tags" />
                    </section>
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <Link
                            href={pageRoutes.MAIN.PROJECT_LIST}
                            className="flex-1 sm:flex-none"
                        >
                            <Button
                                variant="ghost"
                                className="flex-1 sm:flex-none !h-11 !min-h-11"
                            >
                                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                                一覧に戻る
                            </Button>
                        </Link>
                        <Button
                            variant="primary"
                            className="flex-1 sm:flex-none !h-11 !min-h-11"
                        >
                            登録する
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}