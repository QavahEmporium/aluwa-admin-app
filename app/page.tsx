// app/home/page.tsx (Server Component)
import DashboardLayout from "@/components/(dashboard)/home/home-page";
import { getStatsData } from "@/data/dashabord";

export default async function HomePage() {
  const stats = await getStatsData();

  return <DashboardLayout stats={stats} />;
}
