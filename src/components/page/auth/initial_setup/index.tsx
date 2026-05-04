"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/page/auth/authCard";
import { FormInput } from "@/components/ui/formInput";
import { AuthButton } from "@/components/page/auth/authButton";
import { useAppStore } from "@/store";
import { initialSetupSchema, InitialSetupFormValues } from "@/lib/schema/auth";

type PlanMode = "personal" | "shared-free" | "shared-pro" | "invite";

export default function InitialSetup() {
    const router = useRouter();
    const { setIsLoading: setGlobalLoading } = useAppStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<InitialSetupFormValues>({
        resolver: zodResolver(initialSetupSchema),
        defaultValues: {
            planMode: "personal",
            inviteCode: "",
            workspaceName: "",
            workspaceIcon: "",
        },
        mode: "onBlur",
    });

    const selectedMode = watch("planMode");
    const inviteCodeValue = watch("inviteCode");

    const handleNextStep = async (step: number) => {
        // 現在のステップのバリデーションを実行
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger("displayName");
        } else if (currentStep === 2) {
            isValid = await trigger(["planMode", "inviteCode"]);
        } else {
            isValid = true;
        }

        if (isValid) {
            setCurrentStep(step);
        }
    };

    const handleSelectPlan = (mode: PlanMode) => {
        setValue("planMode", mode);
        setValue("inviteCode", "");
    };

    const handleInviteInput = (value: string) => {
        setValue("inviteCode", value);
        if (value.length > 0) {
            setValue("planMode", "invite");
        } else {
            setValue("planMode", "personal");
        }
    };

    const onSubmit = (data: InitialSetupFormValues) => {
        setIsLoading(true);
        setGlobalLoading(true);

        console.log("--- 初期セットアップ完了試行 ---");
        console.log("Data:", data);

        // 完了処理をシミュレート
        setTimeout(() => {
            setIsLoading(false);
            setGlobalLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <>
            <AuthCard>
                {/* ステップインジケーター */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-colors ${step <= currentStep ? "bg-primary" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Step 1: プロフィール設定 */}
                    {currentStep === 1 && (
                        <div>
                            <h1 className="text-base font-black text-neutral mb-2">プロフィール設定</h1>
                            <p className="text-[12px] text-gray-500 mb-8 font-bold">メンバーに表示されるあなたの情報</p>
                            <div className="space-y-6">
                                <div className="flex flex-col items-center gap-4 pt-2">
                                    <div className="avatar">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Unimoa" alt="Avatar" />
                                        </div>
                                    </div>
                                    <button type="button" className="text-[12px] font-black text-primary hover:underline">
                                        画像を変更する
                                    </button>
                                </div>
                                <FormInput
                                    label="表示名"
                                    placeholder="例：田中 太郎"
                                    error={errors.displayName?.message}
                                    {...register("displayName")}
                                />
                                <AuthButton
                                    type="button"
                                    onClick={() => handleNextStep(2)}
                                    variant="primary"
                                >
                                    次へ進む
                                </AuthButton>
                            </div>
                        </div>
                    )}

                    {/* Step 2: スペース選択 */}
                    {currentStep === 2 && (
                        <div>
                            <h1 className="text-base font-black text-neutral mb-2">スペースの準備</h1>
                            <p className="text-[12px] text-gray-500 mb-6 font-bold">プランを選ぶか、招待コードを入力してください</p>

                            <div className="space-y-3">
                                {/* 個人スペース */}
                                <div
                                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "personal"
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                        }`}
                                    onClick={() => handleSelectPlan("personal")}
                                >
                                    <div className="mt-1 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-neutral">個人スペース</div>
                                        <div className="text-[11px] text-gray-500 font-bold">自分専用の無料ワークスペース</div>
                                    </div>
                                </div>

                                {/* 無料共有スペース */}
                                <div
                                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "shared-free"
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                        }`}
                                    onClick={() => handleSelectPlan("shared-free")}
                                >
                                    <div className="mt-1 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M12 21v-2a4 4 0 0 0-3-3.87" />
                                            <circle cx="12" cy="7" r="4" />
                                            <circle cx="6" cy="11" r="4" />
                                            <circle cx="18" cy="11" r="4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-neutral">無料共有スペース</div>
                                        <div className="text-[11px] text-gray-500 font-bold">ゼミ・サークル向け (最大10人)</div>
                                    </div>
                                </div>

                                {/* 有料共有スペース */}
                                <div
                                    className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${selectedMode === "shared-pro"
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-primary/30 hover:bg-primary/[0.02]"
                                        }`}
                                    onClick={() => handleSelectPlan("shared-pro")}
                                >
                                    <div className="mt-1 text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-neutral">有料共有スペース</div>
                                        <div className="text-[11px] text-gray-500 font-bold">高度な管理と無制限のメンバー (Pro)</div>
                                    </div>
                                </div>

                                <div className="divider text-[10px] font-black text-secondary my-4 uppercase tracking-widest">または</div>

                                {/* 招待コード入力 */}
                                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                        招待コードを入力して合流
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="例：ABC-123"
                                        className="w-full input-minimal text-[12px] uppercase placeholder:text-secondary"
                                        value={inviteCodeValue}
                                        onChange={(e) => handleInviteInput(e.target.value)}
                                    />
                                    {errors.inviteCode && (
                                        <p className="text-[10px] font-bold text-error mt-1 ml-1">{errors.inviteCode.message}</p>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(1)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        戻る
                                    </AuthButton>
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(3)}
                                        variant="primary"
                                        className="flex-[2]"
                                    >
                                        次へ進む
                                    </AuthButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: 最終確認 */}
                    {currentStep === 3 && (
                        <div>
                            <h1 className="text-base font-black text-neutral mb-2">
                                {selectedMode === "shared-free" || selectedMode === "shared-pro"
                                    ? "スペースの作成"
                                    : selectedMode === "invite"
                                        ? "招待の確認"
                                        : "セットアップの完了"}
                            </h1>
                            <p className="text-[12px] text-gray-500 mb-8 font-bold">
                                {selectedMode === "shared-free" || selectedMode === "shared-pro"
                                    ? "スペースの名前とURLを決めてください"
                                    : selectedMode === "invite"
                                        ? "既存のゼミへの合流準備が整いました"
                                        : "自分だけのスペースを作成します"}
                            </p>

                            <div className="space-y-4">
                                {/* 共有スペース作成UI */}
                                {(selectedMode === "shared-free" || selectedMode === "shared-pro") && (
                                    <div className="space-y-5">
                                        <div className="flex flex-col items-center gap-4 py-2">
                                            <div className="avatar">
                                                <div className="w-20 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src="https://api.dicebear.com/7.x/identicon/svg?seed=Workspace" alt="Workspace Icon" />
                                                </div>
                                            </div>
                                            <button type="button" className="text-[12px] font-black text-primary hover:underline">
                                                アイコンを変更
                                            </button>
                                        </div>
                                        <FormInput
                                            label="スペース名"
                                            placeholder="例：〇〇大学 佐藤ゼミ"
                                            error={errors.workspaceName?.message}
                                            {...register("workspaceName")}
                                        />

                                    </div>
                                )}

                                {/* 招待コード確認UI */}
                                {selectedMode === "invite" && (
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
                                        <div className="text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[13px] font-black text-green-800">招待コードを認識しました</div>
                                            <div className="text-[11px] font-bold text-green-600">登録完了後、自動的に参加します。</div>
                                        </div>
                                    </div>
                                )}

                                {/* 個人スペースUI */}
                                {selectedMode === "personal" && (
                                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center text-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                        </div>
                                        <div className="text-[12px] font-bold text-gray-500 leading-relaxed">
                                            あなた専用プライベート空間を作成します。<br />
                                            後からいつでもゼミ用スペースを追加できます。
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <AuthButton
                                        type="button"
                                        onClick={() => handleNextStep(2)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        戻る
                                    </AuthButton>
                                    <AuthButton
                                        type="submit"
                                        variant="primary"
                                        className="flex-[2]"
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                    >
                                        Unimoa をはじめる！
                                    </AuthButton>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </AuthCard>

            {/* <p className="mt-8 text-center text-[10px] font-bold text-secondary uppercase tracking-widest">
                Unimoa Setup Wizard
            </p> */}
        </>
    );
}

