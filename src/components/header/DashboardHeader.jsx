import { useEffect, useState } from "react";
import {
  FaSolarPanel,
  FaCircle,
  FaCalendarDays,
  FaClock,
  FaMoon,
  FaSun,
} from "react-icons/fa6";

function DashboardHeader({ plant, theme, onThemeToggle }) {
  const [now, setNow] = useState(new Date());

  const info = plant?.data?.info;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = now.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isOnline = info?.status === 1;

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-plant">
        <div className="dashboard-header-logo">
          <FaSolarPanel />
        </div>

        <div>
          <h1>{info?.stationname || "Mi Planta Solar"}</h1>

          <span className="dashboard-header-subtitle">
            Monitorización en tiempo real
          </span>
        </div>
      </div>

      <div className="dashboard-header-info">
        <button
          className="theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={
            theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"
          }
          title={theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <div
          className={`dashboard-system-status ${
            isOnline ? "online" : "offline"
          }`}
        >
          <FaCircle />

          <span>{isOnline ? "Sistema normal" : "Sistema desconectado"}</span>
        </div>

        <div className="dashboard-header-divider" />

        <div className="dashboard-header-date">
          <FaCalendarDays />
          <span>{formattedDate}</span>
        </div>

        <div className="dashboard-header-time">
          <FaClock />
          <span>{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
