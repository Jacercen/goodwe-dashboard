import Card from "../Card";
function PlantCard({ plant }) {
  return (
    <Card title="Planta">
      <p>Dueño: {plant.info.stationname}</p>
      <p>Capacidad: {plant.info.capacity} kW</p>
      <p>Producción actual: {plant.kpi.pac} W</p>
    </Card>
  );
}

export default PlantCard;
