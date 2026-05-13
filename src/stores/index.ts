'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { User, StudyLog, Theme, Notification, Comment } from '@/types';

// Mock data for demo
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@studylog.com',
    name: 'Demo User',
    avatar: '',
    bio: 'Learning something new every day!',
    createdAt: new Date().toISOString(),
    following: ['user-2', 'user-3'],
    followers: ['user-2'],
  },
  {
    id: 'user-2',
    email: 'alice@example.com',
    name: 'Alice Developer',
    avatar: '',
    bio: 'Full-stack developer | Open source contributor',
    createdAt: new Date().toISOString(),
    following: ['user-1'],
    followers: ['user-1'],
  },
  {
    id: 'user-3',
    email: 'bob@example.com',
    name: 'Bob Designer',
    avatar: '',
    bio: 'UI/UX Designer | Learning to code',
    createdAt: new Date().toISOString(),
    following: [],
    followers: ['user-1'],
  },
];

const mockLogs: StudyLog[] = [
  {
    id: 'log-1',
    userId: 'user-1',
    date: new Date().toISOString().split('T')[0],
    duration: 120,
    category: 'Programming',
    memo: 'Built a new feature for my side project',
    outputUrl: 'https://github.com/example/repo',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    ],
    tags: ['React', 'TypeScript'],
    likes: ['user-2'],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-2',
        content: 'Great progress!',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'log-2',
    userId: 'user-2',
    date: new Date().toISOString().split('T')[0],
    duration: 90,
    category: 'Programming',
    memo: 'Contributed to open source project',
    outputUrl: 'https://zenn.dev/example/articles/sample',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    ],
    tags: ['OSS', 'JavaScript'],
    likes: ['user-1'],
    comments: [],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'log-3',
    userId: 'user-3',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    duration: 60,
    category: 'Design',
    memo: 'Learned Figma basics',
    images: [
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    ],
    tags: ['Figma', 'UI Design'],
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockThemes: Theme[] = [
  {
    id: 'theme-1',
    userId: 'user-1',
    name: 'React',
    description: 'Reactを習得する',
    color: '#61DAFB',
    createdAt: new Date().toISOString(),
  },
];

interface AppState {
  // Auth
  currentUserId: string | null;
  users: User[];
  logs: StudyLog[];
  themes: Theme[];
  notifications: Notification[];
  initialized: boolean;

  // Auth actions
  initialize: () => void;
  login: (userId: string) => void;
  logout: () => void;
  getCurrentUser: () => User | null;

  // User actions
  getUser: (userId: string) => User | null;
  getAllUsers: () => User[];
  createUser: (data: { email: string; name: string; password: string }) => User;
  updateUser: (userId: string, data: Partial<User>) => User | null;
  followUser: (followerId: string, followingId: string) => void;
  unfollowUser: (followerId: string, followingId: string) => void;

  // Log actions
  getLogs: () => StudyLog[];
  getLog: (logId: string) => StudyLog | null;
  getUserLogs: (userId: string) => StudyLog[];
  getTimelineLogs: (userId: string) => StudyLog[];
  createLog: (data: Omit<StudyLog, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>) => StudyLog;
  updateLog: (logId: string, data: Partial<StudyLog>) => StudyLog | null;
  deleteLog: (logId: string) => boolean;
  toggleLike: (logId: string, userId: string) => void;
  addComment: (logId: string, userId: string, content: string, replyToUserId?: string) => Comment | null;

  // Theme actions
  getThemes: () => Theme[];
  getUserThemes: (userId: string) => Theme[];
  createTheme: (data: Omit<Theme, 'id' | 'createdAt'>) => Theme;
  deleteTheme: (themeId: string) => boolean;

  // Notification actions
  getNotifications: (userId: string) => Notification[];
  createNotification: (data: Omit<Notification, 'id' | 'read' | 'createdAt'>) => Notification;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: (userId: string) => void;

  // Stats
  getUserStats: (userId: string, days?: number) => {
    dailyStats: { date: string; totalMinutes: number; logCount: number }[];
    categoryStats: { category: string; totalMinutes: number; percentage: number }[];
    totalMinutes: number;
    streak: number;
    logCount: number;
  };

  // Tags
  searchLogsByTag: (tag: string) => StudyLog[];
  getAllTags: () => string[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUserId: null,
      users: [],
      logs: [],
      themes: [],
      notifications: [],
      initialized: false,

      // Initialize with mock data if empty
      initialize: () => {
        const state = get();
        if (!state.initialized) {
          set({
            users: state.users.length === 0 ? mockUsers : state.users,
            logs: state.logs.length === 0 ? mockLogs : state.logs,
            themes: state.themes.length === 0 ? mockThemes : state.themes,
            initialized: true,
          });
        }
      },

      // Auth actions
      login: (userId: string) => set({ currentUserId: userId }),
      logout: () => set({ currentUserId: null }),
      getCurrentUser: () => {
        const state = get();
        if (!state.currentUserId) return null;
        return state.users.find((u) => u.id === state.currentUserId) || null;
      },

      // User actions
      getUser: (userId: string) => {
        const state = get();
        return state.users.find((u) => u.id === userId) || null;
      },
      getAllUsers: () => get().users,
      createUser: (data) => {
        const newUser: User = {
          id: uuidv4(),
          email: data.email,
          name: data.name,
          avatar: '',
          bio: '',
          createdAt: new Date().toISOString(),
          following: [],
          followers: [],
        };
        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      },
      updateUser: (userId, data) => {
        let updatedUser: User | null = null;
        set((state) => ({
          users: state.users.map((u) => {
            if (u.id === userId) {
              updatedUser = { ...u, ...data };
              return updatedUser;
            }
            return u;
          }),
        }));
        return updatedUser;
      },
      followUser: (followerId, followingId) => {
        set((state) => ({
          users: state.users.map((u) => {
            if (u.id === followerId && !u.following.includes(followingId)) {
              return { ...u, following: [...u.following, followingId] };
            }
            if (u.id === followingId && !u.followers.includes(followerId)) {
              return { ...u, followers: [...u.followers, followerId] };
            }
            return u;
          }),
        }));
        // Create notification
        get().createNotification({
          userId: followingId,
          type: 'follow',
          actorId: followerId,
        });
      },
      unfollowUser: (followerId, followingId) => {
        set((state) => ({
          users: state.users.map((u) => {
            if (u.id === followerId) {
              return { ...u, following: u.following.filter((id) => id !== followingId) };
            }
            if (u.id === followingId) {
              return { ...u, followers: u.followers.filter((id) => id !== followerId) };
            }
            return u;
          }),
        }));
      },

      // Log actions
      getLogs: () => get().logs,
      getLog: (logId) => get().logs.find((l) => l.id === logId) || null,
      getUserLogs: (userId) => {
        return get()
          .logs.filter((l) => l.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      getTimelineLogs: (userId) => {
        const user = get().getUser(userId);
        if (!user) return [];
        const followingIds = [...user.following, userId];
        return get()
          .logs.filter((l) => followingIds.includes(l.userId))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      createLog: (data) => {
        const newLog: StudyLog = {
          ...data,
          id: uuidv4(),
          likes: [],
          comments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ logs: [...state.logs, newLog] }));
        return newLog;
      },
      updateLog: (logId, data) => {
        let updatedLog: StudyLog | null = null;
        set((state) => ({
          logs: state.logs.map((l) => {
            if (l.id === logId) {
              updatedLog = { ...l, ...data, updatedAt: new Date().toISOString() };
              return updatedLog;
            }
            return l;
          }),
        }));
        return updatedLog;
      },
      deleteLog: (logId) => {
        const exists = get().logs.some((l) => l.id === logId);
        if (!exists) return false;
        set((state) => ({ logs: state.logs.filter((l) => l.id !== logId) }));
        return true;
      },
      toggleLike: (logId, userId) => {
        set((state) => ({
          logs: state.logs.map((l) => {
            if (l.id === logId) {
              const likes = l.likes.includes(userId)
                ? l.likes.filter((id) => id !== userId)
                : [...l.likes, userId];

              // Create notification if liked and not own log
              if (!l.likes.includes(userId) && l.userId !== userId) {
                get().createNotification({
                  userId: l.userId,
                  type: 'like',
                  actorId: userId,
                  targetId: logId,
                });
              }

              return { ...l, likes };
            }
            return l;
          }),
        }));
      },
      addComment: (logId, userId, content, replyToUserId) => {
        const comment: Comment = {
          id: uuidv4(),
          userId,
          content,
          replyToUserId,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          logs: state.logs.map((l) => {
            if (l.id === logId) {
              // Create notification for log owner
              if (l.userId !== userId) {
                get().createNotification({
                  userId: l.userId,
                  type: 'comment',
                  actorId: userId,
                  targetId: logId,
                });
              }
              // Create notification for mentioned user
              if (replyToUserId && replyToUserId !== userId && replyToUserId !== l.userId) {
                get().createNotification({
                  userId: replyToUserId,
                  type: 'comment',
                  actorId: userId,
                  targetId: logId,
                });
              }
              return { ...l, comments: [...l.comments, comment] };
            }
            return l;
          }),
        }));

        return comment;
      },

      // Theme actions
      getThemes: () => get().themes,
      getUserThemes: (userId) => get().themes.filter((t) => t.userId === userId),
      createTheme: (data) => {
        const newTheme: Theme = {
          ...data,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ themes: [...state.themes, newTheme] }));
        return newTheme;
      },
      deleteTheme: (themeId) => {
        const exists = get().themes.some((t) => t.id === themeId);
        if (!exists) return false;
        set((state) => ({ themes: state.themes.filter((t) => t.id !== themeId) }));
        return true;
      },

      // Notification actions
      getNotifications: (userId) => {
        return get()
          .notifications.filter((n) => n.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      createNotification: (data) => {
        const newNotification: Notification = {
          ...data,
          id: uuidv4(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notifications: [...state.notifications, newNotification] }));
        return newNotification;
      },
      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        }));
      },
      markAllNotificationsAsRead: (userId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.userId === userId ? { ...n, read: true } : n
          ),
        }));
      },

      // Stats
      getUserStats: (userId, days = 30) => {
        const logs = get().getUserLogs(userId);
        const now = new Date();
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        const dailyStats: { [key: string]: number } = {};
        const categoryStats: { [key: string]: number } = {};
        let totalMinutes = 0;

        logs.forEach((log) => {
          const logDate = new Date(log.date);
          if (logDate >= startDate) {
            const dateKey = log.date;
            dailyStats[dateKey] = (dailyStats[dateKey] || 0) + log.duration;
            categoryStats[log.category] = (categoryStats[log.category] || 0) + log.duration;
            totalMinutes += log.duration;
          }
        });

        // Calculate streak
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        while (true) {
          const dateKey = currentDate.toISOString().split('T')[0];
          if (dailyStats[dateKey]) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }

        return {
          dailyStats: Object.entries(dailyStats).map(([date, minutes]) => ({
            date,
            totalMinutes: minutes,
            logCount: logs.filter((l) => l.date === date).length,
          })),
          categoryStats: Object.entries(categoryStats).map(([category, minutes]) => ({
            category,
            totalMinutes: minutes,
            percentage: totalMinutes > 0 ? (minutes / totalMinutes) * 100 : 0,
          })),
          totalMinutes,
          streak,
          logCount: logs.filter((l) => new Date(l.date) >= startDate).length,
        };
      },

      // Tags
      searchLogsByTag: (tag) => {
        return get().logs.filter((l) =>
          l.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );
      },
      getAllTags: () => {
        const tags = new Set<string>();
        get().logs.forEach((log) => log.tags.forEach((tag) => tags.add(tag)));
        return Array.from(tags);
      },
    }),
    {
      name: 'studylog-storage',
      partialize: (state) => ({
        currentUserId: state.currentUserId,
        users: state.users,
        logs: state.logs,
        themes: state.themes,
        notifications: state.notifications,
        initialized: state.initialized,
      }),
    }
  )
);
