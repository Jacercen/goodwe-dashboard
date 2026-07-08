import Card from "../Card";

function PowerFlowCard({ powerFlow }) {
  return (
    <Card title="PowerFlow">
      <p>Producción Foto Voltaica: {powerFlow.pv}W</p>
      <p>Consumo: {powerFlow.load}</p>
      <p>Red: {powerFlow.grid}</p>
      <p>Batería: {powerFlow.bettery}</p>
      <p>Estado de carga: {powerFlow.soc}%</p>
    </Card>
  );
}

export default PowerFlowCard;
