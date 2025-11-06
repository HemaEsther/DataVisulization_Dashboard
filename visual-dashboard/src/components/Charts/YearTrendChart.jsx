import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function YearTrendChart({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Aggregate by year
  const yearData = data.reduce((acc, item) => {
    const year = item.end_year || "Unknown";
    if (year !== "Unknown" && year !== null && year !== undefined) {
      if (!acc[year]) {
        acc[year] = { year, intensity: 0, likelihood: 0, relevance: 0, count: 0 };
      }
      acc[year].intensity += item.intensity || 0;
      acc[year].likelihood += item.likelihood || 0;
      acc[year].relevance += item.relevance || 0;
      acc[year].count += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(yearData)
    .map((item) => ({
      year: item.year.toString(),
      intensity: Math.round(item.intensity / item.count),
      likelihood: Math.round(item.likelihood / item.count),
      relevance: Math.round((item.relevance / item.count) * 10) / 10,
    }))
    .sort((a, b) => a.year - b.year);

  if (chartData.length === 0) {
    return (
      <div
        className={`${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-white to-gray-50"} rounded-2xl shadow-xl p-6 border ${isDark ? "border-gray-700" : "border-gray-200"} text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        No data available
      </div>
    );
  }

  const textColor = isDark ? "#9CA3AF" : "#4B5563";
  const bgColor = isDark ? "#1F2937" : "#FFFFFF";
  const gridColor = isDark ? "#374151" : "#E5E7EB";

  return (
    <div
      className={`${isDark ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" : "bg-gradient-to-br from-white to-gray-50/90"} rounded-2xl shadow-xl p-6 border ${isDark ? "border-gray-700 hover:border-cyan-400" : "border-gray-200 hover:border-blue-400"} transition-all duration-300 backdrop-blur-md`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${isDark ? "text-cyan-400" : "text-blue-600"} tracking-wide`}
      >
        Yearly Trends
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />
          <XAxis dataKey="year" tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${isDark ? "#00FFFF" : "#3B82F6"}`,
              borderRadius: "8px",
              color: isDark ? "#F3F4F6" : "#1F2937",
            }}
          />
          <Area
            type="monotone"
            dataKey="intensity"
            stackId="1"
            stroke={isDark ? "#8B5CF6" : "#6366F1"}
            fill={isDark ? "#8B5CF6" : "#6366F1"}
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="likelihood"
            stackId="2"
            stroke={isDark ? "#10B981" : "#10B981"}
            fill={isDark ? "#10B981" : "#10B981"}
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
