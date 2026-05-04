'use client';

import { useAuth } from '@/components/providers/mantineProvider';
import { AuthApiDocsContent, ApiDocsContent } from '@/components/page/auth/api-docs';
import { ClientMainLayout } from '@/components/layout/clientMainLayout';

export default function AuthApiDocsPage() {
  const { user } = useAuth();

  if (!user) {
    return <AuthApiDocsContent />;
  }

  return (
    <ClientMainLayout>
      <ApiDocsContent />
    </ClientMainLayout>
  );
}
