"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store"
import { useClickOutside } from "@/hooks/useClickOutside"
import { Eye, Edit, Trash2 } from "lucide-react"
import { pageRoutes } from "@/components/constants"
import { Button } from "@/components/ui/button"
import { Card, CardBody } from "@/components/ui/card"

type Space = {
    id: string
    name: string
    projects: Project[]
}

type Project = {
    id: string
    title: string
    category: string
    desc: string
    tags: string[]
    tasks: number[]
}

export default function Projects() {
    const router = useRouter();
    const { activeSpace, spaces } = useAppStore();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // メニュー外をクリックしたら閉じる
    useEffect(() => {
        if (openMenuId && menuRefs.current[openMenuId]) {
            const handleClickOutside = (event: MouseEvent) => {
                if (menuRefs.current[openMenuId] && !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
                    setOpenMenuId(null);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [openMenuId]);

    // 本来は activeSpace に基づいて取得するが、モック用に spaces から検索
    const currentLocalSpace = spaces.find(s => s.id === activeSpace.id) || spaces[0];

    // ダミーのプロジェクトリスト（activeSpaceに紐づくものが無い場合のフォールバック）
    const displayProjects = (currentLocalSpace && currentLocalSpace.projects && currentLocalSpace.projects.length > 0)
        ? currentLocalSpace.projects
        : [
            {
                id: "p1",
                title: "卒業研究中間発表の準備",
                category: "リサーチ",
                desc: "卒業研究の中間発表に向けて、スライド作成と資料整理を進めています。デザイン面でのサポートも募集中です。",
                tags: ["研究", "プレゼン", "デザイン"],
                tasks: [1, 2, 3]
            },
            {
                id: "p2",
                title: "ゼミ合宿の計画",
                category: "イベント",
                desc: "来月のゼミ合宿の企画・運営を担当します。予算管理や会場手配など、一緒に進めてくれる方を募集しています。",
                tags: ["イベント", "企画", "運営"],
                tasks: [1]
            },
            {
                id: "p3",
                title: "2025年度 工学部学祭 公式サイト制作",
                category: "Web制作",
                desc: "今年の学祭サイトをReact+Next.jsで作り直します。エンジニアだけでなくデザイナーも募集中です！",
                tags: ["React", "Figma", "TypeScript"],
                tasks: []
            },
        ];

    return (
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-neutral tracking-tight">プロジェクト</h1>
                    <p className="hidden sm:block text-[13.5px] text-gray-500 mt-1 font-bold">現在進行中のプロジェクト一覧</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        className="flex-1 sm:flex-none !h-11 !min-h-11"
                        onClick={() => router.push(`${pageRoutes.MAIN.PROJECT_SAVE}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        新規作成
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project) => (
                    <Card key={project.id} className="rounded-xl cursor-pointer hover:shadow-md">
                        <CardBody onClick={(e) => {
                            e.stopPropagation();
                            router.push(pageRoutes.PROJECT.TASK.LIST);
                        }}>
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
                                    {project.category}
                                </span>
                                <div
                                    className="relative"
                                    ref={(el) => { menuRefs.current[project.id] = el; }}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === project.id ? null : project.id);
                                        }}
                                        className="btn btn-ghost btn-circle btn-xs text-secondary transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                    {openMenuId === project.id && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                            <div className="py-1.5 px-1.5">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(pageRoutes.MAIN.PROJECT_DETAIL);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-neutral rounded-xl transition-all group"
                                                >
                                                    <Eye className="h-4 w-4 text-secondary group-hover:text-primary transition-colors" />
                                                    <span>詳細を見る</span>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Update project:", project.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-neutral rounded-xl transition-all group"
                                                >
                                                    <Edit className="h-4 w-4 text-secondary group-hover:text-primary transition-colors" />
                                                    <span>更新</span>
                                                </button>
                                            </div>
                                            <div className="border-t border-gray-100 py-1.5 px-1.5">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Delete project:", project.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-error hover:bg-error/10 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>削除</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h3 className="card-title text-lg font-black text-neutral">
                                {project.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-1 mb-0.5">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {project.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-bold text-secondary border border-gray-100 px-2 py-0.5 rounded-md"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200">
                                <div className="flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                        <img src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + project.id} />
                                    </div>
                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                        <img src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + (project.id + "alt")} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span>{project.tasks.length} タスク</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </main>
    )
}