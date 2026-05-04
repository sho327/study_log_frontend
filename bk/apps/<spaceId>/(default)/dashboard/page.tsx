// Components
import Dashboard from "@/components/page/main/dashboard";

export default async function SpaceDashboardPage({ params }: { params: { spaceId: string } }) {
  const { spaceId } = await params;
  return <Dashboard />;
}
