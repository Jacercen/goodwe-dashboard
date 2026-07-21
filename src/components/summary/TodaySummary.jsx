import { FaSolarPanel, FaHouse, FaBatteryHalf, FaBolt } from "react-icons/fa6";

function TodaySummary({ statistics, hasBattery }) {
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
    importedFromGrid,
    exportedToGrid,
    batteryDischarge,
  } = statistics;

  /*
   * Del consumo total:
   *
   * - Una parte viene de la red.
   * - El resto ha sido cubierto por solar + batería.
   */

  const solarAndBatteryConsumption = Math.max(
    consumedToday - importedFromGrid,
    0,
  );

  const renewablePercentage =
    consumedToday > 0 ? (solarAndBatteryConsumption / consumedToday) * 100 : 0;

  const gridPercentage =
    consumedToday > 0 ? (importedFromGrid / consumedToday) * 100 : 0;

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
        {hasBattery && (
          <div>
            <div className="today-summary-item battery">
              <FaBatteryHalf />

              <span>Desde batería</span>

              <strong>{batteryDischarge.toFixed(1)} kWh</strong>
            </div>
          </div>
        )}

        <div className="today-summary-item grid">
          <FaBolt />

          <span>Desde la red</span>

          <strong>{importedFromGrid.toFixed(1)} kWh</strong>
        </div>
      </div>

      <div className="today-summary-progress">
        <div className="today-summary-progress-header">
          {hasBattery ? (
            <span>Consumo cubierto por solar + batería</span>
          ) : (
            <span>Consumo cubierto por solar</span>
          )}

          <strong>{renewablePercentage.toFixed(0)}%</strong>
        </div>

        <div className="today-summary-progress-track">
          <div
            className="today-summary-progress-fill"
            style={{
              width: `${Math.min(renewablePercentage, 100)}%`,
            }}
          />
        </div>

        <div className="today-summary-progress-footer">
          {hasBattery
            ? `Solar + batería: ${renewablePercentage.toFixed(2)}%`
            : `Solar: ${renewablePercentage.toFixed(2)}%`}

          <span> Red: {gridPercentage.toFixed(0)}%</span>
        </div>
      </div>
    </section>
  );
}

export default TodaySummary;
