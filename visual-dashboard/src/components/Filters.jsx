import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchFilterOptions } from "../api/visualApi";
import { useTheme } from "../context/ThemeContext";

export default function Filter({ filters, setFilters }) {
  const { theme } = useTheme();
  const [options, setOptions] = useState({
    end_years: [],
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions()
      .then((res) => {
        if (res.success) {
          setOptions(res.options);
        }
      })
      .catch((err) => console.error("Error fetching filter options:", err))
      .finally(() => setLoading(false));
  }, []);

  const updateFilter = (key, value) => {
    if (value === "") {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.keys(filters).filter(
    (key) => filters[key] !== "" && filters[key] !== null && filters[key] !== undefined
  ).length;

  const isDark = theme === "dark";
  const bgClass = isDark
    ? "bg-gray-900/80 dark:bg-gray-900/80 border-gray-800"
    : "bg-white/90 dark:bg-white/90 border-gray-200";
  const selectClass = isDark
    ? "bg-gray-800/90 text-gray-200 border-gray-700 hover:border-cyan-500"
    : "bg-gray-50 text-gray-800 border-gray-300 hover:border-blue-500";
  const textClass = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <div
      className={`${bgClass} border rounded-2xl p-5 backdrop-blur-md shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDark ? "text-cyan-400" : "text-blue-600"}`}>
          Filters {activeFilterCount > 0 && `(${activeFilterCount} active)`}
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className={`${selectClass} px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all hover:scale-105`}
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className={`${textClass} text-center py-4`}>Loading filters...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* End Year Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>End Year</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.end_year || ""}
              onChange={(e) => updateFilter("end_year", e.target.value)}
            >
              <option value="">All Years</option>
              {options.end_years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>Topic</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.topic || ""}
              onChange={(e) => updateFilter("topic", e.target.value)}
            >
              <option value="">All Topics</option>
              {options.topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>Sector</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.sector || ""}
              onChange={(e) => updateFilter("sector", e.target.value)}
            >
              <option value="">All Sectors</option>
              {options.sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>Region</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.region || ""}
              onChange={(e) => updateFilter("region", e.target.value)}
            >
              <option value="">All Regions</option>
              {options.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* PEST Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>PEST</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.pestle || ""}
              onChange={(e) => updateFilter("pestle", e.target.value)}
            >
              <option value="">All PEST</option>
              {options.pestles.map((pestle) => (
                <option key={pestle} value={pestle}>
                  {pestle}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>Source</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.source || ""}
              onChange={(e) => updateFilter("source", e.target.value)}
            >
              <option value="">All Sources</option>
              {options.sources.slice(0, 50).map((source) => (
                <option key={source} value={source}>
                  {source.length > 30 ? `${source.substring(0, 30)}...` : source}
                </option>
              ))}
            </select>
          </div>

          {/* SWOT Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>SWOT</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.swot || ""}
              onChange={(e) => updateFilter("swot", e.target.value)}
            >
              <option value="">All SWOT</option>
              {options.swots.map((swot) => (
                <option key={swot} value={swot}>
                  {swot}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>Country</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.country || ""}
              onChange={(e) => updateFilter("country", e.target.value)}
            >
              <option value="">All Countries</option>
              {options.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className={`block text-sm font-medium ${textClass} mb-2`}>City</label>
            <select
              className={`${selectClass} w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 ${isDark ? "focus:ring-cyan-500" : "focus:ring-blue-500"}`}
              value={filters.city || ""}
              onChange={(e) => updateFilter("city", e.target.value)}
            >
              <option value="">All Cities</option>
              {options.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
