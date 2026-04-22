import { DashboardOverview as DashboardOverviewView } from "@/components/DashboardOverview";
import { TopBar } from "@/components/TopBar";
import { getOverview } from "@/lib/api";

export default async function DashboardPage() {
  const overview = await getOverview();

  return (
    <div className="container">
      <TopBar />
      <DashboardOverviewView overview={overview} />
    </div>
  );
}

