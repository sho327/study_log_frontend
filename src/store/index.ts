import { create } from 'zustand';

export type Space = {
    id: string;
    name: string;
    projects?: any[]; // 必要に応じて詳細化
};

const DEFAULT_SPACES: Space[] = [
    { id: "s1", name: "田中AIデザインゼミ", projects: [] },
    { id: "s2", name: "写真部 公式", projects: [] },
];

type AppState = {
    // UI State
    sidebarExpanded: boolean;
    mobileMenuOpen: boolean;
    searchOpen: boolean;
    searchQuery: string;

    // Data State
    activeSpace: Space;
    spaces: Space[];

    // Global UI State
    isLoading: boolean;

    // Actions
    setSidebarExpanded: (expanded: boolean) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
    setActiveSpace: (space: Space) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
    // Initial State
    sidebarExpanded: true,
    mobileMenuOpen: false,
    searchOpen: false,
    searchQuery: "",
    activeSpace: DEFAULT_SPACES[0],
    spaces: DEFAULT_SPACES,
    isLoading: false,

    // Actions
    setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    setSearchOpen: (open) => set({ searchOpen: open }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveSpace: (space) => set({ activeSpace: space }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}));
