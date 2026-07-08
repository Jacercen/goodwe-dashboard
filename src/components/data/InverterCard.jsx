import Card from "../Card";

function InverterCard({ inverter }) {
  return (
    <Card title="Inversor">
      <p>Modelo: {inverter.model}</p>
      <p>Temperatura: {inverter.temperature} ºC</p>
      <p>Nivel de carga de la batería: {inverter.batterySoc}%</p>
      <p>Voltaje batería: {inverter.batteryVoltage} V</p>
      <p>Corriente batería: {inverter.batteryCurrent} A</p>
      <p>Estado batería: {inverter.batteryStatus}</p>
      <p>Salud de la bateria: {inverter.batteryHealth}%</p>
    </Card>
  );
}

export default InverterCard;
