import { useState } from "react";

function Vehicles() {
  const [vehicles, setVehicles] = useState([
    "TRUCK-001",
    "TRUCK-002"
  ]);

  const [vehicleId, setVehicleId] = useState("");

  const addVehicle = () => {
    if (vehicleId.trim() === "") return;

    setVehicles([...vehicles, vehicleId]);
    setVehicleId("");
  };

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
          marginBottom: "20px",
        }}
      >
        <input
          value={vehicleId}
          onChange={(e) =>
            setVehicleId(e.target.value)
          }
          placeholder="Enter Vehicle ID"
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={addVehicle}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Add Vehicle
        </button>
      </div>

      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          🚚 {vehicle}
        </div>
      ))}
    </div>
  );
}

export default Vehicles;