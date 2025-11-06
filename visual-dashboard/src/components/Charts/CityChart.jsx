import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function CityChart({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Group data by city and calculate average relevance
  const cityData = data.reduce((acc, item) => {
    const city = item.city || "Unknown";
    if (!acc[city]) {
      acc[city] = { city, relevance: 0, count: 0 };
    }
    acc[city].relevance += item.relevance || 0;
    acc[city].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(cityData)
    .map((item) => ({
      city: item.city.length > 12 ? `${item.city.substring(0, 12)}...` : item.city,
      relevance: Math.round((item.relevance / item.count) * 10) / 10,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 15);

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
        Average Relevance by City (Top 15)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />
          <XAxis
            dataKey="city"
            tick={{ fill: textColor, fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${isDark ? "#00FFFF" : "#3B82F6"}`,
              borderRadius: "8px",
              color: isDark ? "#F3F4F6" : "#1F2937",
            }}
          />
          <Line
            type="monotone"
            dataKey="relevance"
            stroke={isDark ? "#00FFFF" : "#3B82F6"}
            strokeWidth={3}
            dot={{ fill: isDark ? "#00FFFF" : "#3B82F6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

