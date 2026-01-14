import { Calendar, Trophy, Users, UsersRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { DashboardNumbersResponse } from "../../../services/dashboardApi";

interface DashboardStatsProps {
  data: DashboardNumbersResponse | undefined;
  isLoading: boolean;
}

export function DashboardStats({ data, isLoading }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Matches
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold text-primary">
            {isLoading ? (
              <span className="text-muted-foreground">...</span>
            ) : (
              data?.matches.total ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.matches.percentChangeSinceLastMonth !== undefined
              ? `${data.matches.percentChangeSinceLastMonth >= 0 ? '+' : ''}${data.matches.percentChangeSinceLastMonth}% from last month`
              : 'Loading...'}
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tournaments
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {isLoading ? (
              <span className="text-muted-foreground">...</span>
            ) : (
              data?.tournaments.total ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.tournaments.active !== undefined
              ? `${data.tournaments.active} active tournaments`
              : 'Loading...'}
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <UsersRound className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Teams
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {isLoading ? (
              <span className="text-muted-foreground">...</span>
            ) : (
              data?.teams.total ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Registered teams</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Users className="h-5 w-5 text-green-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Players
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {isLoading ? (
              <span className="text-muted-foreground">...</span>
            ) : (
              data?.players.total ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.players.signupsLast30Days !== undefined
              ? `${data.players.signupsLast30Days} signups last 30 days`
              : 'Active players'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

