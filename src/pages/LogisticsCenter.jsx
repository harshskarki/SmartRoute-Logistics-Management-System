import React, {
  useState,
  useEffect,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import { routeGraph } from "../data/routeGraph";
import { vehicles } from "../data/mockData";

const stations = [
  {
    name: "Panvel",
    position: [18.9894, 73.1175],
  },
  {
    name: "Vashi",
    position: [19.0771, 72.9986],
  },
  {
    name: "Nerul",
    position: [19.0330, 73.0297],
  },
  {
    name: "Belapur",
    position: [19.0247, 73.0398],
  },
  {
    name: "Thane",
    position: [19.2183, 72.9781],
  },
];

const deliveryRoutes = [
  [
    [18.9894, 73.1175],
    [19.0247, 73.0398],
    [19.0330, 73.0297],
    [19.0771, 72.9986],
  ],

  [
    [19.2183, 72.9781],
    [19.0771, 72.9986],
    [19.0330, 73.0297],
  ],

  [
    [19.0247, 73.0398],
    [19.0330, 73.0297],
    [18.9894, 73.1175],
  ],
];

const initialVehicleLocations = [
  {
    id: "TRUCK-001",
    position: [19.0330, 73.0297],
  },
  {
    id: "TRUCK-002",
    position: [19.0771, 72.9986],
  },
  {
    id: "TRUCK-003",
    position: [18.9894, 73.1175],
  },
];

const routeColors = [
  "#f59e0b", // Pending
  "#3b82f6", // In Transit
  "#22c55e", // Delivered
];

const vehicleAssignments = {
  "TRUCK-001": "Route A",
  "TRUCK-002": "Route B",
  "TRUCK-003": "Route C",
};

const initialTimeline = [
  {
    time: "09:00",
    route: "Route A",
    event: "Delivery Created",
  },
  {
    time: "09:15",
    route: "Route A",
    event: "Vehicle Assigned",
  },
  {
    time: "10:00",
    route: "Route A",
    event: "In Transit",
  },
  {
    time: "11:30",
    route: "Route A",
    event: "Reached Destination Hub",
  },
  {
    time: "12:00",
    route: "Route A",
    event: "Delivered",
  },
];

const initialAlerts = [
  {
    severity: "warning",
    message:
      "Heavy traffic detected near Vashi",
  },
  {
    severity: "critical",
    message:
      "TRUCK-003 requires maintenance",
  },
  {
    severity: "info",
    message:
      "Delivery DLV-1004 completed",
  },
];

function LogisticsCenter() {

    console.log(routeGraph);

    const [vehicleLocations, setVehicleLocations] =
      useState(initialVehicleLocations);

    const [timeline, setTimeline] =
      useState(initialTimeline);

    const [alerts, setAlerts] =
      useState(initialAlerts);

    const criticalAlerts = alerts.filter(
      (alert) =>
        alert.severity === "critical"
    ).length;

    const warningAlerts = alerts.filter(
      (alert) =>
        alert.severity === "warning"
    ).length;

    const infoAlerts = alerts.filter(
      (alert) =>
        alert.severity === "info"
    ).length;

        useEffect(() => {
            const interval = setInterval(() => {
                setVehicleLocations((prev) =>
                prev.map((vehicle, index) => {
                    const movementPatterns = [
                        [0.001, 0.001],
                        [-0.001, 0.001],
                        [0.001, -0.001],
                        ];

                        return {
                        ...vehicle,
                        position: [
                            vehicle.position[0] +
                            movementPatterns[index][0],
                            vehicle.position[1] +
                            movementPatterns[index][1],
                        ],
                        };
                })
                );
            }, 3000);

          return () => clearInterval(interval);
        }, []);

        useEffect(() => {
          const interval = setInterval(() => {
            setTimeline((prev) => {
              if (prev.length >= 7)
                return prev;

              const nextEvents = [
                {
                  time: "12:30",
                  route: "Route A",
                  event: "Customer Notified",
                },
                {
                  time: "13:00",
                  route: "Route A",
                  event: "Delivery Confirmed",
                },
              ];

              return [
                ...prev,
                nextEvents[prev.length - 5],
              ];
            });
          }, 8000);

          return () =>
            clearInterval(interval);
        }, []);

        useEffect(() => {
          const interval = setInterval(() => {
            setAlerts((prev) => {
              if (prev.length >= 5)
                return prev;

              const newAlerts = [
                {
                  severity: "warning",
                  message:
                    "Traffic congestion detected near Nerul",
                },
                {
                  severity: "info",
                  message:
                    "TRUCK-001 reached destination hub",
                },
              ];

              return [
                ...prev,
                newAlerts[prev.length - 3],
              ];
            });
          }, 10000);

          return () => clearInterval(interval);
        }, []);

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
      }}
    >
      <h1>🗺 Logistics Center</h1>

      <p>
        Real-time vehicle tracking and route intelligence.
      </p>

      <div
        style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
        }}
        >
        <div
            style={{
            flex: 3,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #334155",
            }}
        >
            <MapContainer
            center={[19.0330, 73.0297]}
            zoom={11}
            style={{
                height: "600px",
                width: "100%",
            }}
            >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stations.map((station) => (
                <Marker
                key={station.name}
                position={station.position}
                >
                <Popup>
                    📍 {station.name}
                </Popup>
                </Marker>
            ))}

            {vehicleLocations.map((vehicle) => {
                const vehicleData = vehicles.find(
                (v) => v.id === vehicle.id
                );

                return (
                <Marker
                    key={vehicle.id}
                    position={vehicle.position}
                >
                    <Popup>
                      🚚 {vehicle.id}
                      <br />
                      Status: {vehicleData?.status}
                      <br />
                      Assigned:
                      {" "}
                      {vehicleAssignments[vehicle.id]}
                    </Popup>
                </Marker>
                );
            })}
            
            {deliveryRoutes.map((route, index) => (
              <Polyline
                key={index}
                positions={route}
                pathOptions={{
                  color: routeColors[index],
                  weight: 5,
                }}
              />
            ))}
            
            </MapContainer>
        </div>

        <div
          style={{
            flex: 1,
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155",
            height: "fit-content",
          }}
        >
          <h2>🚚 Fleet Tracking</h2>

          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                marginTop: "15px",
                paddingBottom: "12px",
                borderBottom: "1px solid #334155",
              }}
            >
              <strong>{vehicle.id}</strong>

              <div>
                Status: {vehicle.status}
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                {vehicleAssignments[vehicle.id]}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <h3>📦 Route Status</h3>

            <p>🟠 Pending</p>
            <p>🔵 In Transit</p>
            <p>🟢 Delivered</p>

            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3>📦 Delivery Timeline</h3>

              {timeline.map(
                (item, index) => (
                  <div
                    key={index}
                    style={{
                      marginTop: "12px",
                      padding: "10px",
                      borderLeft:
                        "3px solid #3b82f6",
                      background: "#0f172a",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        color: "#60a5fa",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {item.time}
                    </div>

                    <div
                      style={{
                        color: "#fbbf24",
                        fontSize: "13px",
                      }}
                    >
                      {item.route}
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        color: "#e2e8f0",
                      }}
                    >
                      {item.event}
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3>🚨 Live Alerts</h3>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  marginBottom: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background: "#7f1d1d",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                >
                  🔴 {criticalAlerts}
                </div>

                <div
                  style={{
                    background: "#78350f",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                >
                  🟡 {warningAlerts}
                </div>

                <div
                  style={{
                    background: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #334155",
                  }}
                >
                  🟢 {infoAlerts}
                </div>
              </div>

              {alerts.map((alert, index) => (
                <div
                  key={index}
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    background:
                      alert.severity === "critical"
                        ? "#7f1d1d"
                        : alert.severity === "warning"
                        ? "#78350f"
                        : "#0f172a",
                  }}
                >
                  <>
                    <strong>
                      {alert.severity === "critical"
                        ? "🔴 CRITICAL"
                        : alert.severity === "warning"
                        ? "🟡 WARNING"
                        : "🟢 INFO"}
                    </strong>

                    <div
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      {alert.message}
                    </div>
                  </>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LogisticsCenter;