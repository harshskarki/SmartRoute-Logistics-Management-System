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
  "Harsh Vihar",
];

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] =
  useState("");

  const [error, setError] = useState("");

const [filterStatus, setFilterStatus] =
  useState("All");

  const addDelivery = () => {
 if (!source || !destination) return;

if (source === destination) {
  setError(
    "Source and Destination cannot be the same"
  );
  return;
}

setError("");

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

  const filteredDeliveries =
  deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      filterStatus === "All" ||
      delivery.status === filterStatus;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  return (
    <div>
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
    📦 Delivery Operations Center
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "14px",
      margin: 0,
    }}
  >
    Create deliveries, manage routes,
    monitor shipment progress, and
    track logistics operations.
  </p>
</div>

      {error && (
  <div
    style={{
      background: "#7f1d1d",
      color: "white",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
      border: "1px solid #ef4444",
    }}
  >
    ⚠️ {error}
  </div>
)}

      <div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="Search Delivery ID..."
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
      background:
        "rgba(255,255,255,0.05)",
      backdropFilter: "blur(16px)",
      color: "white",
      border:
        "1px solid rgba(255,255,255,0.08)",
      fontSize: "14px",
    }}
  >
    <option
      value="All"
      style={{
        background: "#0f172a",
        color: "white",
      }}
    >
      All
    </option>

    <option
      value="Pending"
      style={{
        background: "#0f172a",
        color: "white",
      }}
    >
      Pending
    </option>

    <option
      value="In Transit"
      style={{
        background: "#0f172a",
        color: "white",
      }}
    >
      In Transit
    </option>

    <option
      value="Delivered ✅"
      style={{
        background: "#0f172a",
        color: "white",
      }}
    >
      Delivered
    </option>
  </select>
</div>

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
            padding: "14px 18px",
            borderRadius: "14px",
            background:
              "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            color: "white",
            border:
              "1px solid rgba(255,255,255,0.08)",
            minWidth: "220px",
          }}
        >
          <option
            value=""
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            Select Source
          </option>

          {stations.map((station) => (
            <option
              key={station}
              value={station}
              style={{
                background: "#0f172a",
                color: "white",
              }}
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
            padding: "14px 18px",
            borderRadius: "14px",
            background:
              "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            color: "white",
            border:
              "1px solid rgba(255,255,255,0.08)",
            minWidth: "220px",
          }}
        >
          <option
            value=""
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            Select Destination
          </option>

          {stations.map((station) => (
            <option
              key={station}
              value={station}
              style={{
                background: "#0f172a",
                color: "white",
              }}
            >
              {station}
            </option>
          ))}
        </select>

        <button
          onClick={addDelivery}
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",

            color: "white",

            border: "none",

            padding: "14px 22px",

            borderRadius: "14px",

            cursor: "pointer",

            fontWeight: "600",

            boxShadow:
              "0 8px 24px rgba(37,99,235,0.35)",
          }}
        >
          Add Delivery
        </button>
      </div>

      {filteredDeliveries.map((delivery) => (
        <div
          key={delivery.id}
          onClick={() =>
            setSelectedDelivery(delivery)
          }
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

            cursor: "pointer",

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
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "22px",
              }}
            >
              📦 {delivery.id}
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
                color:
                delivery.status === "In Transit"
                  ? "white"
                  : "black",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {delivery.status}
            </span>
          </div>

          <div
            style={{
              marginTop: "18px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              📍 {delivery.source}
            </div>

            <div
              style={{
                marginLeft: "8px",
                color: "#64748b",
              }}
            >
              ↓
            </div>

            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              📍 {delivery.destination}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              color: "#cbd5e1",
              marginTop: "10px",
            }}
          >
            <span>🚚 {delivery.vehicle}</span>

            <span>📏 {delivery.distance}</span>

            <span>⏱ {delivery.eta}</span>
          </div>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "15px",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              <span
                style={{
                  color:
                    delivery.status === "Pending"
                      ? "#f59e0b"
                      : "#22c55e",
                }}
              >
                🟡 Pending
              </span>

              <span style={{ color: "#64748b" }}>
                →
              </span>

              <span
                style={{
                  color:
                    delivery.status === "In Transit"
                      ? "#3b82f6"
                      : delivery.status ===
                        "Delivered ✅"
                      ? "#22c55e"
                      : "#64748b",
                }}
              >
                🔵 In Transit
              </span>

              <span style={{ color: "#64748b" }}>
                →
              </span>

              <span
                style={{
                  color:
                    delivery.status ===
                    "Delivered ✅"
                      ? "#22c55e"
                      : "#64748b",
                }}
              >
                🟢 Delivered
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              color: "#60a5fa",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            View Route →
          </div>
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