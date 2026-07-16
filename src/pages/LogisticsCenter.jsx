import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

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

function LogisticsCenter() {
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
          marginTop: "20px",
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
        </MapContainer>
      </div>
    </div>
  );
}

export default LogisticsCenter;