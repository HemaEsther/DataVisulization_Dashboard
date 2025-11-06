import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function TopicsChart({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Group by topic and count occurrences
  const topicData = data.reduce((acc, item) => {
    const topic = item.topic || "Unknown";
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(topicData)
    .map(([topic, count]) => ({
      topic: topic.length > 20 ? `${topic.substring(0, 20)}...` : topic,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (chartData.length === 0) {
    return (
      <div
        className={`${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-white to-gray-50"} rounded-2xl shadow-xl p-6 border ${isDark ? "border-gray-700" : "border-gray-200"} text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        No data available
      </div>
    );
  }

  const colors = isDark
    ? ["#00FFFF", "#FF00FF", "#FFD700", "#00FF7F", "#1E90FF", "#FF4500", "#ADFF2F", "#FF1493"]
    : ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#14B8A6"];

  const textColor = isDark ? "#9CA3AF" : "#4B5563";
  const bgColor = isDark ? "#1F2937" : "#FFFFFF";

  return (
    <div
      className={`${isDark ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" : "bg-gradient-to-br from-white to-gray-50/90"} rounded-2xl shadow-xl p-6 border ${isDark ? "border-gray-700 hover:border-cyan-400" : "border-gray-200 hover:border-blue-400"} transition-all duration-300 backdrop-blur-md`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${isDark ? "text-cyan-400" : "text-blue-600"} tracking-wide text-center`}
      >
        Data Distribution by Topics
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="topic"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={3}
            label={({ topic, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke={isDark ? "#0a0a0a" : "#FFFFFF"}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${isDark ? "#00FFFF" : "#3B82F6"}`,
              borderRadius: "8px",
              color: isDark ? "#F3F4F6" : "#1F2937",
            }}
          />
          <Legend
            wrapperStyle={{ color: textColor }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

