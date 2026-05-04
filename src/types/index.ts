export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  following: string[];
  followers: string[];
}

export interface StudyLog {
  id: string;
  userId: string;
  date: string;
  duration: number; // minutes
  category: string;
  memo?: string;
  outputUrl?: string;
  images?: string[]; // Array of image URLs/base64
  tags: string[];
  themeId?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  replyToUserId?: string; // Mention/reply to specific user
  createdAt: string;
}

export interface Theme {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow';
  actorId: string;
  targetId?: string;
  read: boolean;
  createdAt: string;
}

export interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  url: string;
}

export interface DailyStats {
  date: string;
  totalMinutes: number;
  logCount: number;
}

export interface CategoryStats {
  category: string;
  totalMinutes: number;
  percentage: number;
}
