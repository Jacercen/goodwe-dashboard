import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardService";
import PlantCard from "../components/data/PlantCard";
import PowerFlowCard from "../components/data/PowerFlowCard";
import InverterCard from "../components/data/InverterCard";

function Data() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadDashboard();
    const interval = setInterval(loadDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!dashboard) {
    return <h2>Cargando...</h2>;
  }

  const plant = dashboard.plant.data;
  const powerFlow = dashboard.powerFlow.data.powerflow;
  const inverter = dashboard.inverter;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <PlantCard plant={plant} inverter={inverter} />
      <PowerFlowCard powerFlow={powerFlow} />
      <InverterCard inverter={inverter} />
    </div>
  );
}

export default Data;
