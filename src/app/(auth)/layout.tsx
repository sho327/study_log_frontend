'use client';

import { ClientAuthLayout } from '@/components/layout/clientAuthLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAuthLayout>{children}</ClientAuthLayout>;
}
