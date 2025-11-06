import Sidebar from "./components/Layouts/Sidebar";
import Navbar from "./components/Layouts/Navbar";
import Dashboard from "./components/Dashboard";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";

  return (
    <div className={`flex ${bgClass} min-h-screen transition-colors duration-300`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
