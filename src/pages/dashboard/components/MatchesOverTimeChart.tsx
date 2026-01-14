import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MatchesOverTime } from "../../../services/dashboardApi";

interface MatchesOverTimeChartProps {
  data: MatchesOverTime[] | undefined;
  isLoading: boolean;
}

export function MatchesOverTimeChart({ data, isLoading }: MatchesOverTimeChartProps) {
  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <CardTitle>Matches Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <span className="text-muted-foreground">Loading chart data...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data || []}>
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
                dataKey="label"
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
                dataKey="count"
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
        )}
      </CardContent>
    </Card>
  );
}

