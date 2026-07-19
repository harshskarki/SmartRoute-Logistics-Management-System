import { useEffect, useState } from "react";

import {
  vehicles,
  deliveries,
} from "../data/mockData";

function Dashboard() {

  const [displayActiveVehicles, setDisplayActiveVehicles] =
    useState(0);

  const [displayPendingDeliveries, setDisplayPendingDeliveries] =
    useState(0);

  const [displayActiveDeliveries, setDisplayActiveDeliveries] =
    useState(0);

  const [displayCompletedDeliveries, setDisplayCompletedDeliveries] =
    useState(0);

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

const totalVehicles =
  vehicles.length;

  const pendingDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Pending"
    ).length;

  const completedDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ==="Delivered ✅"
    ).length;

  const activeDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.status ===
        "In Transit"
    ).length;

    const totalDeliveries = deliveries.length;

    useEffect(() => {
      let activeCounter = 0;
      let pendingCounter = 0;
      let transitCounter = 0;
      let deliveredCounter = 0;

      const interval = setInterval(() => {
        if (activeCounter < activeVehicles) {
          activeCounter++;
          setDisplayActiveVehicles(activeCounter);
        }

        if (pendingCounter < pendingDeliveries) {
          pendingCounter++;
          setDisplayPendingDeliveries(
            pendingCounter
          );
        }

        if (transitCounter < activeDeliveries) {
          transitCounter++;
          setDisplayActiveDeliveries(
            transitCounter
          );
        }

        if (
          deliveredCounter <
          completedDeliveries
        ) {
          deliveredCounter++;
          setDisplayCompletedDeliveries(
            deliveredCounter
          );
        }

        if (
          activeCounter >= activeVehicles &&
          pendingCounter >= pendingDeliveries &&
          transitCounter >= activeDeliveries &&
          deliveredCounter >= completedDeliveries
        ) {
          clearInterval(interval);
        }
      }, 120);

      return () => clearInterval(interval);
    }, [
      activeVehicles,
      pendingDeliveries,
      activeDeliveries,
      completedDeliveries,
    ]);

    const averageRouteLength =
      deliveries.length > 0
        ? Math.round(
            deliveries.reduce(
              (sum, delivery) =>
                sum +
                parseInt(
                  delivery.distance || "0"
                ),
              0
            ) / deliveries.length
          )
        : 0;

    const averageETA =
      deliveries.length > 0
        ? Math.round(
            deliveries.reduce(
              (sum, delivery) =>
                sum +
                parseInt(
                  delivery.eta || "0"
                ),
              0
            ) / deliveries.length
          )
        : 0;

  const deliverySuccessRate =
    totalDeliveries > 0
      ? Math.round(
          (completedDeliveries /
            totalDeliveries) *
            100
        )
      : 0;

  const fleetUtilization =
    vehicles.length > 0
      ? Math.round(
          (activeVehicles /
            vehicles.length) *
            100
        )
      : 0;
    
  const fleetAvailability =
    totalVehicles > 0
      ? Math.round(
          ((activeVehicles +
            idleVehicles) /
            totalVehicles) *
            100
        )
      : 0;

  const efficiencyScore = Math.round(
    (deliverySuccessRate +
      fleetUtilization +
      fleetAvailability) /
      3
  );

  const activeVehicleTrend = "+12%";
  const pendingDeliveryTrend = "-5%";
  const activeDeliveryTrend = "+8%";
  const deliveredTrend = "+15%";

  const deliveryInsight =
    deliverySuccessRate >= 80
      ? "✅ Delivery performance is excellent"
      : "⚠️ Delivery performance needs attention";

        const pendingCount =
    deliveries.filter(
      (delivery) =>
        delivery.status === "Pending"
    ).length;

  const inTransitCount =
    deliveries.filter(
      (delivery) =>
        delivery.status === "In Transit"
    ).length;

const deliveredCount =
  deliveries.filter(
    (delivery) =>
      delivery.status === "Delivered ✅"
  ).length;

  const maintenanceVehicles =
  vehicles.filter(
    (vehicle) =>
      vehicle.status ==="Maintenance"
  ).length;

const fleetInsight =
  fleetUtilization >= 60
    ? "🚚 Fleet utilization is healthy"
    : "⚠️ Fleet utilization is low";

    const efficiencyInsight =
  efficiencyScore >= 75
    ? "⚡ Operations are running efficiently"
    : "⚠️ Operational efficiency can improve";

    const etaInsight =
  averageETA <= 15
    ? "⏱ Delivery times are efficient"
    : "⚠️ Average ETA is increasing";

  const colors = {
    card: "#1e293b",
    border: "#334155",
    textMuted: "#94a3b8",

    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    primary: "#3b82f6",
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    padding: "20px",
    borderRadius: "16px",
    flex: "1 1 240px",
    minWidth: "240px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const kpiCardStyle = {
  background: "rgba(30,41,59,0.9)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "24px",
  minWidth: "260px",
  flex: "1 1 260px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.35)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

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
          style={kpiCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background:
                  "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              🚚
            </div>

            <span
              style={{
                background:
                  "rgba(34,197,94,0.15)",
                color: "#22c55e",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
              }}
            >
              LIVE
            </span>
          </div>

          <div
            style={{
              color: colors.textMuted,
              fontSize: "14px",
            }}
          >
            Active Vehicles
          </div>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
              marginBottom: "8px",
            }}
          >
            {displayActiveVehicles}
          </h2>

          <div
            style={{
              color: "#22c55e",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ▲ {activeVehicleTrend} vs last week
          </div>
        </div>

        <div
          style={kpiCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 15px 35px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "none";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background: "rgba(245,158,11,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              📦
            </div>

            <span
              style={{
                background: "rgba(245,158,11,0.15)",
                color: "#f59e0b",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
              }}
            >
              PENDING
            </span>
          </div>

          <div
            style={{
              color: colors.textMuted,
              fontSize: "14px",
            }}
          >
            Pending Deliveries
          </div>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
              marginBottom: "8px",
            }}
          >
            {displayPendingDeliveries}
          </h2>

          <div
            style={{
              color: "#ef4444",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ▼ {pendingDeliveryTrend} vs yesterday
          </div>
        </div>

        <div
          style={kpiCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background:
                  "rgba(59,130,246,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              🚛
            </div>

            <span
              style={{
                background:
                  "rgba(59,130,246,0.15)",
                color: "#3b82f6",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
              }}
            >
              ACTIVE
            </span>
          </div>

          <div
            style={{
              color: colors.textMuted,
              fontSize: "14px",
            }}
          >
            Active Deliveries
          </div>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
              marginBottom: "8px",
            }}
          >
            {displayActiveDeliveries}
          </h2>

          <div
            style={{
              color: "#3b82f6",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ▲ {activeDeliveryTrend} in transit
          </div>
        </div>

        <div
          style={kpiCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "14px",
                background:
                  "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              ✅
            </div>

            <span
              style={{
                background:
                  "rgba(34,197,94,0.15)",
                color: "#22c55e",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
              }}
            >
              COMPLETED
            </span>
          </div>

          <div
            style={{
              color: colors.textMuted,
              fontSize: "14px",
            }}
          >
            Delivered
          </div>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
              marginBottom: "8px",
            }}
          >
            {displayCompletedDeliveries}
          </h2>

          <div
            style={{
              color: "#22c55e",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ▲ {deliveredTrend} completed
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "25px",
          borderRadius: "16px",
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >

        <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px",
  }}
>
  <div
    style={cardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
  >
    <h4>📈 Delivery Success Rate</h4>

    <h2>
      {deliverySuccessRate}%
    </h2>
    <div
  style={{
    width: "100%",
    height: "10px",
    background: "#334155",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${deliverySuccessRate}%`,
      height: "100%",
      background: colors.success,
    }}
  />
</div>
  </div>

  <div
    style={cardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
  >
    <h4>🚚 Fleet Utilization</h4>

    <h2>
      {fleetUtilization}%
    </h2>
    <div
  style={{
    width: "100%",
    height: "10px",
    background: "#334155",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${fleetUtilization}%`,
      height: "100%",
      background: colors.primary,
    }}
  />
</div>
  </div>

  <div
    style={cardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
  >
    <h4>📦 Total Deliveries</h4>

    <h2>
      {totalDeliveries}
    </h2>
  </div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "none";
  }}
>
  <h4>🛠 Fleet Availability</h4>

  <h2>
    {fleetAvailability}%
  </h2>
</div>

  <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "none";
  }}
>
  <h4>📍 Average Route</h4>

  <h2>
    {averageRouteLength} km
  </h2>
</div>

<div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "none";
  }}
>
  <h4>⚡ Efficiency Score</h4>

  <h2>
    {efficiencyScore}%
  </h2>
</div>

<div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "none";
  }}
>
  <h4>⏱ Average ETA</h4>

  <h2>
    {averageETA} mins
  </h2>
</div>

</div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          🧠 Smart Insights
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              borderLeft:
                "4px solid #22c55e",
            }}
          >
            <h4>
              📦 Delivery Performance
            </h4>

            <p
              style={{
                marginTop: "12px",
                color: colors.textMuted,
              }}
            >
              {deliveryInsight}
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              borderLeft:
                "4px solid #3b82f6",
            }}
          >
            <h4>
              🚚 Fleet Utilization
            </h4>

            <p
              style={{
                marginTop: "12px",
                color: colors.textMuted,
              }}
            >
              {fleetInsight}
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              borderLeft:
                "4px solid #f59e0b",
            }}
          >
            <h4>
              ⚡ Efficiency
            </h4>

            <p
              style={{
                marginTop: "12px",
                color: colors.textMuted,
              }}
            >
              {efficiencyInsight}
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              borderLeft:
                "4px solid #8b5cf6",
            }}
          >
            <h4>
              ⏱ ETA Analysis
            </h4>

            <p
              style={{
                marginTop: "12px",
                color: colors.textMuted,
              }}
            >
              {etaInsight}
            </p>
          </div>
        </div>
      </div>

          <div
  style={{
    marginTop: "30px", 
    padding: "25px",
    borderRadius: "16px",
    background: colors.card,
    border: `1px solid ${colors.border}`,
  }}
>
  <h2>📦 Delivery Status Breakdown</h2>

  <div style={{ marginTop: "20px" }}>
    <p>Pending ({pendingCount})</p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (pendingCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.warning,
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      In Transit ({inTransitCount})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (inTransitCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.primary,
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Delivered ({deliveredCount})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalDeliveries > 0
              ? (deliveredCount /
                  totalDeliveries) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.success,
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
</div>

        <div
  style={{
    marginTop: "30px",
    padding: "25px",
    borderRadius: "16px",
    background: colors.card,
    border: `1px solid ${colors.border}`,
  }}
>
  <h2>🚚 Fleet Analytics</h2>

  <div style={{ marginTop: "20px" }}>
    <p>
      Active ({displayActiveVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (activeVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.success,
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Idle ({idleVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (idleVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.warning,
          borderRadius: "10px",
        }}
      />
    </div>

    <p style={{ marginTop: "15px" }}>
      Maintenance ({maintenanceVehicles})
    </p>

    <div
      style={{
        height: "12px",
        background: "#334155",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          width: `${
            totalVehicles > 0
              ? (maintenanceVehicles /
                  totalVehicles) *
                100
              : 0
          }%`,
          height: "100%",
          background: colors.danger,
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
</div>

      <div
        style={{
          marginTop: "30px",
          padding: "25px",
          borderRadius: "16px",
          background: colors.card,
          border: `1px solid ${colors.border}`,
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
            <p style={{ color: colors.success }}>
              🟢 Operational
            </p>
          </div>

          <div>
            <h4>Traffic Conditions</h4>
            <p style={{ color: colors.warning }}>
              🟡 Moderate
            </p>
          </div>

          <div>
            <h4>Route Engine</h4>
            <p style={{ color: colors.success }}>
              🟢 Online
            </p>
          </div>

          <div>
            <h4>Delivery Success Rate</h4>
            <p style={{ color: colors.success }}>
              {deliverySuccessRate}%
            </p>
          </div>
        </div>
      </div>
    </div>

        <div
  style={{
    marginTop: "30px",
    padding: "25px",
    borderRadius: "16px",
    background: colors.card,
    border: `1px solid ${colors.border}`,
  }}
>
  <h2>📦 Recent Delivery Activity</h2>

  <div style={{ marginTop: "20px" }}>
  {deliveries.length === 0 ? (
    <p
      style={{
        color: colors.textMuted,
      }}
    >
      No deliveries available.
    </p>
  ) : (
    deliveries
      .slice(-3)
      .reverse()
      .map((delivery) => (
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
      ))
  )}
  </div>
</div>

      <div
  style={{
    marginTop: "30px",
    padding: "25px",
    borderRadius: "16px",
    background: colors.card,
    border: `1px solid ${colors.border}`,
  }}
>
  <h2>🚚 Fleet Status</h2>

<div style={{ marginTop: "20px" }}>
  {vehicles.length === 0 ? (
    <p
      style={{
        color: colors.textMuted,
      }}
    >
      No vehicles available.
    </p>
  ) : (
    vehicles.map((vehicle) => (
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
                ? colors.success
                : vehicle.status ===
                  "Maintenance"
                ? colors.danger
                : colors.warning
          }}
        >
          {vehicle.status}
        </span>
      </div>
    ))
  )}
  </div>
</div>

      <div
  style={{
    marginTop: "30px",
    padding: "25px",
    borderRadius: "16px",
    background: colors.card,
    border: `1px solid ${colors.border}`,
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