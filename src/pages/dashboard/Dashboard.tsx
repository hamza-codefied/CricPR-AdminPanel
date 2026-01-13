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
  mockDashboardStats,
  mockMatches,
  mockPlayers,
  mockUsers,
} from "../../services/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
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

export function Dashboard() {
  const navigate = useNavigate();
  const [cityFilter, setCityFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  // Top Talent data with additional fields
  const topTalent = mockPlayers.map((player, index) => ({
    ...player,
    city: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"][index % 5],
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      player.name
    )}&background=0E795D&color=fff&size=128`,
    performance: Math.floor(Math.random() * 100) + 80, // Performance score 80-180
  }));

  const filteredTopTalent = topTalent.filter((player) => {
    if (cityFilter && player.city !== cityFilter) return false;
    if (skillFilter && player.role !== skillFilter) return false;
    return true;
  });

  const cities = Array.from(new Set(topTalent.map((p) => p.city)));
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
            <div className="text-3xl font-bold text-primary">{mockDashboardStats.totalMatches}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
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
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{mockDashboardStats.totalTournaments}</div>
            <p className="text-xs text-muted-foreground mt-1">Active tournaments</p>
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
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{mockDashboardStats.totalTeams}</div>
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
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{mockDashboardStats.totalPlayers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active players</p>
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
                onChange={setCityFilter}
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
                onChange={setSkillFilter}
                placeholder="All Skills"
                className="sm:w-[200px]"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Top Talent Table */}
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Runs</TableHead>
                    <TableHead>Wickets</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTopTalent.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No players found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTopTalent.map((player) => (
                      <TableRow
                        key={player.id}
                        className="cursor-pointer hover:bg-primary/5 transition-colors"
                        onClick={() => navigate(`/players/${player.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={player.profileImage}
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
                        <TableCell>{player.team}</TableCell>
                        <TableCell>{player.city}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {player.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {player.runs}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {player.wickets}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-button-gradient rounded-full transition-all"
                                style={{
                                  width: `${(player.performance / 200) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">
                              {player.performance}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              player.status === "active"
                                ? "success"
                                : "secondary"
                            }
                          >
                            {player.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
