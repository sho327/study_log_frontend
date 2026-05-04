"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, FormProvider, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { FormInputContext } from "@/components/ui/formInputProvider";
import { FormTextareaContext } from "@/components/ui/formTextareaProvider";
import { X, RefreshCcw } from "lucide-react";

// ダミーデータ
const user = {
    name: '佐藤 健太',
    univ: '工学部 情報工学科 3年',
    catch: '学祭のWEBサイトを作ってくれる仲間を探してます！',
    bio: '普段はWeb制作サークルで活動しています。バックエンド（Rails）中心ですが、最近はReact / Next.jsを勉強中です。',
    tags: ['React', 'Next.js', 'Rails', 'TypeScript', 'Figma']
};

// Zodスキーマ定義
const profileSchema = z.object({
    catch: z.string().min(1, "キャッチコピーは必須です。").max(100, "100文字以内で入力してください。"),
    bio: z.string().min(1, "自己紹介は必須です。").max(1000, "1000文字以内で入力してください。"),
    tags: z.array(z.string()).max(10, "タグは10個までです。"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// タグ入力コンポーネント
const TagInput = ({ name }: { name: "tags" }) => {
    const { field, fieldState } = useController({ name });
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const tag = inputValue.trim().replace(/[,，、\s]/g, '');
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
        <Card>
            <CardBody>
                <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-4">
                    スキル・興味
                </h4>
                <div className="flex flex-wrap gap-2">
                    {field.value.map((tag, index) => (
                        <span key={index} className="group flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-bold pl-2.5 pr-1.5 py-1 rounded-md transition-colors cursor-pointer hover:border-red-300 hover:bg-error/10">
                            <span>{tag}</span>
                            <button type="button" onClick={() => removeTag(index)}>
                                <X className="w-3.5 h-3.5 text-secondary group-hover:text-error" />
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                        onBlur={addTag}
                        className="bg-transparent border-none focus:ring-0 text-xs font-bold text-neutral placeholder-gray-300 w-24 py-1"
                        placeholder="+ タグを追加"
                    />
                </div>
                {fieldState.error && <p className="text-xs text-error mt-2">{fieldState.error.message}</p>}
                <p className="text-xs text-secondary mt-4 leading-tight">Enterキーかカンマ、または枠外クリックでタグを確定できます。</p>
            </CardBody>
        </Card>
    );
};

export default function ProfileEdit() {
    const [isLoading, setIsLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const methods = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            catch: user.catch,
            bio: user.bio,
            tags: user.tags,
        },
        mode: "onBlur",
    });

    const onSubmit = (data: ProfileFormValues) => {
        setIsLoading(true);
        
        const submissionData: any = { ...data };
        if (avatarFile) {
            submissionData.avatar = {
                name: avatarFile.name,
                size: avatarFile.size,
                type: avatarFile.type,
            };
        }

        console.log("Saving profile:", submissionData);
        alert("プロフィールを保存しました。");
        setTimeout(() => setIsLoading(false), 1500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAvatarFile(file);
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
            setAvatarPreview(URL.createObjectURL(file));
            // ファイル選択後、inputをクリアして同じファイルを再度選択できるようにする
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div 
                        // className="max-w-4xl mx-auto"
                        >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロフィール編集</h1>
                                <p className="hidden sm:block text-xs text-gray-500 mt-1 font-bold">あなたの公開プロフィールを編集します。</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* 左サイドバー */}
                            <div className="lg:col-span-4 space-y-6">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-4">
                                            {/* プロフィール画像表示 */}
                                            <div className="w-24 h-24 rounded-2xl bg-gray-100 border border-gray-200 mx-auto overflow-hidden shadow-sm">
                                                <Image
                                                    src={avatarPreview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                                    alt={user.name}
                                                    width={96}
                                                    height={96}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* クリアボタン */}
                                            {avatarPreview && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="btn-xs btn-circle absolute -top-2 -right-2 bg-white shadow-md"
                                                    onClick={() => {
                                                        setAvatarFile(null);
                                                        setAvatarPreview(null);
                                                    }}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {/* ホバー時の入替アイコン */}
                                            <label htmlFor="avatar-upload" className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                                <RefreshCcw className="w-6 h-6 text-white" />
                                            </label>
                                        </div>
                                        <input id="avatar-upload" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                                        <h2 className="text-xl font-bold text-neutral">{user.name}</h2>
                                        {/* <p className="text-[11px] text-primary font-bold mt-1 bg-primary/5 inline-block px-2 py-0.5 rounded">
                                            {user.univ}
                                        </p> */}
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
                                                Webエンジニア
                                            </span>
                                        </div>
                                        <div className="mt-1 flex gap-2">
                                            <Link href="/profile" className="flex-1">
                                                <Button variant="outline" className="w-full rounded-lg font-bold">キャンセル</Button>
                                            </Link>
                                            <Button type="submit" variant="primary" className="flex-1 rounded-lg font-bold" isLoading={isLoading} disabled={isLoading}>
                                                保存
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                                <TagInput name="tags" />
                            </div>

                            {/* 右メインコンテンツ */}
                            <div className="lg:col-span-8 space-y-6">
                                <Card>
                                    <CardBody className="sm:p-8">
                                        <div className="mb-8">
                                            <FormInputContext name="catch" label="Catch Copy" />
                                        </div>
                                        <div>
                                            <FormTextareaContext name="bio" label="About Me" className="h-40" />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>

            {/* 画像切り抜きモーダル */}
            {/* <Modal
                open={isCropping}
                onClose={() => {
                    setIsCropping(false);
                    setSourceImage(null); // モーダルを閉じるときに元画像をクリア
                }}
                title="画像を切り抜く"
                maxWidthClassName="max-w-lg"
            >
                {sourceImage && (
                    <div className="flex flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            onChange={c => setCrop(c)}
                            onComplete={c => setCompletedCrop(c)}
                            aspect={1} // 1:1の比率を強制
                            circularCrop // 円形に切り抜き
                        > */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* <img ref={imgRef} src={sourceImage} alt="Crop preview" onLoad={onImageLoad} />
                        </ReactCrop>
                        <Button onClick={handleCropImage} className="mt-4" variant="primary">
                            <Crop className="w-4 h-4 mr-2" /> 切り抜く
                        </Button>
                    </div>
                )}
            </Modal> */}
        </main>
    );
}