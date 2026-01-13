import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Activity, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { mockMatches } from '../../services/mockData'
import { format } from 'date-fns'

export function MatchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = mockMatches.find((m) => m.id === id)

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Match not found</p>
        <Button onClick={() => navigate('/matches')} className="mt-4">
          Back to Matches
        </Button>
      </div>
    )
  }

  const teamALogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(match.teamA)}&background=0E795D&color=fff&size=128`
  const teamBLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(match.teamB)}&background=01411C&color=fff&size=128`

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={() => navigate('/matches')}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Matches
      </Button>

      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary-dark p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0aDEyem0wLTI0djI2SDI0VjEwaDEyem0yNCAwaC0xMnYyNmgxMlYxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative">
          <div className="flex flex-col items-center gap-6 pt-8">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2">
                {match.tournament}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                {match.teamA} vs {match.teamB}
              </h1>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24 border-4 border-white/30 shadow-xl ring-4 ring-white/20">
                  <AvatarImage src={teamALogo} alt={match.teamA} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl backdrop-blur-sm">
                    {match.teamA
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white font-semibold text-lg">{match.teamA}</span>
              </div>
              <div className="text-white text-2xl font-bold">VS</div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24 border-4 border-white/30 shadow-xl ring-4 ring-white/20">
                  <AvatarImage src={teamBLogo} alt={match.teamB} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl backdrop-blur-sm">
                    {match.teamB
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white font-semibold text-lg">{match.teamB}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <Badge
                variant={
                  match.status === 'completed'
                    ? 'success'
                    : match.status === 'live'
                    ? 'destructive'
                    : 'secondary'
                }
                className="bg-white/20 border-white/30 backdrop-blur-sm"
              >
                {match.status}
              </Badge>
              {match.result && (
                <span className="text-sm font-medium">{match.result}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Information and Scores */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-borderShadcn/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Match Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold">{format(new Date(match.date), 'MMM dd, yyyy')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold">{match.time}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <MapPin className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold">{match.location}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold capitalize">{match.status}</p>
                </div>
              </div>
              <Badge
                variant={
                  match.status === 'completed'
                    ? 'success'
                    : match.status === 'live'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {match.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={teamALogo} alt={match.teamA} />
                <AvatarFallback className="bg-primary text-white text-xs">
                  {match.teamA
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">{match.teamA}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary">{match.teamAScore}</div>
              <p className="text-xs text-muted-foreground mt-1">Team Score</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-borderShadcn/30">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/10">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Top Batsman</p>
                    <p className="text-sm font-semibold">Player 1</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">85*</p>
                  <p className="text-xs text-muted-foreground">Runs</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Top Bowler</p>
                    <p className="text-sm font-semibold">Player 3</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">3/28</p>
                  <p className="text-xs text-muted-foreground">Wickets</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={teamBLogo} alt={match.teamB} />
                <AvatarFallback className="bg-primary-dark text-white text-xs">
                  {match.teamB
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">{match.teamB}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary-dark">{match.teamBScore}</div>
              <p className="text-xs text-muted-foreground mt-1">Team Score</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-borderShadcn/30">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/10">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Top Batsman</p>
                    <p className="text-sm font-semibold">Player 2</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">72</p>
                  <p className="text-xs text-muted-foreground">Runs</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Top Bowler</p>
                    <p className="text-sm font-semibold">Player 4</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">2/35</p>
                  <p className="text-xs text-muted-foreground">Wickets</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scorecard */}
      <Card className="border-2 border-borderShadcn/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Match Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Team A Batting */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teamALogo} alt={match.teamA} />
                <AvatarFallback className="bg-primary text-white text-xs">
                  {match.teamA
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{match.teamA} - Batting</h3>
            </div>
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Runs</TableHead>
                    <TableHead className="font-semibold text-right">Balls</TableHead>
                    <TableHead className="font-semibold text-right">4s</TableHead>
                    <TableHead className="font-semibold text-right">6s</TableHead>
                    <TableHead className="font-semibold text-right">SR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const runs = Math.floor(Math.random() * 100)
                    const balls = Math.floor(Math.random() * 50)
                    const fours = Math.floor(Math.random() * 10)
                    const sixes = Math.floor(Math.random() * 5)
                    const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : '0.00'
                    return (
                      <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">Player {i}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-green-600 dark:text-green-400">{runs}</span>
                        </TableCell>
                        <TableCell className="text-right">{balls}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-blue-600 dark:text-blue-400">{fours}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-purple-600 dark:text-purple-400">{sixes}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-yellow-600 dark:text-yellow-400">{sr}</span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Team B Bowling */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teamBLogo} alt={match.teamB} />
                <AvatarFallback className="bg-primary-dark text-white text-xs">
                  {match.teamB
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{match.teamB} - Bowling</h3>
            </div>
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Overs</TableHead>
                    <TableHead className="font-semibold text-right">Runs</TableHead>
                    <TableHead className="font-semibold text-right">Wickets</TableHead>
                    <TableHead className="font-semibold text-right">Economy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const overs = (Math.random() * 4 + 1).toFixed(1)
                    const runs = Math.floor(Math.random() * 30)
                    const wickets = Math.floor(Math.random() * 3)
                    const economy = parseFloat(overs) > 0 ? (runs / parseFloat(overs)).toFixed(2) : '0.00'
                    return (
                      <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">Player {i}</TableCell>
                        <TableCell className="text-right">{overs}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-red-600 dark:text-red-400">{runs}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-green-600 dark:text-green-400">{wickets}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{economy}</span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

