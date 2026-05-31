'use client';

import { useCurrentUser } from '@/stores';
import { AuthApiDocsContent, ApiDocsContent } from '@/components/page/auth/api-docs';
import { ClientMainLayout } from '@/components/layout/clientMainLayout';

export default function AuthApiDocsPage() {
  const user = useCurrentUser();

  if (!user) {
    return <AuthApiDocsContent />;
  }

  return (
    <ClientMainLayout>
      <ApiDocsContent />
    </ClientMainLayout>
  );
}

