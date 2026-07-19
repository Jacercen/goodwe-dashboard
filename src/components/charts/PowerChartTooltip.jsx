function PowerChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="power-chart-tooltip">
      <span className="power-chart-tooltip-time">{formatTime(label)}</span>

      <div className="power-chart-tooltip-values">
        {payload.map((item) => (
          <div key={item.dataKey} className="power-chart-tooltip-item">
            <div className="power-chart-tooltip-label">
              <span
                className="power-chart-tooltip-dot"
                style={{ backgroundColor: item.color }}
              />

              <span>{item.name}</span>
            </div>

            <strong>{formatValue(item.value, item.dataKey)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(minutes) {
  if (minutes === 1440) {
    return "24:00";
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function formatValue(value, dataKey) {
  if (dataKey === "soc") {
    return `${value}%`;
  }

  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(2)} kW`;
  }

  return `${value.toFixed(0)} W`;
}

export default PowerChartTooltip;
