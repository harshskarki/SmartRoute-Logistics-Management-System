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

  const addDelivery = () => {
    if (!source || !destination) return;

    const route = getRoute(source, destination);

    const newDelivery = {
      id: Date.now(),
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

    setSelectedDelivery((old) => ({
      ...old,
      status: "In Transit",
    }));
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
          return prev + 1;
        }

        clearInterval(timer);

        setSelectedDelivery((old) => ({
          ...old,
          status: "Delivered ✅",
        }));

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
        }}
      >
        <select
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
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

        <button onClick={addDelivery}>
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
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📦 {delivery.source} →{" "}
          {delivery.destination}
        </div>
      ))}

      {selectedDelivery && (
        <DeliveryDetails
          delivery={selectedDelivery}
          currentIndex={currentIndex}
          startDelivery={startDelivery}
        />
      )}
    </div>
  );
}

export default Deliveries;