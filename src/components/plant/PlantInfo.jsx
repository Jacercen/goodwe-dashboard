import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function PlantInfo({ plant }) {
  const info = plant.data.info;

  const isOnline = info.status === 1;

  return (
    <section className="plant-info">
      <div className="plant-info-header">
        <div>
          <span className="plant-info-eyebrow">Instalación</span>
          <h2>{info.stationname}</h2>
        </div>

        <span
          className={`plant-info-status ${isOnline ? "online" : "offline"}`}
        >
          {isOnline ? <FaCircleCheck /> : <FaCircleXmark />}

          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className="plant-info-list">
        <div className="plant-info-row">
          <span>Nombre</span>
          <strong>{info.stationname}</strong>
        </div>

        <div className="plant-info-row">
          <span>Capacidad FV</span>
          <strong>{info.capacity} kWp</strong>
        </div>

        <div className="plant-info-row">
          <span>Capacidad batería</span>
          <strong>{info.battery_capacity} kWh</strong>
        </div>

        <div className="plant-info-row">
          <span>Estado</span>

          <strong
            className={isOnline ? "plant-info-normal" : "plant-info-offline"}
          >
            {isOnline ? "Normal" : "Desconectada"}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default PlantInfo;
