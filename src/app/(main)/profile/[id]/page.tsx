import { ProfileDetailContent } from '@/components/page/main/profile/detail';
import { mockUsers } from '@/lib/mockData';

export function generateStaticParams() {
  return mockUsers.map((user) => ({
    id: user.id,
  }));
}

export default function ProfilePage() {
  return <ProfileDetailContent />;
}
