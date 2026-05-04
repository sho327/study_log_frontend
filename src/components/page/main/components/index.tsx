"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/dataTable";

// デモ用のデータ型
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created: string;
}

// デモ用の列定義
const columns = [
    { key: 'name' as keyof User, label: '名前' },
    { key: 'email' as keyof User, label: 'メールアドレス' },
    { key: 'role' as keyof User, label: '役割' },
    { key: 'status' as keyof User, label: 'ステータス' },
    { key: 'created' as keyof User, label: '作成日' },
];

// デモデータ生成関数
const generateDummyData = (count: number): User[] => {
    const data: User[] = [];
    for (let i = 1; i <= count; i++) {
        const role = ['管理者', '編集者', '読者', 'ゲスト'][i % 4];
        const status = ['有効', '保留', '無効'][i % 3];
        const createdDate = `2024/${(i % 6) + 7}/${(i % 25) + 1}`;
        data.push({
            id: i,
            name: `ユーザー ${i}`,
            email: `user${i}@test.com`,
            role: role,
            status: status,
            created: createdDate
        });
    }
    return data;
};

export default function ComponentsDemo() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(generateDummyData(30));
    }, []);

    const handleDeleteSelected = (selectedIds: (number | string)[]) => {
        alert(`${selectedIds.length}件のアイテムを削除します。`);
        setUsers(prevUsers => prevUsers.filter(user => !selectedIds.includes(user.id)));
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <h1 className="text-2xl font-bold mb-6">DataTable デモ</h1>
            {/* ボタン検証 */}
            <button className="btn btn-neutral">Neutral</button>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-error">Error</button>
            <div className="p-8 bg-white space-y-4">
                <p className="text-[oklch(0.27 0.01 256.85)] font-black text-xl">Tailwind default gray-800</p>
                <p className="text-[oklch(0.21 0.01 256.85)] font-black text-xl">Tailwind default gray-900</p>
                <p className="text-[oklch(0.32_0.01_60)] font-black text-xl">Warm Gray (温かい)</p>
                <p className="text-[oklch(0.30_0.02_45)] font-black text-xl">Earth Dark (深い)</p>
                <p className="text-[oklch(0.32_0.01_160)] font-black text-xl">Sage Charcoal (クール)</p>
            </div>
            <div className="space-y-4 p-4 bg-white">
                {/* 1. 暖かみのある木立ちのような色（一番Naturalを感じやすい） */}
                <p className="text-[oklch(0.45_0.04_70)] font-black text-xl">
                    1. Warm Nature (明るめの茶炭色)
                </p>

                {/* 2. 深い森の影のような色（わずかに緑） */}
                <p className="text-[oklch(0.45_0.03_140)] font-black text-xl">
                    2. Forest Shade (深い苔炭色)
                </p>

                {/* 比較用：元の rgb(31 41 55) 相当 */}
                <p className="text-[rgb(31,41,55)] font-black text-xl">
                    3. Original Gray (元の無機質な色)
                </p>
            </div>
            <div className="p-10 bg-white space-y-6">
                {/* 1. 墨：しっとりした質感 */}
                <h1 className="text-[oklch(0.25_0.005_250)] text-4xl font-black tracking-tighter">
                    LOGOTYPE INK
                </h1>

                {/* 2. 鉛：クリーンでモダン */}
                <h1 className="text-[oklch(0.28_0.01_240)] text-4xl font-black tracking-tighter">
                    LOGOTYPE SLATE
                </h1>

                {/* 3. 鉄：究極のシンプル（比較用） */}
                <h1 className="text-[oklch(0.22_0_0)] text-4xl font-black tracking-tighter">
                    LOGOTYPE IRON
                </h1>
            </div>
            <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                {/* 案1：テラコッタ（温かみ・親しみ） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.65_0.07_45)] font-black text-2xl">
                        1. Terracotta Accent (温もりのある土色)
                    </p>
                    <p className="text-sm text-gray-500">
                        Primaryの緑と最も相性が良く、ナチュラルでオーガニックな印象になります。
                    </p>
                </div>

                {/* 案2：ミッドナイト・パープル（知的・洗練） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.45_0.06_300)] font-black text-2xl">
                        2. Midnight Purple (深く知的な紫)
                    </p>
                    <p className="text-sm text-gray-500">
                        Gray-800のクールさを引き継ぎつつ、画面に大人っぽい「艶」を出します。
                    </p>
                </div>

                {/* 案3：ミント・エメラルド（清潔・一貫性） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.80_0.08_185)] font-black text-2xl">
                        3. Mint Emerald (爽やかな青緑)
                    </p>
                    <p className="text-sm text-gray-500">
                        Primaryと同系色でまとめることで、究極にクリーンでモダンな雰囲気になります。
                    </p>
                </div>

                {/* 比較用：現在設定されている Accent */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-[oklch(0.55_0.046_22.8)] font-black text-xl opacity-60">
                        Current: Old Terracotta (現状の渋い赤茶)
                    </p>
                </div>
            </div>
            <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                {/* 案1：ディープ・スカイ（落ち着いた青） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.60_0.09_245)] font-black text-2xl">
                        1. Deep Sky (誠実なブルー)
                    </p>
                    <p className="text-sm text-gray-500">
                        今の 0.72 から 0.60 まで明るさを落とし、色相を少しネイビー寄りに。
                        「お知らせ」や「情報」として最も標準的で安心感のある色です。
                    </p>
                </div>

                {/* 案2：スレート・ブルー（ニュートラル寄り） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.55_0.06_250)] font-black text-2xl">
                        2. Slate Blue (洗練されたネイビー)
                    </p>
                    <p className="text-sm text-gray-500">
                        さらに明るさを抑え、彩度も低めに設定。
                        Neutral (gray-900系) と非常に馴染みが良く、ロゴの横にあっても主張しすぎません。
                    </p>
                </div>

                {/* 案3：オーシャン・ミスト（少し緑寄りの青） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.65_0.08_220)] font-black text-2xl">
                        3. Ocean Mist (深みのある水色)
                    </p>
                    <p className="text-sm text-gray-500">
                        明るさは残しつつ、少し「深み」を加えた色。
                        Primary のグリーンとのグラデーションが自然に繋がります。
                    </p>
                </div>

                {/* 比較用：現在の info */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-[oklch(0.72_0.12_230)] font-black text-xl opacity-50">
                        Current Info (現在の明るすぎる色)
                    </p>
                </div>
            </div>
            <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                {/* 案 A：パステル・ラピス（明るさキープ） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.73_0.06_240)] font-black text-2xl">
                        A. Pastel Lapis (明るい瑠璃色)
                    </p>
                    <p className="text-sm text-gray-500">
                        Primaryと同じ明るさ（0.73）ですが、彩度を半分以下に。
                        明るいので「お知らせ」として目立ちつつ、目に刺さらない上品な青です。
                    </p>
                </div>

                {/* 案 B：コンフォート・スカイ（少しだけ緑寄り） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.75_0.05_215)] font-black text-2xl">
                        B. Comfort Sky (穏やかな空色)
                    </p>
                    <p className="text-sm text-gray-500">
                        さらに明るく（0.75）し、色相を少しだけPrimary（緑）に寄せました。
                        グリーン系のUIと最も調和し、清潔感のある「お知らせ」になります。
                    </p>
                </div>

                {/* 案 C：ソフト・コバルト（スッキリ系） */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.70_0.08_250)] font-black text-2xl">
                        C. Soft Cobalt (澄んだ青)
                    </p>
                    <p className="text-sm text-gray-500">
                        ほんの少しだけ深みを持たせつつ、クリアな発色に。
                        ロゴのネイビーグレー（gray-800系）との対比が綺麗に出ます。
                    </p>
                </div>

                {/* 比較用：Primary */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-primary font-black text-xl opacity-50">
                        Reference: Primary Green (比較用の緑)
                    </p>
                </div>
            </div>
            <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                {/* 1. そのままの色 (Peter River) */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.61_0.15_243.64)] font-black text-2xl">
                        1. Pure #3498DB
                    </p>
                    <p className="text-sm text-gray-500">
                        非常にクリアで王道の青です。
                        ただ、Primary(0.11)より鮮やかなので、少し「デジタル感」が強めに出ます。
                    </p>
                </div>

                {/* 2. Unimoa ナチュラル調整版 */}
                <div className="space-y-1">
                    <p className="text-[oklch(0.68_0.10_243.64)] font-black text-2xl">
                        2. Unimoa Info Blue
                    </p>
                    <p className="text-sm text-gray-500">
                        #3498DBの青さを活かしつつ、明るさを少し上げ(0.61→0.68)、
                        彩度を少し抑え(0.15→0.10)ました。
                        Primary(0.73)との「明るさの差」が縮まり、画面がより軽やかになります。
                    </p>
                </div>

                {/* 比較用：Primary Green */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-primary font-black text-xl opacity-50">
                        Reference: Primary Green
                    </p>
                </div>
            </div>
            <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                <p className="font-black">BaseContent確認用</p>
                <p className="">BaseContent確認用</p>
            </div>
            <DataTable
                data={users}
                columns={columns}
                onDeleteSelected={handleDeleteSelected}
            />
        </main>
    );
}
