import { FaSolarPanel, FaHouse, FaBatteryHalf, FaBolt } from "react-icons/fa6";

function EnergyFlow({ powerFlow, inverter }) {
  const batteryStatus = inverter.batteryStatus?.toLowerCase();
  const batteryFlowClass =
    batteryStatus === "cargando"
      ? "charging"
      : batteryStatus === "descargando"
        ? "discharging"
        : "standby";

  return (
    <section className="energy-flow">
      <div className="energy-flow-header">
        <div>
          <span className="energy-flow-eyebrow">Tiempo real</span>
          <h2>Flujo de energía</h2>
        </div>
        <span className="energy-flow-status">Sistema activo</span>
      </div>

      <div className="energy-flow-diagram">
        <div className="energy-node energy-node--solar">
          <div className="energy-node-icon"><FaSolarPanel /></div>
          <span className="energy-node-label">Producción solar</span>
          <strong className="energy-node-value">{powerFlow.pv}</strong>
        </div>

        <div className="energy-node energy-node--home">
          <div className="energy-node-icon"><FaHouse /></div>
          <span className="energy-node-label">Tu hogar</span>
          <strong className="energy-node-value">Centro energético</strong>
        </div>

        <div className="energy-node energy-node--load">
          <div className="energy-node-icon"><FaBolt /></div>
          <span className="energy-node-label">Consumo</span>
          <strong className="energy-node-value">{powerFlow.load}</strong>
        </div>

        <div className="energy-node energy-node--battery">
          <div className="energy-node-icon"><FaBatteryHalf /></div>
          <span className="energy-node-label">Batería</span>
          <strong className="energy-node-value">{powerFlow.bettery}</strong>
          <span className="energy-node-status">{inverter.batteryStatus}</span>
        </div>

        <div className="energy-node energy-node--grid">
          <div className="energy-node-icon"><FaBolt /></div>
          <span className="energy-node-label">Red eléctrica</span>
          <strong className="energy-node-value">{powerFlow.grid}</strong>
        </div>

        <span className="energy-connector energy-connector--solar" />
        <span className="energy-connector energy-connector--load" />
        <span className={`energy-connector energy-connector--battery ${batteryFlowClass}`} />
        <span className="energy-connector energy-connector--grid" />
      </div>
    </section>
  );
}

export default EnergyFlow;
