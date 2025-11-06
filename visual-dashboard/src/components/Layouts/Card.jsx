import { useTheme } from "../../context/ThemeContext";

export default function Card({ title, value, change }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const positive = change && !change.toString().startsWith("-");

  const bgClass = isDark
    ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700 hover:border-cyan-400 hover:shadow-cyan-900/20"
    : "bg-gradient-to-br from-white to-gray-50/90 border-gray-200 hover:border-blue-400 hover:shadow-blue-900/20";
  const titleClass = isDark ? "text-gray-400" : "text-gray-600";
  const valueClass = isDark ? "text-gray-100" : "text-gray-900";

  return (
    <div
      className={`${bgClass} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-md transform hover:scale-[1.02]`}
    >
      <h3 className={`${titleClass} text-sm font-medium uppercase tracking-wide`}>{title}</h3>
      <p className={`${valueClass} text-4xl font-bold mt-3`}>{value}</p>
      {change && (
        <p
          className={`text-sm mt-2 font-medium ${
            positive
              ? isDark
                ? "text-green-400"
                : "text-green-600"
              : isDark
                ? "text-red-400"
                : "text-red-600"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}
