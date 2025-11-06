import { useState, useEffect } from "react";
import { BarChart3, Activity, Settings, Globe2, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeItem, setActiveItem] = useState("overview");

  const bgClass = isDark
    ? "bg-gradient-to-b from-gray-950 to-gray-900 border-gray-800"
    : "bg-gradient-to-b from-white to-gray-100 border-gray-200";
  const textClass = isDark ? "text-gray-300" : "text-gray-700";
  const hoverClass = isDark ? "hover:text-cyan-400" : "hover:text-blue-600";
  const accentClass = isDark ? "text-cyan-400" : "text-blue-600";

  // Listen to scroll to update active item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "analytics", "regions", "geographic"];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveItem(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const menuItems = [
    {
      id: "overview",
      icon: BarChart3,
      label: "Overview",
      description: "Statistics & Summary",
    },
    {
      id: "analytics",
      icon: Activity,
      label: "Analytics",
      description: "Charts & Trends",
    },
    {
      id: "geographic",
      icon: Globe2,
      label: "Geographic",
      description: "Countries & Cities",
    },
    {
      id: "regions",
      icon: TrendingUp,
      label: "Regions",
      description: "Regional Analysis",
    },
  ];

  const isActive = (id) => activeItem === id;
  const activeBgClass = isDark
    ? "bg-gray-800/50 border-cyan-500/50"
    : "bg-blue-50 border-blue-500/50";
  const activeTextClass = isDark ? "text-cyan-400" : "text-blue-600";

  return (
    <aside
      className={`w-64 ${bgClass} border-r ${textClass} backdrop-blur-lg transition-colors duration-300 sticky top-0 h-screen flex flex-col`}
    >
      <div className="p-6">
        <h2 className={`text-xl font-bold ${accentClass} mb-10 tracking-wide`}>
          DataVision
        </h2>
        <ul className="space-y-2 text-sm font-medium">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-start space-y-1 ${
                  active ? activeTextClass : hoverClass
                } transition-all cursor-pointer rounded-lg p-3 border ${
                  active
                    ? activeBgClass
                    : isDark
                      ? "border-transparent hover:border-gray-700 hover:bg-gray-800/30"
                      : "border-transparent hover:border-gray-300 hover:bg-gray-100"
                } ${active ? "shadow-lg" : ""}`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Icon size={18} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                <span
                  className={`text-xs ml-9 ${
                    active
                      ? isDark
                        ? "text-cyan-300/70"
                        : "text-blue-500/70"
                      : isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                  }`}
                >
                  {item.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Settings button at bottom */}
      <div className="p-6 pt-0 mt-auto border-t border-gray-700 dark:border-gray-300/20">
        <button
          onClick={() => {
            // Settings could open a modal or do something else
            alert("Settings feature coming soon!");
          }}
          className={`w-full flex items-center space-x-3 ${hoverClass} transition cursor-pointer rounded-lg p-3 border ${
            isDark
              ? "border-transparent hover:border-gray-700 hover:bg-gray-800/30"
              : "border-transparent hover:border-gray-300 hover:bg-gray-100"
          }`}
        >
          <Settings size={18} />
          <span className="font-semibold">Settings</span>
        </button>
      </div>
    </aside>
  );
}
