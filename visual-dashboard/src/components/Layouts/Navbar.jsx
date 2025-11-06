import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const bgClass = isDark
    ? "bg-gray-900/95 border-gray-800 shadow-cyan-900/20"
    : "bg-white/95 border-gray-200 shadow-gray-200";
  const textClass = isDark ? "text-cyan-400" : "text-blue-600";
  const buttonClass = isDark
    ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-yellow-300"
    : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700";

  return (
    <div className={`flex justify-between items-center px-8 py-4 ${bgClass} border-b backdrop-blur-md transition-all duration-300 sticky top-0 z-10`}>
      <h1 className={`text-xl font-bold ${textClass} tracking-wide`}>DataVision Dashboard</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2.5 rounded-lg border ${buttonClass} hover:scale-105 transition-all duration-200 shadow-sm`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
