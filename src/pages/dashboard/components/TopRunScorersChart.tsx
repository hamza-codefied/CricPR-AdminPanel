import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TopRunScorer } from "../../../services/dashboardApi";

interface TopRunScorersChartProps {
  data: TopRunScorer[] | undefined;
  isLoading: boolean;
}

export function TopRunScorersChart({ data, isLoading }: TopRunScorersChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Run Scorers</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <span className="text-muted-foreground">Loading chart data...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data || []} layout="vertical">
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
        )}
      </CardContent>
    </Card>
  );
}

