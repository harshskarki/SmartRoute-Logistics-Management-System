import {
  vehicles,
  deliveries,
} from "../data/mockData";

function Dashboard() {
  const activeVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Active"
    ).length;

      const idleVehicles =
  vehicles.filter(
    (vehicle) =>
      vehicle.status === "Idle"
  ).length;

const totalVehicles =
  vehicles.length;


  const pendingDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Pending"
    ).length;

  const completedDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ==="Delivered ✅"
    ).length;

  const activeDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ===
        "In Transit"
    ).length;

    const totalDeliveries = deliveries.length;

    const averageRouteLength =
  deliveries.length > 0
    ? Math.round(
        deliveries.reduce(
          (sum, delivery) =>
            sum +
            parseInt(
              delivery.distance || "0"
            ),
          0
        ) / deliveries.length
      )
    : 0;

    const averageETA =
  deliveries.length > 0
    ? Math.round(
        deliveries.reduce(
          (sum, delivery) =>
            sum +
            parseInt(
              delivery.eta || "0"
            ),
          0
        ) / deliveries.length
      )
    : 0;

const deliverySuccessRate =
  totalDeliveries > 0
    ? Math.round(
        (completedDeliveries /
          totalDeliveries) *
          100
      )
    : 0;

const fleetUtilization =
  vehicles.length > 0
    ? Math.round(
        (activeVehicles /
          vehicles.length) *
          100
      )
    : 0;
    
      const fleetAvailability =
  totalVehicles > 0
    ? Math.round(
        ((activeVehicles +
          idleVehicles) /
          totalVehicles) *
          100
      )
    : 0;

    const efficiencyScore = Math.round(
  (deliverySuccessRate +
    fleetUtilization +
    fleetAvailability) /
    3
);

    const deliveryInsight =
  deliverySuccessRate >= 80
    ? "✅ Delivery performance is excellent"
    : "⚠️ Delivery performance needs attention";

      const pendingCount =
  deliveries.filter(
    (delivery) =>
      delivery.status === "Pending"
  ).length;

const inTransitCount =
  deliveries.filter(
    (delivery) =>
      delivery.status === "In Transit"
  ).length;

const deliveredCount =
  deliveries.filter(
    (delivery) =>
      delivery.status === "Delivered ✅"
  ).length;

  const maintenanceVehicles =
  vehicles.filter(
    (vehicle) =>
      vehicle.status ==="Maintenance"
  ).length;

const fleetInsight =
  fleetUtilization >= 60
    ? "🚚 Fleet utilization is healthy"
    : "⚠️ Fleet utilization is low";

    const efficiencyInsight =
  efficiencyScore >= 75
    ? "⚡ Operations are running efficiently"
    : "⚠️ Operational efficiency can improve";

    const etaInsight =
  averageETA <= 15
    ? "⏱ Delivery times are efficient"
    : "⚠️ Average ETA is increasing";

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        🚚 SmartRoute Dashboard
      </h1>

      <p
        style={{
          marginBottom: "30px",
        }}
      >
        Welcome to SmartRoute Logistics
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
  background: "#1e293b",
  padding: "25px",
  borderRadius: "16px",
  width: "240px",
  border: "1px solid #334155",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.25)",
}}
        >
          <h3
  style={{
    color: "#94a3b8",
    fontWeight: "500",
  }}
>
  🚚 Active Vehicles
</h3>

          <h2
  style={{
    fontSize: "42px",
    marginTop: "10px",
  }}
>
  {activeVehicles}
</h2>
        </div>

        <div
          style={{
  background: "#1e293b",
  padding: "25px",
  borderRadius: "16px",
  width: "240px",
  border: "1px solid #334155",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.25)",
}}
        >
          <h3
  style={{
    color: "#94a3b8",
    fontWeight: "500",
  }}
>
  📦 Pending Deliveries
</h3>

          <h2
  style={{
    fontSize: "42px",
    marginTop: "10px",
  }}
>
  {pendingDeliveries}
</h2>
        </div>

        <div
          style={{
  background: "#1e293b",
  padding: "25px",
  borderRadius: "16px",
  width: "240px",
  border: "1px solid #334155",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.25)",
}}
        >
          <h3
  style={{
    color: "#94a3b8",
    fontWeight: "500",
  }}
>
  🚛 Active Deliveries
</h3>

          <h2
  style={{
    fontSize: "42px",
    marginTop: "10px",
  }}
>
  {activeDeliveries}
</h2>
        </div>

        <div
          style={{
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    width: "240px",
    border: "1px solid #334155",
    boxShadow:"0 4px 12px rgba(0,0,0,0.25)",
        }}
        >
          <h3
  style={{
    color: "#94a3b8",
    fontWeight: "500",
  }}
>
  ✅ Delivered
</h3>

          <h2
  style={{
    fontSize: "42px",
    marginTop: "10px",
  }}
>
  {completedDeliveries}
</h2>
        </div>
            </div>

      <div
        style={{
          marginTop: "40px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #334155",
        }}
      >

        <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px",
  }}
>
  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "240px",
      border: "1px solid #334155",
    }}
  >
    <h4>📈 Delivery Success Rate</h4>

    <h2>
      {deliverySuccessRate}%
    </h2>
    <div
  style={{
    width: "100%",
    height: "10px",
    background: "#334155",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${deliverySuccessRate}%`,
      height: "100%",
      background: "#22c55e",
    }}
  />
</div>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "240px",
      border: "1px solid #334155",
    }}
  >
    <h4>🚚 Fleet Utilization</h4>

    <h2>
      {fleetUtilization}%
    </h2>
    <div
  style={{
    width: "100%",
    height: "10px",
    background: "#334155",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${fleetUtilization}%`,
      height: "100%",
      background: "#3b82f6",
    }}
  />
</div>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "240px",
      border: "1px solid #334155",
    }}
  >
    <h4>📦 Total Deliveries</h4>

    <h2>
      {totalDeliveries}
    </h2>
  </div>

  <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    border: "1px solid #334155",
  }}
>
  <h4>🛠 Fleet Availability</h4>

  <h2>
    {fleetAvailability}%
  </h2>
</div>

  <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    border: "1px solid #334155",
  }}
>
  <h4>📍 Average Route</h4>

  <h2>
    {averageRouteLength} km
  </h2>
</div>

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    border: "1px solid #334155",
  }}
>
  <h4>⚡ Efficiency Score</h4>

  <h2>
    {efficiencyScore}%
  </h2>
</div>

</div>

      <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155",
  }}
>

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    border: "1px solid #334155",
  }}
>
  <h4>⏱ Average ETA</h4>

  <h2>
    {averageETA} mins
  </h2>
</div>


  <h2>🧠 Smart Insights</h2>

  <p style={{ marginTop: "15px" }}>
    {deliveryInsight}
  </p>

  <p>
    {fleetInsight}
  </p>

  <p>
  {efficiencyInsight}
</p>

<p>
  {etaInsight}
</p>

</div>

          <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #334155",
  }}
>
  <h2>📦 Delivery Status Breakdown</h2>

  <div style={{ marginTop: "20px" }}>
    <p>Pending ({pendingCount})</p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (pendingCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#f59e0b",
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      In Transit ({inTransitCount})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (inTransitCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#3b82f6",
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Delivered ({deliveredCount})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (deliveredCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#22c55e",
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
</div>

        <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #334155",
  }}
>
  <h2>🚚 Fleet Analytics</h2>

  <div style={{ marginTop: "20px" }}>
    <p>
      Active ({activeVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (activeVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#22c55e",
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Idle ({idleVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (idleVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#f59e0b",
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Maintenance ({maintenanceVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (maintenanceVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: "#ef4444",
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
</div>

        <h2>📊 System Health</h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div>
            <h4>Fleet Status</h4>
            <p style={{ color: "#22c55e" }}>
              🟢 Operational
            </p>
          </div>

          <div>
            <h4>Traffic Conditions</h4>
            <p style={{ color: "#f59e0b" }}>
              🟡 Moderate
            </p>
          </div>

          <div>
            <h4>Route Engine</h4>
            <p style={{ color: "#22c55e" }}>
              🟢 Online
            </p>
          </div>

          <div>
            <h4>Delivery Success Rate</h4>
            <p style={{ color: "#22c55e" }}>
              {deliverySuccessRate}%
            </p>
          </div>
        </div>
      </div>

        <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #334155",
  }}
>
  <h2>📦 Recent Delivery Activity</h2>

  <div style={{ marginTop: "20px" }}>
    {deliveries.map((delivery) => (
      <div
        key={delivery.id}
        style={{
          padding: "12px",
          borderBottom:
            "1px solid #334155",
        }}
      >
        <strong>{delivery.id}</strong>

        <div>
          Status: {delivery.status}
        </div>
      </div>
    ))}
  </div>
</div>

      <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #334155",
  }}
>
  <h2>🚚 Fleet Status</h2>

  <div style={{ marginTop: "20px" }}>
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          borderBottom:
            "1px solid #334155",
        }}
      >
        <strong>{vehicle.id}</strong>

        <span
          style={{
              color:
    vehicle.status === "Active"
      ? "#22c55e"
      : vehicle.status ===
        "Maintenance"
      ? "#ef4444"
      : "#f59e0b"
          }}
        >
          {vehicle.status}
        </span>
      </div>
    ))}
  </div>
</div>

      <div
  style={{
    marginTop: "30px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #334155",
  }}
>
  <h2>🚨 Live Alerts</h2>

  <div style={{ marginTop: "20px" }}>
    <div
      style={{
        background: "#7c2d12",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      ⚠️ Maintenance check due for fleet vehicles
    </div>

    <div
      style={{
        background: "#78350f",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      🚦 Moderate traffic detected near Turbhe
    </div>

    <div
      style={{
        background: "#14532d",
        padding: "12px",
        borderRadius: "8px",
      }}
    >
      ✅ 2 deliveries completed successfully today
    </div>
  </div>
</div>

    </div>
  );
}

export default Dashboard;