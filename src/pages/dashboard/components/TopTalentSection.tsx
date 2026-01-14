import { useState, useMemo, useEffect } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Select } from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useTopTalent } from "../../../hooks/useDashboard";
import type { TopTalentResponse } from "../../../services/dashboardApi";
import { ROLE_MAPPING } from "../constants";

interface TopTalentSectionProps {
  initialSkillFilter?: string;
}

export function TopTalentSection({ initialSkillFilter = "batsman" }: TopTalentSectionProps) {
  const navigate = useNavigate();
  const [cityFilter, setCityFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState(initialSkillFilter);
  const [currentPage, setCurrentPage] = useState(1);

  // Map skill filter to API role format
  const apiRole = useMemo(() => {
    return ROLE_MAPPING[skillFilter] || "Batsmen";
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
  );
}

