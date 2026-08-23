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

{/* Fleet Header */}

      <div
  style={{
    marginBottom: "30px",
    padding: "24px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h1
    style={{
      fontSize: "32px",
      marginBottom: "10px",
    }}
  >
    🚚 Fleet Management Center
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "14px",
      margin: 0,
    }}
  >
    Manage vehicles, monitor fleet
    status, and track operational
    availability in real time.
  </p>
</div>

{/* KPI Cards */}

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

 {/* Search & Filter */}

<div
  style={{
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "25px",
  }}
>
  <input
    type="text"
    placeholder="Search Vehicle..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    style={{
      padding: "14px 18px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px)",
      color: "white",
      width: "320px",
      fontSize: "14px",
      outline: "none",
    }}
  />

  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
    style={{
      padding: "14px 18px",
      borderRadius: "14px",
      background:"rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px)",
      color: "white",
      border:"1px solid rgba(255,255,255,0.08)",
      fontSize: "14px",
    }}
  >
    <option value="All">All</option>
    <option value="Active">Active</option>
    <option value="Idle">Idle</option>
    <option value="Maintenance">Maintenance</option>
  </select>
</div>

{/* Add Vehicle Form */}

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

      {filteredVehicles.length === 0 ? (
  <div
    style={{
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "50px",
      textAlign: "center",
      marginTop: "20px",
    }}
  >
    <div
      style={{
        fontSize: "60px",
        marginBottom: "15px",
      }}
    >
      🚚
    </div>

    <h2>No Vehicles Found</h2>

    <p
      style={{
        color: "#94a3b8",
      }}
    >
      Try changing your search,
      filter settings, or add a new
      vehicle to the fleet.
    </p>
  </div>
) : (
  filteredVehicles.map((vehicle) => (
    <div
      key={vehicle.id}
      style={{
        background:
          "rgba(255,255,255,0.05)",
        backdropFilter:
          "blur(16px)",
        WebkitBackdropFilter:
          "blur(16px)",
        padding: "24px",
        marginBottom: "20px",
        borderRadius: "20px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.25)",
        transition:
          "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            margin: 0,
          }}
        >
          {vehicle.status === "Active"
            ? "🚚"
            : vehicle.status === "Maintenance"
            ? "🔧"
            : "🅿️"}{" "}
          {vehicle.id}
        </h3>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background:
              vehicle.status === "Active"
                ? "rgba(34,197,94,0.15)"
                : vehicle.status ===
                  "Maintenance"
                ? "rgba(239,68,68,0.15)"
                : "rgba(245,158,11,0.15)",
            color:
              vehicle.status === "Active"
                ? "#22c55e"
                : vehicle.status ===
                  "Maintenance"
                ? "#ef4444"
                : "#f59e0b",
            padding: "8px 16px",
            borderRadius: "999px",
            fontWeight: "600",
            fontSize: "12px",
            border:
              vehicle.status === "Active"
                ? "1px solid rgba(34,197,94,0.3)"
                : vehicle.status ===
                  "Maintenance"
                ? "1px solid rgba(239,68,68,0.3)"
                : "1px solid rgba(245,158,11,0.3)",
          }}
        >
          {vehicle.status === "Active"
            ? "🟢"
            : vehicle.status === "Maintenance"
            ? "🔴"
            : "🟡"}

          {vehicle.status}
        </span>
      </div>

      <p
        style={{
          color: "#cbd5e1",
        }}
      >
        👨‍✈️ {vehicle.driver}
      </p>

      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {vehicle.status === "Active"
          ? "🟢 Operational Vehicle"
          : vehicle.status === "Maintenance"
          ? "🔧 Under Maintenance"
          : "🅿️ Waiting Assignment"}
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
                    status:
                      e.target.value,
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
          border:
            "1px solid #334155",
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
  ))
)}
    </div>
  );
}

export default Vehicles;