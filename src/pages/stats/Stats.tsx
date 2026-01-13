import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/common/PageHeader'
import { TrendingUp, Target, Zap, Award, Trophy } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'

const topRunScorers = [
  { name: 'Virat Kohli', runs: 2345, matches: 45 },
  { name: 'Rohit Sharma', runs: 2890, matches: 48 },
  { name: 'MS Dhoni', runs: 2100, matches: 52 },
  { name: 'Ravindra Jadeja', runs: 1567, matches: 50 },
  { name: 'KL Rahul', runs: 1890, matches: 42 },
]

const topWicketTakers = [
  { name: 'Jasprit Bumrah', wickets: 89, matches: 42 },
  { name: 'Mohammed Shami', wickets: 76, matches: 38 },
  { name: 'Ravindra Jadeja', wickets: 67, matches: 50 },
  { name: 'Yuzvendra Chahal', wickets: 64, matches: 40 },
  { name: 'Kuldeep Yadav', wickets: 58, matches: 35 },
]

export function Stats() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Statistics"
        description="Comprehensive statistics and analytics"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sixes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">Maximum sixes hit</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Fours</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3,456</div>
            <p className="text-xs text-muted-foreground mt-1">Total boundaries</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Target className="h-5 w-5 text-orange-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Extras</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">567</div>
            <p className="text-xs text-muted-foreground mt-1">Extra runs conceded</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Award className="h-5 w-5 text-green-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Highest Team Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">285/6</div>
            <p className="text-xs text-muted-foreground mt-1">Best team score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-borderShadcn/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Run Scorers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Rank</TableHead>
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Runs</TableHead>
                    <TableHead className="font-semibold text-right">Matches</TableHead>
                    <TableHead className="font-semibold text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRunScorers.map((player, idx) => {
                    const playerImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=0E795D&color=fff&size=128`
                    return (
                      <TableRow key={player.name} className="hover:bg-primary/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {idx === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                            {idx === 1 && <Award className="h-4 w-4 text-gray-400" />}
                            {idx === 2 && <Award className="h-4 w-4 text-orange-500" />}
                            {idx > 2 && <span className="w-4 text-center font-bold">{idx + 1}</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={playerImage} alt={player.name} />
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {player.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{player.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {player.runs.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{player.matches}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-primary">
                            {(player.runs / player.matches).toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-borderShadcn/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-500/5">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Top Wicket Takers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Rank</TableHead>
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Wickets</TableHead>
                    <TableHead className="font-semibold text-right">Matches</TableHead>
                    <TableHead className="font-semibold text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topWicketTakers.map((player, idx) => {
                    const playerImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=0E795D&color=fff&size=128`
                    return (
                      <TableRow key={player.name} className="hover:bg-primary/5 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {idx === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                            {idx === 1 && <Award className="h-4 w-4 text-gray-400" />}
                            {idx === 2 && <Award className="h-4 w-4 text-orange-500" />}
                            {idx > 2 && <span className="w-4 text-center font-bold">{idx + 1}</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={playerImage} alt={player.name} />
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {player.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{player.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            {player.wickets}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{player.matches}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-primary">
                            {(player.wickets / player.matches).toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-borderShadcn/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Best Batting Averages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Total Runs</TableHead>
                    <TableHead className="font-semibold text-right">Matches</TableHead>
                    <TableHead className="font-semibold text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRunScorers
                    .map((p) => ({
                      name: p.name,
                      runs: p.runs,
                      matches: p.matches,
                      average: parseFloat((p.runs / p.matches).toFixed(2)),
                    }))
                    .sort((a, b) => b.average - a.average)
                    .map((player) => {
                      const playerImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=0E795D&color=fff&size=128`
                      return (
                        <TableRow key={player.name} className="hover:bg-primary/5 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={playerImage} alt={player.name} />
                                <AvatarFallback className="bg-primary text-white text-xs">
                                  {player.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              {player.runs.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right">
                            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                              {player.average.toFixed(2)}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-borderShadcn/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Best Bowling Averages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-xl border-2 border-borderShadcn/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Player</TableHead>
                    <TableHead className="font-semibold text-right">Total Wickets</TableHead>
                    <TableHead className="font-semibold text-right">Matches</TableHead>
                    <TableHead className="font-semibold text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topWicketTakers
                    .map((p) => ({
                      name: p.name,
                      wickets: p.wickets,
                      matches: p.matches,
                      average: parseFloat((p.wickets / p.matches).toFixed(2)),
                    }))
                    .sort((a, b) => b.average - a.average)
                    .map((player) => {
                      const playerImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=0E795D&color=fff&size=128`
                      return (
                        <TableRow key={player.name} className="hover:bg-primary/5 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={playerImage} alt={player.name} />
                                <AvatarFallback className="bg-primary text-white text-xs">
                                  {player.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-red-600 dark:text-red-400">
                              {player.wickets}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {player.average.toFixed(2)}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

