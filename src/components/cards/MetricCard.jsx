function MetricCard({ title, value, icon, subtitle, variant }) {
  return (
    <article className={`metric-card metric-card--${variant}`}>
      <span className="metric-card-icon">{icon}</span>

      <div className="metric-card-content">
        <h2>{title}</h2>
        <p className="metric-card-value">{value}</p>
        {subtitle && <p className="metric-card-subtitle">{subtitle}</p>}
      </div>
    </article>
  );
}

export default MetricCard;
