import type { User, StudyLog, Theme } from '@/types';

// Mock data for demo
export const mockUsers: User[] = [
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

export const mockLogs: StudyLog[] = [
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

export const mockThemes: Theme[] = [
  {
    id: 'theme-1',
    userId: 'user-1',
    name: 'React',
    description: 'Reactを習得する',
    color: '#61DAFB',
    createdAt: new Date().toISOString(),
  },
];
