'use client';

import { ClientMainLayout } from '@/components/layout/clientMainLayout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientMainLayout>{children}</ClientMainLayout>;
}
