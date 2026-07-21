import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSolarPanel, FaLocationDot, FaBolt } from "react-icons/fa6";

import { getPlants, logout } from "../api/goodweApi";

function PlantSelectionPage() {
  const navigate = useNavigate();

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlants() {
      try {
        const response = await getPlants();
        setPlants(response.data.data.list ?? []);
      } catch (error) {
        console.error("Error loading plants:", error);

        if (error.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError("No se pudieron cargar las instalaciones.");
      } finally {
        setLoading(false);
      }
    }

    loadPlants();
  }, [navigate]);

  function handlePlantSelect(plantId) {
    navigate(`/dashboard/${plantId}`);
  }

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  }

  if (loading) {
    return (
      <main className="plant-selection-page">
        <p className="plant-selection-message">Cargando instalaciones...</p>
      </main>
    );
  }

  return (
    <main className="plant-selection-page">
      <section className="plant-selection-container">
        <header className="plant-selection-header">
          <div>
            <span className="plant-selection-eyebrow">Solar Monitor</span>

            <h1>Selecciona una instalación</h1>

            <p>Elige la planta que quieres visualizar.</p>
          </div>

          <button
            className="plant-selection-logout"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </header>

        {error && <p className="plant-selection-error">{error}</p>}

        {!error && plants.length === 0 && (
          <p className="plant-selection-message">
            No hay instalaciones disponibles.
          </p>
        )}

        <div className="plant-selection-grid">
          {plants.map((plant) => (
            <button
              key={plant.powerstation_id}
              className="plant-card"
              type="button"
              onClick={() => handlePlantSelect(plant.powerstation_id)}
            >
              <div className="plant-card-icon">
                <FaSolarPanel />
              </div>

              <div className="plant-card-content">
                <div className="plant-card-header">
                  <div>
                    <span className="plant-card-type">
                      {plant.powerstation_type}
                    </span>

                    <h2>{plant.stationname}</h2>
                  </div>

                  <span
                    className={`plant-card-status ${
                      plant.status === 1 ? "plant-card-status--online" : ""
                    }`}
                  >
                    {plant.status === 1 ? "Activa" : "Inactiva"}
                  </span>
                </div>

                <div className="plant-card-location">
                  <FaLocationDot />
                  <span>{plant.location}</span>
                </div>

                <div className="plant-card-metrics">
                  <div>
                    <span>Potencia actual</span>

                    <strong>
                      <FaBolt />
                      {formatPower(plant.pac)}
                    </strong>
                  </div>

                  <div>
                    <span>Potencia instalada</span>

                    <strong>{plant.capacity} kW</strong>
                  </div>
                </div>

                <span className="plant-card-action">Ver dashboard →</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatPower(power) {
  if (power == null) {
    return "--";
  }

  if (Math.abs(power) >= 1000) {
    return `${(power / 1000).toFixed(2)} kW`;
  }

  return `${power.toFixed(0)} W`;
}

export default PlantSelectionPage;
