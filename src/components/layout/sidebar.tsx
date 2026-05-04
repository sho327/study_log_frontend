"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store";
import { pageRoutes } from "@/components/constants";
import { SpaceSelectDropdown } from "@/components/layout/spaceSelectDropdown";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    const pathname = usePathname();
    const {
        sidebarExpanded,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeSpace,
        spaces,
        setActiveSpace,
    } = useAppStore();

    const isProjectArea = pathname.startsWith("/project/xxx");

    const projectMenuItems = [
        {
            label: "ダッシュボード",
            href: pageRoutes.PROJECT.DASHBOARD,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "タスク",
            href: pageRoutes.PROJECT.TASK.LIST,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M9 12l2 2 4-4M7 6h10M7 18h10M7 12h2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "メンバー",
            href: pageRoutes.PROJECT.MEMBER.LIST,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    const menuItems = [
        {
            label: "ダッシュボード",
            href: pageRoutes.MAIN.DASHBOARD,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "プロジェクト",
            href: pageRoutes.MAIN.PROJECT_LIST,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "プロジェクト一覧(M)",
            href: '/mantine/project/list',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "プロジェクト登録(M)",
            href: '/mantine/project/save',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },{
            label: "おしらせ(M)",
            href: '/mantine/notifications',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "招待承認待ち(M)",
            href: '/mantine/invitations',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "タスク一覧(M)",
            href: '/mantine/project/list/tasks',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "メンバー",
            href: pageRoutes.MAIN.MEMBER_LIST,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "お知らせ",
            href: pageRoutes.MAIN.NOTIFICATION_LIST,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* モバイルメニューオーバーレイ */}
            {mobileMenuOpen && (
                <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[200] md:z-[-1] md:hidden mt-16" />
            )}

            {/* サイドメニュー */}
            <aside
                className={`bg-white border-r border-gray-200 flex-col overflow-y-auto shadow-sm transition-all duration-300 z-[200] md:z-10 fixed left-0 transform top-16 h-[calc(100vh-4rem)] md:top-0 md:h-full md:relative md:translate-x-0 md:shadow-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } ${sidebarExpanded || mobileMenuOpen ? "w-64 px-3" : "md:w-[72px] md:items-center md:px-2"}`}
            >
                <div className="flex flex-col h-full py-6 md:py-5">
                    <div className="flex-1 flex flex-col gap-1 w-full">
                        <div className="w-full space-y-5 px-3 md:px-1">
                            {/* プロジェクト配下の時だけ：プロジェクト用メニューを表示 */}
                            {isProjectArea && (
                                <div>
                                    {(sidebarExpanded || mobileMenuOpen) && (
                                        <div className="text-xs font-black text-secondary uppercase tracking-widest px-3 mb-2">
                                            一覧選択へ戻る
                                        </div>
                                    )}
                                    <Link
                                        href={pageRoutes.MAIN.PROJECT_LIST}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`bg-primary/10 text-primary border border-primary/10 flex items-center gap-3 w-full p-2.5 rounded-xl transition-all mb-3 underline hover:text-[oklch(0.63_0.11_162)] transition-colors duration-200 ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""
                                            }`}
                                    >
                                        <div className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 016 6v3" />
                                            </svg>
                                        </div>
                                        {(sidebarExpanded || mobileMenuOpen) && (
                                            <span className="font-bold text-[14.25px] whitespace-nowrap">
                                                プロジェクト一覧
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            )}
                            
                            {/* スマホの時だけ：メニュー見出しの上にスペース選択を表示 */}
                            {mobileMenuOpen && (
                                <div className="md:hidden">
                                    <div className="text-xs font-black text-secondary uppercase tracking-widest px-3 mb-2">
                                        スペース切替
                                    </div>
                                    <SpaceSelectDropdown
                                        activeSpace={activeSpace}
                                        spaces={spaces}
                                        onSelectSpace={(space) => {
                                            setActiveSpace(space);
                                            setMobileMenuOpen(false);
                                        }}
                                        triggerWidthClassName="w-full"
                                        dropdownWidthClassName="w-full"
                                    />
                                </div>
                            )}

                            {/* プロジェクト配下の時だけ：プロジェクト用メニューを表示 */}
                            {isProjectArea && (
                                <div>
                                    {(sidebarExpanded || mobileMenuOpen) && (
                                        <div className="text-xs font-black text-secondary uppercase tracking-widest px-3 mb-4 md:mb-3">
                                            プロジェクトメニュー
                                        </div>
                                    )}

                                    {projectMenuItems.map((item) => {
                                        const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
                                        const isActive =
                                            currentPath === item.href ||
                                            currentPath.startsWith(`${item.href}/`);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${isActive
                                                    ? "bg-primary text-primary-content shadow-md shadow-primary/30"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-neutral"
                                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                                            >
                                                <div className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                                                    {item.icon}
                                                </div>
                                                {(sidebarExpanded || mobileMenuOpen) && (
                                                    <span className="font-bold text-[14.25px] whitespace-nowrap">{item.label}</span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {/* プロジェクト配下では、通常メニューは出さずプロジェクトに集中させる */}
                            {!isProjectArea && (
                                <div>
                                    {(sidebarExpanded || mobileMenuOpen) && (
                                        <div className="text-xs font-black text-secondary uppercase tracking-widest px-3 mb-4 md:mb-3">
                                            メニュー
                                        </div>
                                    )}

                                    {menuItems.map((item) => {
                                        // パスの末尾スラッシュ有無やネスト配下もハイライト対象にする
                                        const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
                                        const isActive =
                                            currentPath === item.href ||
                                            currentPath.startsWith(`${item.href}/`) ||
                                            (currentPath === "/" && item.href === pageRoutes.MAIN.DASHBOARD);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${isActive
                                                    ? "bg-primary text-primary-content shadow-md shadow-primary/30"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-neutral"
                                                    } ${!sidebarExpanded && !mobileMenuOpen ? "md:justify-center md:px-0" : ""}`}
                                            >
                                                <div className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                                                    {item.icon}
                                                </div>
                                                {(sidebarExpanded || mobileMenuOpen) && (
                                                    <span className="font-bold text-[14.25px] whitespace-nowrap">{item.label}</span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
