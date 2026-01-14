import { useDashboard, useRecentMatches, useRecentSignups, useTopRunsAndWickets } from "../../hooks/useDashboard";
import { DashboardStats } from "./components/DashboardStats";
import { TopTalentSection } from "./components/TopTalentSection";
import { MatchesOverTimeChart } from "./components/MatchesOverTimeChart";
import { LatestUserSignupsTable } from "./components/LatestUserSignupsTable";
import { TopRunScorersChart } from "./components/TopRunScorersChart";
import { TopWicketTakersChart } from "./components/TopWicketTakersChart";
import { RecentMatchesTable } from "./components/RecentMatchesTable";

export function Dashboard() {
  const { dashboardData, isLoading: isLoadingDashboard } = useDashboard();
  const { recentMatchesData, isLoading: isLoadingRecentMatches } = useRecentMatches({
    matches: 5,
    page: 1,
  });
  const { recentSignupsData, isLoading: isLoadingRecentSignups } = useRecentSignups();
  const { topRunsAndWicketsData, isLoading: isLoadingTopRunsAndWickets } = useTopRunsAndWickets({
    runScorers: 5,
    wicketTakers: 5,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your cricket administration
        </p>
      </div>

      <DashboardStats data={dashboardData} isLoading={isLoadingDashboard} />

      <TopTalentSection />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-10">
        <MatchesOverTimeChart 
          data={recentMatchesData?.matchesOverTime} 
          isLoading={isLoadingRecentMatches} 
        />
        <LatestUserSignupsTable 
          data={recentSignupsData?.results} 
          isLoading={isLoadingRecentSignups} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopRunScorersChart 
          data={topRunsAndWicketsData?.runScorers} 
          isLoading={isLoadingTopRunsAndWickets} 
        />
        <TopWicketTakersChart 
          data={topRunsAndWicketsData?.wicketTakers} 
          isLoading={isLoadingTopRunsAndWickets} 
        />
      </div>

      <RecentMatchesTable 
        data={recentMatchesData?.matches} 
        isLoading={isLoadingRecentMatches} 
      />
    </div>
  );
}
