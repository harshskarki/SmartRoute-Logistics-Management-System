import { useState } from "react";

function Vehicles() {
 const [vehicles, setVehicles] = useState([
  {
    id: "TRUCK-001",
    driver: "Rahul Sharma",
    status: "Active",
    location: "Navi Mumbai",
  },
  {
    id: "TRUCK-002",
    driver: "Amit Patel",
    status: "Idle",
    location: "Thane",
  },
]);

  const [vehicleId, setVehicleId] =
    useState("");

  const [driverName, setDriverName] =
    useState("");

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

  const maintenanceVehicles =
  vehicles.filter(
    (vehicle) =>
      vehicle.status ===
      "Maintenance"
  ).length;

const totalVehicles =
  vehicles.length;

    const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

      const toggleVehicleStatus = (id) => {
  setVehicles((prev) =>
    prev.map((vehicle) =>
      vehicle.id === id
        ? {
            ...vehicle,
            status:
              vehicle.status === "Active"
                ? "Idle"
                : "Active",
          }
        : vehicle
    )
  );
};

const deleteVehicle = (id) => {
  setVehicles((prev) =>
    prev.filter(
      (vehicle) => vehicle.id !== id
    )
  );
};

  const addVehicle = () => {
  if (vehicleId.trim() === "") return;

  const newVehicle = {
  id: vehicleId,
  driver:
    driverName.trim() || "Not Assigned",
  status: "Idle",
  location: "Warehouse",
};

  setVehicles([...vehicles, newVehicle]);

setVehicleId("");
setDriverName("");
};

    const filteredVehicles =
  vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      filterStatus === "All" ||
      vehicle.status === filterStatus;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        🚚 Vehicles
      </h1>

            <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      border: "1px solid #334155",
    }}
  >
    <h4>Total Vehicles</h4>

    <h2>{totalVehicles}</h2>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      border: "1px solid #334155",
    }}
  >
    <h4>🟢 Active Vehicles</h4>

    <h2>{activeVehicles}</h2>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      border: "1px solid #334155",
    }}
  >
    <h4>🟡 Idle Vehicles</h4>

    <h2>{idleVehicles}</h2>
  </div>

      <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    border: "1px solid #334155",
  }}
>
  <h4>🔧 Maintenance</h4>

  <h2>{maintenanceVehicles}</h2>
</div>

</div>

          <input
  type="text"
  placeholder="Search Vehicle..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  style={{
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    width: "250px",
  }}
/>

    <select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
  style={{
    padding: "10px",
    marginLeft: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    background: "#1e293b",
    color: "white",
    border: "1px solid #334155",
  }}
>
  <option value="All">
    All
  </option>

  <option value="Active">
    Active
  </option>

  <option value="Idle">
    Idle
  </option>
    
  <option value="Maintenance">
    Maintenance
  </option>
</select>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          value={vehicleId}
          onChange={(e) =>
            setVehicleId(
              e.target.value
            )
          }
          placeholder="Vehicle ID"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border:
              "1px solid #334155",
            background: "#1e293b",
            color: "white",
          }}
        />

        <input
          value={driverName}
          onChange={(e) =>
            setDriverName(
              e.target.value
            )
          }
          placeholder="Driver Name"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border:
              "1px solid #334155",
            background: "#1e293b",
            color: "white",
          }}
        />

        <button
          onClick={addVehicle}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Vehicle
        </button>
      </div>

      {filteredVehicles.map((vehicle) => (
  <div
    key={vehicle.id}
    style={{
      background: "#1e293b",
      padding: "20px",
      marginBottom: "15px",
      borderRadius: "12px",
      border: "1px solid #334155",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>🚚 {vehicle.id}</h3>

      <span
        style={{
          background:
            vehicle.status === "Active"
              ? "#22c55e"
              : "#f59e0b",
          color: "black",
          padding: "5px 10px",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        {vehicle.status}
      </span>
    </div>

    <p>
      <strong>Driver:</strong>{" "}
      {vehicle.driver}
    </p>

    <p>
      <strong>Location:</strong>{" "}
      {vehicle.location}
    </p>

          <button
  onClick={() =>
    toggleVehicleStatus(
      vehicle.id
    )
  }
  style={{
    marginTop: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Toggle Status
</button>

      <button
  onClick={() =>
    deleteVehicle(vehicle.id)
  }
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Delete
</button>

        <select
  value={vehicle.status}
  onChange={(e) => {
    const updatedVehicles =
      vehicles.map((v) =>
        v.id === vehicle.id
          ? {
              ...v,
              status: e.target.value,
            }
          : v
      );

    setVehicles(updatedVehicles);
  }}
  style={{
    marginTop: "10px",
    padding: "8px",
    borderRadius: "8px",
    background: "#0f172a",
    color: "white",
    border: "1px solid #334155",
  }}
>
  <option value="Active">
    Active
  </option>

  <option value="Idle">
    Idle
  </option>

  <option value="Maintenance">
    Maintenance
  </option>
</select>

  </div>
))}
    </div>
  );
}

export default Vehicles;