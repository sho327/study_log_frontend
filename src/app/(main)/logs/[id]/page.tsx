import { LogDetailContent } from '@/components/page/main/logs/detail';
import { mockLogs } from '@/lib/mockData';

export function generateStaticParams() {
  return mockLogs.map((log) => ({
    id: log.id,
  }));
}

export default function LogDetailPage() {
  return <LogDetailContent />;
}
