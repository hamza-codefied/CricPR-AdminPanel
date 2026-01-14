import { Calendar, Trophy, Users, UsersRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  mockMatches,
  mockUsers,
} from "../../services/mockData";
import { useDashboard, useTopTalent } from "../../hooks/useDashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { format } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const matchesOverTime = [
  { month: "Jan", matches: 12 },
  { month: "Feb", matches: 19 },
  { month: "Mar", matches: 15 },
  { month: "Apr", matches: 22 },
  { month: "May", matches: 18 },
  { month: "Jun", matches: 25 },
];

const topRunScorers = [
  { name: "Virat Kohli", runs: 2345 },
  { name: "Rohit Sharma", runs: 2890 },
  { name: "MS Dhoni", runs: 2100 },
  { name: "Ravindra Jadeja", runs: 1567 },
  { name: "KL Rahul", runs: 1890 },
];

const topWicketTakers = [
  { name: "Jasprit Bumrah", wickets: 89 },
  { name: "Mohammed Shami", wickets: 76 },
  { name: "Ravindra Jadeja", wickets: 67 },
  { name: "Yuzvendra Chahal", wickets: 64 },
  { name: "Kuldeep Yadav", wickets: 58 },
];

// Map frontend role to API role
const roleMapping: Record<string, string> = {
  batsman: "Batsmen",
  bowler: "Bowler",
  allrounder: "All-rounder",
  wicketkeeper: "Wicket-keeper",
};

export function Dashboard() {
  const navigate = useNavigate();
  const [cityFilter, setCityFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("batsman");
  const [currentPage, setCurrentPage] = useState(1);
  const { dashboardData, isLoading: isLoadingDashboard } = useDashboard();

  // Map skill filter to API role format
  const apiRole = useMemo(() => {
    return roleMapping[skillFilter] || "Batsmen";
  }, [skillFilter]);

  // Prepare API params
  const topTalentParams = useMemo(() => {
    const params: { role: string; city?: string; page: number; limit: number } = {
      role: apiRole,
      page: currentPage,
      limit: 10,
    };
    // Ensure cityFilter is a string and not empty
    const cityValue = typeof cityFilter === 'string' ? cityFilter.trim() : String(cityFilter || '').trim();
    if (cityValue !== '') {
      params.city = cityValue;
    }
    return params;
  }, [apiRole, cityFilter, currentPage]);

  // Fetch top talent data
  const { topTalentData, isLoading: isLoadingTopTalent } = useTopTalent(topTalentParams);

  // Get unique cities from API response
  const cities = useMemo(() => {
    if (!topTalentData?.results) return [];
    const uniqueCities = Array.from(
      new Set(topTalentData.results.map((player) => player.city))
    ).sort();
    return uniqueCities;
  }, [topTalentData]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [cityFilter, skillFilter]);

  const skills = ["batsman", "bowler", "allrounder", "wicketkeeper"];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your cricket administration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Matches</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-primary">
              {isLoadingDashboard ? (
                <span className="text-muted-foreground">...</span>
              ) : (
                dashboardData?.matches.total ?? 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dashboardData?.matches.percentChangeSinceLastMonth !== undefined
                ? `${dashboardData.matches.percentChangeSinceLastMonth >= 0 ? '+' : ''}${dashboardData.matches.percentChangeSinceLastMonth}% from last month`
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tournaments</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {isLoadingDashboard ? (
                <span className="text-muted-foreground">...</span>
              ) : (
                dashboardData?.tournaments.total ?? 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dashboardData?.tournaments.active !== undefined
                ? `${dashboardData.tournaments.active} active tournaments`
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Teams</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {isLoadingDashboard ? (
                <span className="text-muted-foreground">...</span>
              ) : (
                dashboardData?.teams.total ?? 0
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Players</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {isLoadingDashboard ? (
                <span className="text-muted-foreground">...</span>
              ) : (
                dashboardData?.players.total ?? 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dashboardData?.players.signupsLast30Days !== undefined
                ? `${dashboardData.players.signupsLast30Days} signups last 30 days`
                : 'Active players'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Talent Section */}
      <Card>
        <CardHeader>
          <CardTitle>Top Talent</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Players with the best performances
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Select
                value={cityFilter}
                onChange={(value: string | React.ChangeEvent<HTMLSelectElement>) => {
                  // Handle both string and event object
                  const cityValue = typeof value === 'string' 
                    ? value 
                    : (value as React.ChangeEvent<HTMLSelectElement>)?.target?.value || '';
                  setCityFilter(cityValue);
                }}
                placeholder="All Cities"
                className="sm:w-[200px]"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
              <Select
                value={skillFilter}
                onChange={(value: string | React.ChangeEvent<HTMLSelectElement>) => {
                  // Handle both string and event object
                  const skillValue = typeof value === 'string' 
                    ? value 
                    : (value as React.ChangeEvent<HTMLSelectElement>)?.target?.value || 'batsman';
                  setSkillFilter(skillValue);
                }}
                placeholder="Select Skill"
                className="sm:w-[200px]"
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Top Talent Table */}
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              {isLoadingTopTalent ? (
                <div className="h-24 flex items-center justify-center">
                  <span className="text-muted-foreground">Loading players...</span>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Runs</TableHead>
                        <TableHead>Wickets</TableHead>
                        <TableHead>Average</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!topTalentData?.results || topTalentData.results.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No players found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        topTalentData.results.map((player) => (
                          <TableRow
                            key={player.playerId}
                            className="cursor-pointer hover:bg-primary/5 transition-colors"
                            onClick={() => navigate(`/players/${player.playerId}`)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={player.teams[0]?.logo}
                                    alt={player.name}
                                  />
                                  <AvatarFallback className="bg-primary text-white">
                                    {player.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{player.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {player.teams[0]?.name || "N/A"}
                            </TableCell>
                            <TableCell>{player.city}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {player.playingRole}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {player.stats.runs}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {player.stats.wickets}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {player.stats.average.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                  
                  {/* Pagination */}
                  {topTalentData && topTalentData.totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-borderShadcn/50">
                      <div className="text-sm text-muted-foreground">
                        Showing page {topTalentData.page} of {topTalentData.totalPages} 
                        {" "}({topTalentData.totalResults} total results)
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1 || isLoadingTopTalent}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, topTalentData.totalPages) }, (_, i) => {
                            let pageNum;
                            if (topTalentData.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= topTalentData.totalPages - 2) {
                              pageNum = topTalentData.totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                disabled={isLoadingTopTalent}
                                className="min-w-[40px]"
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(topTalentData.totalPages, prev + 1))}
                          disabled={currentPage === topTalentData.totalPages || isLoadingTopTalent}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Matches Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={matchesOverTime}>
                <defs>
                  <linearGradient
                    id="matchesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0E795D" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0E795D" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="matches"
                  stroke="#0E795D"
                  strokeWidth={3}
                  dot={{ fill: "#0E795D", r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E795D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0E795D" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest User Signups</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Recent 30 users who joined the app
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <div className="max-h-[400px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Signup Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.slice(0, 30).map((user) => (
                      <TableRow key={user.id} className="hover:bg-primary/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.profileImage} alt={user.name} />
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {format(new Date(user.signupDate), 'MMM dd, yyyy')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(user.signupDate), 'hh:mm a')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Run Scorers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRunScorers} layout="vertical">
                <defs>
                  <linearGradient
                    id="runsScorersGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#0E795D" stopOpacity={1} />
                    <stop offset="100%" stopColor="#15B58B" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  opacity={0.3}
                />
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="runs"
                  fill="url(#runsScorersGradient)"
                  radius={[0, 8, 8, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Wicket Takers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topWicketTakers} layout="vertical">
                <defs>
                  <linearGradient
                    id="wicketsTakersGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#01411C" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0E795D" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  opacity={0.3}
                />
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  stroke="#6B7280"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="wickets"
                  fill="url(#wicketsTakersGradient)"
                  radius={[0, 8, 8, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMatches.slice(0, 10).map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    {match.teamA} vs {match.teamB}
                  </TableCell>
                  <TableCell>{match.tournament}</TableCell>
                  <TableCell>
                    {format(new Date(match.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        match.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : match.status === "live"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {match.status}
                    </span>
                  </TableCell>
                  <TableCell>{match.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
