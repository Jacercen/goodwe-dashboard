import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getPowerChart } from "../../api/goodweApi";
import PowerChartTooltip from "./PowerChartTooltip";

function DashboardPowerChart() {
  const [chartData, setChartData] = useState([]);
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenLines, setHiddenLines] = useState([]);
  useEffect(() => {
    async function loadPowerChart() {
      try {
        const date = new Date().toISOString().split("T")[0];

        const response = await getPowerChart(date);

        const apiLines = response.data.data.lines;

        if (!apiLines || apiLines.length === 0) {
          return;
        }

        const formattedLines = apiLines.map((line) => ({
          ...line,
          key: getLineKey(line.sort),
          displayName: getLineName(line.sort),
        }));

        const formattedData = apiLines[0].xy.map((point, index) => {
          const [hours, minutes] = point.x.split(":").map(Number);
          const row = {
            time: hours * 60 + minutes,
          };

          formattedLines.forEach((line) => {
            row[line.key] = line.xy?.[index]?.y ?? null;
          });

          return row;
        });

        setLines(formattedLines);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error loading power chart:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPowerChart();
  }, []);

  function toggleLine(lineKey) {
    setHiddenLines((current) =>
      current.includes(lineKey)
        ? current.filter((key) => key !== lineKey)
        : [...current, lineKey],
    );
  }

  if (loading) {
    return (
      <section className="dashboard-power-chart">
        <p>Cargando gráfica...</p>
      </section>
    );
  }

  if (chartData.length === 0) {
    return (
      <section className="dashboard-power-chart">
        <p>No hay datos disponibles.</p>
      </section>
    );
  }

  return (
    <section className="dashboard-power-chart">
      <div className="dashboard-power-chart-header">
        <div>
          <span className="dashboard-power-chart-eyebrow">
            Rendimiento diario
          </span>

          <h2>Potencia del sistema</h2>
        </div>

        <span className="dashboard-power-chart-date">Hoy</span>
      </div>
      <div className="power-chart-legend">
        {lines.map((line) => {
          const hidden = hiddenLines.includes(line.key);

          return (
            <button
              key={line.key}
              className={`power-chart-legend-item ${hidden ? "hidden" : ""}`}
              onClick={() => toggleLine(line.key)}
              aria-pressed={!hidden}
            >
              <span
                className="power-chart-legend-dot"
                style={{ backgroundColor: line.frontColor }}
              />

              {line.displayName}
            </button>
          );
        })}
      </div>
      <div className="dashboard-power-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              type="number"
              domain={[0, 1440]}
              ticks={[0, 240, 480, 720, 960, 1200, 1440]}
              tickFormatter={(minutes) => {
                if (minutes === 1440) {
                  return "24:00";
                }

                const hours = Math.floor(minutes / 60);

                return `${String(hours).padStart(2, "0")}:00`;
              }}
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              yAxisId="power"
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
              unit=" W"
            />

            <YAxis
              yAxisId="soc"
              orientation="right"
              domain={[0, 100]}
              stroke="var(--text-secondary)"
              tickLine={false}
              axisLine={false}
              unit="%"
            />

            <Tooltip
              content={<PowerChartTooltip />}
              cursor={{
                stroke: "var(--text-secondary)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            {lines.map((line) => (
              <Line
                key={line.sort}
                yAxisId={line.unit === "%" ? "soc" : "power"}
                type="monotone"
                dataKey={line.key}
                name={line.displayName}
                stroke={line.frontColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
                connectNulls
                hide={hiddenLines.includes(line.key)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function getLineKey(sort) {
  switch (sort) {
    case 1:
      return "solar";

    case 2:
      return "battery";

    case 3:
      return "grid";

    case 4:
      return "load";

    case 5:
      return "soc";

    default:
      return `line-${sort}`;
  }
}

function getLineName(sort) {
  switch (sort) {
    case 1:
      return "Solar";

    case 2:
      return "Batería";

    case 3:
      return "Red";

    case 4:
      return "Consumo";

    case 5:
      return "SOC";

    default:
      return `Serie ${sort}`;
  }
}

export default DashboardPowerChart;
