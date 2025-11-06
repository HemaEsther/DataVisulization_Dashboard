import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function CountryChart({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Group data by country and calculate average intensity and likelihood
  const countryData = data.reduce((acc, item) => {
    const country = item.country || "Unknown";
    if (!acc[country]) {
      acc[country] = { country, intensity: 0, likelihood: 0, count: 0 };
    }
    acc[country].intensity += item.intensity || 0;
    acc[country].likelihood += item.likelihood || 0;
    acc[country].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(countryData)
    .map((item) => ({
      country: item.country.length > 15 ? `${item.country.substring(0, 15)}...` : item.country,
      intensity: Math.round(item.intensity / item.count),
      likelihood: Math.round(item.likelihood / item.count),
    }))
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 10);

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
  const borderColor = isDark ? "#374151" : "#E5E7EB";

  return (
    <div
      className={`${isDark ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90" : "bg-gradient-to-br from-white to-gray-50/90"} rounded-2xl shadow-xl p-6 border ${isDark ? "border-gray-700 hover:border-cyan-400" : "border-gray-200 hover:border-blue-400"} transition-all duration-300 backdrop-blur-md`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${isDark ? "text-cyan-400" : "text-blue-600"} tracking-wide`}
      >
        Average Metrics by Country (Top 10)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <XAxis
            dataKey="country"
            angle={-45}
            textAnchor="end"
            tick={{ fill: textColor, fontSize: 12 }}
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
          <Legend
            wrapperStyle={{ color: textColor }}
            iconType="square"
          />
          <Bar
            dataKey="intensity"
            fill={isDark ? "#00FFFF" : "#3B82F6"}
            radius={[6, 6, 0, 0]}
            name="Intensity"
          />
          <Bar
            dataKey="likelihood"
            fill={isDark ? "#10B981" : "#10B981"}
            radius={[6, 6, 0, 0]}
            name="Likelihood"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

