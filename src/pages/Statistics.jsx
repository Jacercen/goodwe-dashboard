import { useEffect, useState } from "react";
import { getStatistics } from "../api/statistics";
import { FaSpinner } from "react-icons/fa";

function Home() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const response = await getStatistics();
        setStatistics(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStatistics();

    const interval = setInterval(loadStatistics, 50000);
    return () => clearInterval(interval);
  }, []);

  if (!statistics) {
    return (
      <div className="loading">
        <FaSpinner className="spinner" />
        <p>Cargando datos...</p>
      </div>
    );
  }
  return (
    <div className="statistics">
      <p>coming soon...</p>
    </div>
  );
}

export default Home;
