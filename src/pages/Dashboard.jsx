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
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h3>
            🚚 Active Vehicles
          </h3>

          <h2>
            {activeVehicles}
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h3>
            📦 Pending Deliveries
          </h3>

          <h2>
            {pendingDeliveries}
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h3>
            🚛 Active Deliveries
          </h3>

          <h2>
            {activeDeliveries}
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
          }}
        >
          <h3>
            ✅ Delivered
          </h3>

          <h2>
            {completedDeliveries}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;