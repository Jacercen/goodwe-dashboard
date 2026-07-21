import { FaSolarPanel, FaHouse, FaBatteryHalf, FaBolt } from "react-icons/fa6";

function EnergyFlow({ powerFlow, inverter, hasBattery }) {
  const GRID_FLOW_THRESHOLD = 20;
  const POWER_FLOW_THRESHOLD = 5;

  const parsePower = (value) =>
    Number.parseFloat(String(value).replace(/[^\d.-]/g, "")) || 0;

  /* =========================
     POTENCIAS
  ========================= */

  const solarPower = parsePower(powerFlow.pv);
  const loadPower = parsePower(powerFlow.load);
  const batteryPower = parsePower(powerFlow.battery);
  const gridPower = parsePower(powerFlow.grid);

  /* =========================
     ESTADO DE BATERÍA
  ========================= */

  const batteryStatus = inverter.batteryStatus?.toLowerCase();

  const isCharging = batteryStatus === "cargando";
  const isDischarging = batteryStatus === "descargando";

  const hasSolar = solarPower > POWER_FLOW_THRESHOLD;
  const hasBatteryFlow = batteryPower > POWER_FLOW_THRESHOLD;

  /*
   * Descargando:
   * La batería aporta energía al sistema.
   *
   * Cargando:
   * La batería consume energía del sistema.
   */

  const signedBatteryPower = isCharging
    ? -batteryPower
    : isDischarging
      ? batteryPower
      : 0;

  /* =========================
     DIRECCIÓN DE LA RED
  ========================= */

  /*
   * Balance positivo:
   * sobra energía -> exportando.
   *
   * Balance negativo:
   * falta energía -> importando.
   */

  const energyBalance = solarPower + signedBatteryPower - loadPower;

  /*
   * Ignoramos intercambios de red iguales
   * o inferiores a 20 W.
   */

  const hasGridFlow = gridPower > GRID_FLOW_THRESHOLD;

  let gridDirection = "standby";

  if (hasGridFlow) {
    gridDirection = energyBalance > 0 ? "exporting" : "importing";
  }

  const isGridImporting = gridDirection === "importing";

  const isGridExporting = gridDirection === "exporting";

  /* =========================
     FLUJOS ACTIVOS
  ========================= */

  const solarToHome = hasSolar && loadPower > POWER_FLOW_THRESHOLD;

  const solarToBattery = hasSolar && isCharging && hasBatteryFlow;

  const batteryToHome = isDischarging && hasBatteryFlow;

  const solarToGrid = hasSolar && isGridExporting;

  const gridToHome = isGridImporting;

  /* =========================
     VALORES VISUALES
  ========================= */

  /*
   * Aunque GoodWe pueda devolver 2 W, 5 W,
   * etc., mostramos 0 W si está por debajo
   * del umbral.
   */

  const displayedGridPower = hasGridFlow ? powerFlow.grid : "0W";

  return (
    <section className="energy-flow">
      {/* =========================
          HEADER
      ========================= */}

      <div className="energy-flow-header">
        <div>
          <span className="energy-flow-eyebrow">Tiempo real</span>

          <h2>Flujo de energía</h2>
        </div>

        <span className="energy-flow-status">Sistema activo</span>
      </div>

      {/* =========================
          DIAGRAMA
      ========================= */}

      <div className="energy-flow-diagram">
        <svg
          className="energy-flow-connections"
          viewBox="0 0 1000 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* =========================
              RED <-> CASA
          ========================= */}

          <path
            id="grid-home-path"
            className={`energy-path energy-path--grid ${
              gridToHome ? "is-active" : ""
            }`}
            d="M 205 210 H 795"
          />

          {/* =========================
              SOLAR -> CASA
          ========================= */}

          <path
            id="solar-home-path"
            className={`energy-path energy-path--solar ${
              solarToHome ? "is-active" : ""
            }`}
            d="
              M 500 115
              C 505 160, 530 185, 595 198
              C 655 210, 720 210, 795 210
            "
          />

          {/* =========================
              SOLAR -> RED
          ========================= */}

          <path
            id="solar-grid-path"
            className={`energy-path energy-path--solar-grid ${
              solarToGrid ? "is-active" : ""
            }`}
            d="
              M 500 115
              C 495 160, 455 190, 390 200
              C 325 210, 265 210, 205 210
            "
          />

          {/* =========================
              SOLAR -> BATERÍA
          ========================= */}
          {hasBattery && (
            <path
              id="solar-battery-path"
              className={`energy-path energy-path--solar-battery ${
                solarToBattery ? "is-active" : ""
              }`}
              d="M 500 115 V 270"
            />
          )}
          {/* =========================
              BATERÍA -> CASA
          ========================= */}
          {hasBattery && (
            <path
              id="battery-home-path"
              className={`energy-path energy-path--battery ${
                batteryToHome ? "is-active" : ""
              }`}
              d="
              M 500 305
              C 505 260, 530 235, 595 222
              C 655 210, 720 210, 795 210
            "
            />
          )}
          {/* =========================
              BATERÍA <-> RED
          ========================= */}
          {hasBattery && (
            <path
              id="battery-grid-path"
              className="energy-path energy-path--battery-grid"
              d="
              M 500 305
              C 495 260, 455 230, 390 220
              C 325 210, 265 210, 205 210
            "
            />
          )}
          {/* =========================
              SOLAR -> CASA
          ========================= */}

          {solarToHome && (
            <circle className="energy-particle energy-particle--solar" r="4">
              <animateMotion dur="2.2s" repeatCount="indefinite">
                <mpath href="#solar-home-path" />
              </animateMotion>
            </circle>
          )}

          {/* =========================
              SOLAR -> BATERÍA
          ========================= */}

          {hasBattery && solarToBattery && (
            <circle className="energy-particle energy-particle--solar" r="4">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#solar-battery-path" />
              </animateMotion>
            </circle>
          )}

          {/* =========================
              BATERÍA -> CASA
          ========================= */}

          {hasBattery && batteryToHome && (
            <circle className="energy-particle energy-particle--battery" r="4">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#battery-home-path" />
              </animateMotion>
            </circle>
          )}

          {/* =========================
              SOLAR -> RED
          ========================= */}

          {solarToGrid && (
            <circle className="energy-particle energy-particle--solar" r="4">
              <animateMotion dur="2.3s" repeatCount="indefinite">
                <mpath href="#solar-grid-path" />
              </animateMotion>
            </circle>
          )}

          {/* =========================
              RED -> CASA
          ========================= */}

          {gridToHome && (
            <circle className="energy-particle energy-particle--grid" r="4">
              <animateMotion dur="2.4s" repeatCount="indefinite">
                <mpath href="#grid-home-path" />
              </animateMotion>
            </circle>
          )}

          {/* =========================
              CASA -> RED
          ========================= */}

          {/* {isGridExporting && (
            <circle className="energy-particle energy-particle--grid" r="4">
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href="#grid-home-path" />
              </animateMotion>
            </circle>
          )} */}
        </svg>

        {/* =========================
            RED
        ========================= */}

        <div className="energy-node energy-node--grid">
          <div className="energy-node-circle">
            <FaBolt />
          </div>

          <span className="energy-node-label">Red eléctrica</span>

          <strong className="energy-node-value">{displayedGridPower}</strong>

          {gridDirection === "standby" && (
            <small className="energy-node-grid-status">
              Sin intercambio significativo
            </small>
          )}

          {gridDirection === "importing" && (
            <small className="energy-node-grid-status importing">
              Importando
            </small>
          )}

          {gridDirection === "exporting" && (
            <small className="energy-node-grid-status exporting">
              Exportando
            </small>
          )}
        </div>

        {/* =========================
            SOLAR
        ========================= */}

        <div className="energy-node energy-node--solar">
          <div className="energy-node-circle">
            <FaSolarPanel />
          </div>

          <span className="energy-node-label">Producción solar</span>

          <strong className="energy-node-value">{powerFlow.pv}</strong>
        </div>

        {/* =========================
            BATERÍA
        ========================= */}
        {hasBattery && (
          <div className="energy-node energy-node--battery">
            <div className="energy-node-circle">
              <FaBatteryHalf />
            </div>

            <span className="energy-node-label">
              Batería · {powerFlow.soc}%
            </span>

            <strong className="energy-node-value">{powerFlow.battery}</strong>

            <small
              className={`energy-node-battery-status ${
                isCharging
                  ? "charging"
                  : isDischarging
                    ? "discharging"
                    : "standby"
              }`}
            >
              {inverter.batteryStatus}
            </small>
          </div>
        )}
        {/* =========================
            CASA / CONSUMO
        ========================= */}

        <div className="energy-node energy-node--home">
          <div className="energy-node-circle">
            <FaHouse />
          </div>

          <span className="energy-node-label">Consumo</span>

          <strong className="energy-node-value">{powerFlow.load}</strong>
        </div>
      </div>
    </section>
  );
}

export default EnergyFlow;
