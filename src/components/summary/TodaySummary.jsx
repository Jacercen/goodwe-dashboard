import { FaSolarPanel, FaHouse, FaBatteryHalf, FaBolt } from "react-icons/fa6";

function TodaySummary({ statistics }) {
  if (!statistics) {
    return (
      <section className="today-summary">
        <p>Cargando resumen...</p>
      </section>
    );
  }

  const {
    generatedToday,
    consumedToday,
    selfConsumption,
    importedFromGrid,
    exportedToGrid,
    batteryDischarge,
  } = statistics;

  const totalEnergy = selfConsumption + importedFromGrid;

  const solarPercentage =
    totalEnergy > 0 ? (selfConsumption / totalEnergy) * 100 : 0;

  return (
    <section className="today-summary">
      <div className="today-summary-header">
        <div>
          <span className="today-summary-eyebrow">Energía</span>
          <h2>Resumen de hoy</h2>
        </div>
      </div>

      <div className="today-summary-list">
        <div className="today-summary-item solar">
          <FaSolarPanel />
          <span>Producción solar</span>
          <strong>{generatedToday.toFixed(1)} kWh</strong>
        </div>

        <div className="today-summary-item load">
          <FaHouse />
          <span>Consumo</span>
          <strong>{consumedToday.toFixed(1)} kWh</strong>
        </div>

        <div className="today-summary-item battery">
          <FaBatteryHalf />
          <span>Desde batería</span>
          <strong>{batteryDischarge.toFixed(1)} kWh</strong>
        </div>

        <div className="today-summary-item grid">
          <FaBolt />
          <span>A la red</span>
          <strong>{exportedToGrid.toFixed(1)} kWh</strong>
        </div>
      </div>

      <div className="today-summary-progress">
        <div className="today-summary-progress-header">
          <span>Consumo cubierto por solar</span>
          <strong>{solarPercentage.toFixed(0)}%</strong>
        </div>

        <div className="today-summary-progress-track">
          <div
            className="today-summary-progress-fill"
            style={{ width: `${solarPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default TodaySummary;
