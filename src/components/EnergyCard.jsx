function EnergyCard({ icon, title, children, className = "" }) {
  return (
    <div className={`home-card ${className}`}>
      <div className="home-card-header">
        <span className="home-card-icon">{icon}</span>
        <h2>{title}</h2>
      </div>

      <div className="home-card-content">{children}</div>
    </div>
  );
}

export default EnergyCard;
