import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardService";

import {
  FaSolarPanel,
  FaBatteryThreeQuarters,
  FaChartLine,
  FaSpinner,
  FaClock,
} from "react-icons/fa";

import { FaHouse } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";

import EnergyCard from "../components/EnergyCard";

function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [lastUpdate, setLastUpdate] = useState("");
  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboard();
        setDashboard(response.data);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (error) {
        console.error(error);
      }
    }
    loadDashboard();
    const interval = setInterval(loadDashboard, 5000);
    return () => clearInterval(interval);
  }, []);
  function getGridStatus(grid) {
    const value = parseFloat(grid);

    if (value > 0) return "Comprando energía";
    if (value < 0) return "Exportando energía";

    return "Sin intercambio";
  }
  if (!dashboard) {
    return (
      <div className="loading">
        <FaSpinner className="spinner" />
        <p>Cargando datos...</p>
      </div>
    );
  }

  const plant = dashboard.plant.data;
  const powerFlow = dashboard.powerFlow.data.powerflow;
  const inverter = dashboard.inverter;
  return (
    <div className="home">
      <h1>SOLAR DASHBOARD</h1>
      <div className="home-grid">
        <EnergyCard icon={<FaSolarPanel />} title="Producción Solar">
          <p>{powerFlow.pv}</p>
        </EnergyCard>

        <EnergyCard icon={<FaHouse />} title="Consumo">
          <p>{powerFlow.load}</p>
        </EnergyCard>

        <EnergyCard icon={<FaBatteryThreeQuarters />} title="Batería">
          <p>{powerFlow.soc}%</p>
          <p>Estado: {inverter.batteryStatus}</p>
        </EnergyCard>

        <EnergyCard icon={<MdElectricBolt />} title="Red">
          <p>{getGridStatus(powerFlow.grid)}</p>
          <p>{powerFlow.grid}</p>
        </EnergyCard>
        <EnergyCard
          className="summary-card"
          icon={<FaChartLine />}
          title="Resumen"
        >
          <p>Generado hoy: {plant.kpi.power} kWh</p>
          <p>Generado total: {plant.kpi.total_power} kWh</p>
        </EnergyCard>
      </div>
      <p className="last-update">
        <FaClock /> Última actualización: {lastUpdate}
      </p>
    </div>
  );
}

export default Home;
