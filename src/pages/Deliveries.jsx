import { useState, useEffect } from "react";
import { getRoute } from "../utils/getRoute";
import DeliveryDetails from "../components/DeliveryDetails";

const stations = [
  "Airoli",
  "Ambarnath",
  "Andheri",
  "Bandra",
  "CBD Belapur",
  "Chembur",
  "Dadar",
  "Ghatkopar",
  "Juinagar",
  "Kharghar",
  "Kurla",
  "Mankhurd",
  "Mansarovar",
  "Nerul",
  "Panvel",
  "Sanpada",
  "Seawoods–Darave",
  "Thane",
  "Turbhe",
  "Vashi",
];

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const addDelivery = () => {
    if (!source || !destination) return;

    const route = getRoute(source, destination);

    const newDelivery = {
      id: `DLV-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      source,
      destination,
      route,
      status: "Pending",
      vehicle: "TRUCK-001",
      eta: `${route.length * 4} mins`,
      distance: `${route.length * 3} km`,
    };

    setDeliveries([...deliveries, newDelivery]);

    setSource("");
    setDestination("");
  };

 const startDelivery = () => {
  setCurrentIndex(0);
  setProgress(0);

  const updatedDelivery = {
    ...selectedDelivery,
    status: "In Transit",
  };

  setSelectedDelivery(updatedDelivery);

  setDeliveries((prev) =>
    prev.map((d) =>
      d.id === updatedDelivery.id
        ? updatedDelivery
        : d
    )
  );
};

    useEffect(() => {
  if (!selectedDelivery) return;

  if (selectedDelivery.status !== "In Transit")
    return;

  const timer = setInterval(() => {
    setCurrentIndex((prev) => {
      if (
        prev <
        selectedDelivery.route.length - 1
      ) {
        const nextIndex = prev + 1;

        setProgress(
          Math.floor(
            (nextIndex /
              (selectedDelivery.route.length - 1)) *
              100
          )
        );

        return nextIndex;
      }

        clearInterval(timer);

setProgress(100);

const delivered = {
  ...selectedDelivery,
  status: "Delivered ✅",
};

setSelectedDelivery(delivered);

setDeliveries((prevDeliveries) =>
  prevDeliveries.map((d) =>
    d.id === delivered.id
      ? delivered
      : d
  )
);

return prev;
    });
  }, 2000);

  return () => clearInterval(timer);
}, [selectedDelivery]);

  return (
    <div>
      <h1>📦 Deliveries</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            minWidth: "180px",
          }}
        >
          <option value="">
            Select Source
          </option>

          {stations.map((station) => (
            <option
              key={station}
              value={station}
            >
              {station}
            </option>
          ))}
        </select>

        <select
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            minWidth: "180px",
          }}
        >
          <option value="">
            Select Destination
          </option>

          {stations.map((station) => (
            <option
              key={station}
              value={station}
            >
              {station}
            </option>
          ))}
        </select>

        <button
          onClick={addDelivery}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Delivery
        </button>
      </div>

      {deliveries.map((delivery) => (
        <div
          key={delivery.id}
          onClick={() =>
            setSelectedDelivery(delivery)
          }
          style={{
            background: "#1e293b",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "12px",
            cursor: "pointer",
            border: "1px solid #334155",
            transition: "0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h3>
              📦 Delivery #{delivery.id}
            </h3>

            <span
              style={{
                background:
                  delivery.status ===
                  "Delivered ✅"
                    ? "#22c55e"
                    : delivery.status ===
                      "In Transit"
                    ? "#3b82f6"
                    : "#f59e0b",
                color: "black",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {delivery.status}
            </span>
          </div>

          <p>
            <strong>Route:</strong>{" "}
            {delivery.source} →{" "}
            {delivery.destination}
          </p>

          <p>
            <strong>Vehicle:</strong>{" "}
            {delivery.vehicle}
          </p>

          <p>
            <strong>Distance:</strong>{" "}
            {delivery.distance}
          </p>

          <p>
            <strong>ETA:</strong>{" "}
            {delivery.eta}
          </p>
        </div>
      ))}

      {selectedDelivery && (
  <DeliveryDetails
    delivery={selectedDelivery}
    currentIndex={currentIndex}
    progress={progress}
    startDelivery={startDelivery}
  />
)}
    </div>
  );
}

export default Deliveries;