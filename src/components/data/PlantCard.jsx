import Card from "../Card";
function PlantCard({ plant, inverter }) {
  return (
    <Card title="Planta">
      <p>Dueño: {plant.info.stationname}</p>
      <p>Capacidad: {plant.info.capacity} kW</p>
      <p>Producción actual: {plant.kpi.pac} W</p>
      <p>Input1 : {inverter.dcVandC1}</p>
      <p>Input2 : {inverter.dcVandC2}</p>
    </Card>
  );
}

export default PlantCard;
