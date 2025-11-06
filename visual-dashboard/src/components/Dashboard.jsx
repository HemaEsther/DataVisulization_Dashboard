import { useEffect, useState } from "react";
import Card from "./Layouts/Card";
import IntensityChart from "./Charts/IntensityChart";
import LikelihoodChart from "./Charts/LikelihoodChart";
import RelevanceChart from "./Charts/RelevanceChart";
import YearTrendChart from "./Charts/YearTrendChart";
import CountryChart from "./Charts/CountryChart";
import CityChart from "./Charts/CityChart";
import TopicsChart from "./Charts/TopicsChart";
import RegionChart from "./Charts/RegionChart";
import Filter from "./Filters";
import { fetchData } from "../api/visualApi";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchData(filters)
      .then((res) => {
        if (res.success) {
          setData(res.data || []);
        } else {
          setError("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Error loading data. Please check your connection.");
      })
      .finally(() => setLoading(false));
  }, [filters]);

  // Calculate statistics
  const avgIntensity =
    data.length > 0
      ? Math.round(
          data.reduce((sum, item) => sum + (item.intensity || 0), 0) / data.length
        )
      : 0;
  const avgLikelihood =
    data.length > 0
      ? Math.round(
          data.reduce((sum, item) => sum + (item.likelihood || 0), 0) / data.length
        )
      : 0;
  const avgRelevance =
    data.length > 0
      ? Math.round(
          (data.reduce((sum, item) => sum + (item.relevance || 0), 0) / data.length) * 10
        ) / 10
      : 0;

  const bgClass = isDark ? "bg-gray-950" : "bg-gray-50";

  return (
    <div className={`p-6 space-y-6 ${bgClass} min-h-screen transition-colors duration-300`}>
      <Filter filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="mt-4">Loading data...</p>
        </div>
      ) : error ? (
        <div
          className={`${isDark ? "bg-red-900/20 border-red-700" : "bg-red-50 border-red-200"} border rounded-xl p-4 text-center ${isDark ? "text-red-300" : "text-red-600"}`}
        >
          {error}
        </div>
      ) : (
        <>
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2
              className={`text-2xl font-bold mb-6 ${isDark ? "text-cyan-400" : "text-blue-600"}`}
            >
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                title="Total Entries"
                value={data.length.toLocaleString()}
                change={`${data.length > 0 ? "+" : ""}${data.length}`}
              />
              <Card
                title="Avg Intensity"
                value={avgIntensity}
                change={`${avgIntensity > 70 ? "+" : ""}${((avgIntensity / 100) * 100).toFixed(1)}%`}
              />
              <Card
                title="Avg Likelihood"
                value={avgLikelihood}
                change={`${avgLikelihood > 50 ? "+" : ""}${((avgLikelihood / 100) * 100).toFixed(1)}%`}
              />
              <Card
                title="Avg Relevance"
                value={avgRelevance}
                change={`${avgRelevance > 3 ? "+" : ""}${(avgRelevance * 10).toFixed(1)}%`}
              />
            </div>
          </section>

          {/* Analytics Section */}
          <section id="analytics" className="scroll-mt-20">
            <h2
              className={`text-2xl font-bold mb-6 mt-12 ${isDark ? "text-cyan-400" : "text-blue-600"}`}
            >
              Analytics & Trends
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntensityChart data={data} />
              <LikelihoodChart data={data} />
              <RelevanceChart data={data} />
              <YearTrendChart data={data} />
            </div>
          </section>

          {/* Geographic Section */}
          <section id="geographic" className="scroll-mt-20">
            <h2
              className={`text-2xl font-bold mb-6 mt-12 ${isDark ? "text-cyan-400" : "text-blue-600"}`}
            >
              Geographic Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CountryChart data={data} />
              <CityChart data={data} />
              <TopicsChart data={data} />
            </div>
          </section>

          {/* Regions Section */}
          <section id="regions" className="scroll-mt-20">
            <h2
              className={`text-2xl font-bold mb-6 mt-12 ${isDark ? "text-cyan-400" : "text-blue-600"}`}
            >
              Regional Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegionChart data={data} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
