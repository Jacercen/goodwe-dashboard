import { FaBatteryHalf, FaHeartPulse, FaBolt } from "react-icons/fa6";

function BatteryStatus({ powerFlow, inverter }) {
  const soc = powerFlow.soc;
  const batteryStatus = inverter.batteryStatus?.toLowerCase();

  let statusClass = "standby";
  if (batteryStatus === "cargando") statusClass = "charging";
  else if (batteryStatus === "descargando") statusClass = "discharging";

  let batteryLevelClass = "high";
  if (soc <= 20) batteryLevelClass = "low";
  else if (soc <= 50) batteryLevelClass = "medium";

  return (
    <section className="battery-status">
      <div className="battery-status-header">
        <div>
          <span className="battery-status-eyebrow">Almacenamiento</span>
          <h2>Estado de batería</h2>
        </div>
        <FaBatteryHalf className="battery-status-header-icon" />
      </div>

      <div className="battery-status-main">
        <div
          className={`battery-gauge ${batteryLevelClass} ${statusClass}`}
          style={{ "--battery-level": `${soc}%` }}
        >
          <div className="battery-gauge-value">
            <strong>{soc}%</strong>
          </div>
        </div>

        <div className="battery-status-reading">
          <span>Estado</span>
          <strong className={statusClass}>{inverter.batteryStatus}</strong>
          <small>Potencia actual: {powerFlow.bettery}</small>
        </div>
      </div>

      <div className="battery-status-details">
        <div className="battery-detail">
          <FaBolt />
          <div>
            <span>Potencia</span>
            <strong>{powerFlow.bettery}</strong>
          </div>
        </div>
        <div className="battery-detail">
          <FaHeartPulse />
          <div>
            <span>Salud</span>
            <strong>{inverter.batteryHealth}%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BatteryStatus;
