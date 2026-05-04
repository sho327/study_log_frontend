'use client';

import { v4 as uuidv4 } from 'uuid';
import type { User, StudyLog, Theme, Notification, Comment } from './types';

const STORAGE_KEYS = {
  USERS: 'knolty_users',
  LOGS: 'knolty_logs',
  THEMES: 'knolty_themes',
  NOTIFICATIONS: 'knolty_notifications',
  CURRENT_USER: 'knolty_current_user',
};

// Helper functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Mock data for demo
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@knolty.com',
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
    name: 'React Mastery',
    description: 'Becoming proficient in React ecosystem',
    color: '#61DAFB',
    createdAt: new Date().toISOString(),
  },
];

// Initialize storage with mock data
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setToStorage(STORAGE_KEYS.USERS, mockUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
    setToStorage(STORAGE_KEYS.LOGS, mockLogs);
  }
  if (!localStorage.getItem(STORAGE_KEYS.THEMES)) {
    setToStorage(STORAGE_KEYS.THEMES, mockThemes);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, []);
  }
}

// User functions
export function getCurrentUser(): User | null {
  const userId = getFromStorage<string | null>(STORAGE_KEYS.CURRENT_USER, null);
  if (!userId) return null;
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  return users.find((u) => u.id === userId) || null;
}

export function setCurrentUser(userId: string | null): void {
  setToStorage(STORAGE_KEYS.CURRENT_USER, userId);
}

export function getUser(userId: string): User | null {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  return users.find((u) => u.id === userId) || null;
}

export function getAllUsers(): User[] {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
}

export function createUser(data: { email: string; name: string; password: string }): User {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
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
  users.push(newUser);
  setToStorage(STORAGE_KEYS.USERS, users);
  return newUser;
}

export function updateUser(userId: string, data: Partial<User>): User | null {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data };
  setToStorage(STORAGE_KEYS.USERS, users);
  return users[index];
}

export function followUser(followerId: string, followingId: string): void {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  const follower = users.find((u) => u.id === followerId);
  const following = users.find((u) => u.id === followingId);
  
  if (follower && following) {
    if (!follower.following.includes(followingId)) {
      follower.following.push(followingId);
    }
    if (!following.followers.includes(followerId)) {
      following.followers.push(followerId);
    }
    setToStorage(STORAGE_KEYS.USERS, users);
    
    // Create notification
    createNotification({
      userId: followingId,
      type: 'follow',
      actorId: followerId,
    });
  }
}

export function unfollowUser(followerId: string, followingId: string): void {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  const follower = users.find((u) => u.id === followerId);
  const following = users.find((u) => u.id === followingId);
  
  if (follower && following) {
    follower.following = follower.following.filter((id) => id !== followingId);
    following.followers = following.followers.filter((id) => id !== followerId);
    setToStorage(STORAGE_KEYS.USERS, users);
  }
}

// Study Log functions
export function getLogs(): StudyLog[] {
  return getFromStorage<StudyLog[]>(STORAGE_KEYS.LOGS, []);
}

export function getLog(logId: string): StudyLog | null {
  const logs = getLogs();
  return logs.find((l) => l.id === logId) || null;
}

export function getUserLogs(userId: string): StudyLog[] {
  const logs = getLogs();
  return logs.filter((l) => l.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTimelineLogs(userId: string): StudyLog[] {
  const user = getUser(userId);
  if (!user) return [];
  
  const logs = getLogs();
  const followingIds = [...user.following, userId];
  
  return logs
    .filter((l) => followingIds.includes(l.userId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createLog(data: Omit<StudyLog, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>): StudyLog {
  const logs = getLogs();
  const newLog: StudyLog = {
    ...data,
    id: uuidv4(),
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  logs.push(newLog);
  setToStorage(STORAGE_KEYS.LOGS, logs);
  return newLog;
}

export function updateLog(logId: string, data: Partial<StudyLog>): StudyLog | null {
  const logs = getLogs();
  const index = logs.findIndex((l) => l.id === logId);
  if (index === -1) return null;
  logs[index] = { ...logs[index], ...data, updatedAt: new Date().toISOString() };
  setToStorage(STORAGE_KEYS.LOGS, logs);
  return logs[index];
}

export function deleteLog(logId: string): boolean {
  const logs = getLogs();
  const filtered = logs.filter((l) => l.id !== logId);
  if (filtered.length === logs.length) return false;
  setToStorage(STORAGE_KEYS.LOGS, filtered);
  return true;
}

export function toggleLike(logId: string, userId: string): void {
  const logs = getLogs();
  const log = logs.find((l) => l.id === logId);
  if (!log) return;
  
  if (log.likes.includes(userId)) {
    log.likes = log.likes.filter((id) => id !== userId);
  } else {
    log.likes.push(userId);
    // Create notification
    if (log.userId !== userId) {
      createNotification({
        userId: log.userId,
        type: 'like',
        actorId: userId,
        targetId: logId,
      });
    }
  }
  setToStorage(STORAGE_KEYS.LOGS, logs);
}

export function addComment(logId: string, userId: string, content: string, replyToUserId?: string): Comment | null {
  const logs = getLogs();
  const log = logs.find((l) => l.id === logId);
  if (!log) return null;
  
  const comment: Comment = {
    id: uuidv4(),
    userId,
    content,
    replyToUserId,
    createdAt: new Date().toISOString(),
  };
  log.comments.push(comment);
  setToStorage(STORAGE_KEYS.LOGS, logs);
  
  // Create notification for log owner
  if (log.userId !== userId) {
    createNotification({
      userId: log.userId,
      type: 'comment',
      actorId: userId,
      targetId: logId,
    });
  }
  
  // Create notification for mentioned user (if different from log owner and commenter)
  if (replyToUserId && replyToUserId !== userId && replyToUserId !== log.userId) {
    createNotification({
      userId: replyToUserId,
      type: 'comment',
      actorId: userId,
      targetId: logId,
    });
  }
  
  return comment;
}

// Theme functions
export function getThemes(): Theme[] {
  return getFromStorage<Theme[]>(STORAGE_KEYS.THEMES, []);
}

export function getUserThemes(userId: string): Theme[] {
  const themes = getThemes();
  return themes.filter((t) => t.userId === userId);
}

export function createTheme(data: Omit<Theme, 'id' | 'createdAt'>): Theme {
  const themes = getThemes();
  const newTheme: Theme = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  themes.push(newTheme);
  setToStorage(STORAGE_KEYS.THEMES, themes);
  return newTheme;
}

export function deleteTheme(themeId: string): boolean {
  const themes = getThemes();
  const filtered = themes.filter((t) => t.id !== themeId);
  if (filtered.length === themes.length) return false;
  setToStorage(STORAGE_KEYS.THEMES, filtered);
  return true;
}

// Notification functions
export function getNotifications(userId: string): Notification[] {
  const notifications = getFromStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createNotification(data: Omit<Notification, 'id' | 'read' | 'createdAt'>): Notification {
  const notifications = getFromStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  const newNotification: Notification = {
    ...data,
    id: uuidv4(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(newNotification);
  setToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  return newNotification;
}

export function markNotificationAsRead(notificationId: string): void {
  const notifications = getFromStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
}

export function markAllNotificationsAsRead(userId: string): void {
  const notifications = getFromStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  notifications.forEach((n) => {
    if (n.userId === userId) {
      n.read = true;
    }
  });
  setToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
}

// Stats functions
export function getUserStats(userId: string, days: number = 30) {
  const logs = getUserLogs(userId);
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
    dailyStats: Object.entries(dailyStats).map(([date, totalMinutes]) => ({
      date,
      totalMinutes,
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
}

// Search by tags
export function searchLogsByTag(tag: string): StudyLog[] {
  const logs = getLogs();
  return logs.filter((l) => l.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())));
}

// Get all unique tags
export function getAllTags(): string[] {
  const logs = getLogs();
  const tags = new Set<string>();
  logs.forEach((log) => log.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
