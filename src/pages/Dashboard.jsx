import { lazy, Suspense, useEffect, useState } from "react";
import { getDashboard, getStatistics } from "../api/goodweApi";
import { FaSolarPanel, FaHouse, FaBatteryHalf, FaBolt } from "react-icons/fa6";

import MetricCard from "../components/cards/MetricCard";
import EnergyFlow from "../components/energy-flow/EnergyFlow";
import BatteryStatus from "../components/battery/BatteryStatus";
import PlantInfo from "../components/plant/PlantInfo";
import TodaySummary from "../components/summary/TodaySummary";
import DashboardHeader from "../components/header/DashboardHeader";
import WeatherCard from "../components/weather/WeatherCard";

const DashboardPowerChart = lazy(
  () => import("../components/charts/DashboardPowerChart"),
);

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("solar-monitor-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("solar-monitor-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardResponse, statisticsResponse] = await Promise.all([
          getDashboard(),
          getStatistics(),
        ]);

        setDashboard(dashboardResponse.data);
        setStatistics(statisticsResponse.data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
    const interval = setInterval(() => {
      loadDashboard();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dashboard) {
    return <p>Could not load dashboard.</p>;
  }

  const powerFlow = dashboard.powerFlow.data.powerflow;
  const inverter = dashboard.inverter;
  const plant = dashboard.plant;

  return (
    <main className="dashboard">
      <DashboardHeader
        plant={plant}
        theme={theme}
        onThemeToggle={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />

      <section className="dashboard-metrics">
        <MetricCard
          title="Producción Solar"
          value={powerFlow.pv}
          subtitle="Producción actual"
          icon={<FaSolarPanel />}
          variant="solar"
        />

        <MetricCard
          title="Consumo"
          value={powerFlow.load}
          subtitle="Consumo actual"
          icon={<FaHouse />}
          variant="load"
        />

        <MetricCard
          title="Batería"
          value={`${powerFlow.soc}%`}
          subtitle={inverter.batteryStatus}
          icon={<FaBatteryHalf />}
          variant="battery"
        />

        <MetricCard
          title="Red"
          value={powerFlow.grid}
          subtitle="Intercambio actual"
          icon={<FaBolt />}
          variant="grid"
        />
      </section>

      <section className="dashboard-middle">
        <EnergyFlow powerFlow={powerFlow} inverter={inverter} />

        <div className="dashboard-middle-sidebar">
          <BatteryStatus powerFlow={powerFlow} inverter={inverter} />

          <WeatherCard city="Yecla" />
        </div>
      </section>

      <section className="dashboard-bottom">
        <Suspense
          fallback={
            <section className="dashboard-power-chart dashboard-power-chart--loading">
              <p>Cargando gráfica...</p>
            </section>
          }
        >
          <DashboardPowerChart />
        </Suspense>

        <TodaySummary statistics={statistics} />
        <PlantInfo plant={plant} />
      </section>
    </main>
  );
}

export default Dashboard;
