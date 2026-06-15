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

  const pendingDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Pending"
    ).length;

  const completedDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ===
        "Delivered ✅"
    ).length;

  const activeDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ===
        "In Transit"
    ).length;

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
              98.5%
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