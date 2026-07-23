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

  const [timeFilter, setTimeFilter] =
    useState("Today");

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
    background: "#0f172a",

    card: "#1e293b",

    glass: "rgba(30,41,59,0.65)",

    border: "#334155",

    text: "#f8fafc",

    textMuted: "#94a3b8",

    primary: "#3b82f6",

    success: "#22c55e",

    warning: "#f59e0b",

    danger: "#ef4444",

    info: "#06b6d4",

    purple: "#8b5cf6",

    gradientPrimary:
      "linear-gradient(135deg,#3b82f6,#60a5fa)",

    gradientSuccess:
      "linear-gradient(135deg,#22c55e,#4ade80)",

    gradientWarning:
      "linear-gradient(135deg,#f59e0b,#fbbf24)",

    gradientDanger:
      "linear-gradient(135deg,#ef4444,#f87171)",
  };

  const kpiCardStyle = {
    background: colors.glass,

    backdropFilter: "blur(16px)",

    WebkitBackdropFilter: "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "20px",

    padding: "24px",

    flex: "1 1 260px",

    minWidth: "260px",

    cursor: "pointer",

    transition: "all 0.3s ease",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  };

  const buttonStyle = {
    background: colors.glass,

    backdropFilter: "blur(16px)",

    WebkitBackdropFilter: "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    color: colors.text,

    padding: "12px 18px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "600",

    transition: "all 0.3s ease",

    boxShadow:
      "0 6px 18px rgba(0,0,0,0.2)",
  };

  const typography = {
    pageTitle: {
      fontSize: "42px",
      fontWeight: "700",
      letterSpacing: "x-1px",
    },

    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
    },

    smallTitle: {
      fontSize: "16px",
      fontWeight: "600",
    },

    cardTitle: {
      fontSize: "14px",
      fontWeight: "500",
      color: colors.textMuted,
    },

    cardValue: {
      fontSize: "42px",
      fontWeight: "700",
      marginTop: "10px",
    },

    smallCardValue: {
      fontSize: "28px",
      fontWeight: "700",
      marginTop: "8px",
    },

    bodyText: {
      fontSize: "15px",
      color: colors.textMuted,
    },
  };

{/*Dashboard Header Section*/}

  return (
    <div>
      <div
        style={{
          background: colors.glass,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          borderRadius: "24px",

          padding: "30px",

          marginBottom: "30px",

          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                ...typography.pageTitle,

                background:
                  "linear-gradient(90deg,#60a5fa,#22c55e)",

                WebkitBackgroundClip: "text",

                WebkitTextFillColor:
                  "transparent",

                marginBottom: "10px",
              }}
            >
              🚚 SmartRoute Dashboard
            </h1>

            <p style={typography.bodyText}>
              Smart Logistics Intelligence Platform
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background:
                  `${colors.primary}20`,

                color: "#60a5fa",

                padding: "10px 18px",

                borderRadius: "999px",

                fontWeight: "600",
              }}
            >
              🚚 Fleet: {totalVehicles}
            </div>

            <div
              style={{
                background:
                  `${colors.success}20`,

                color: colors.success,

                padding: "10px 18px",

                borderRadius: "999px",

                fontWeight: "600",
              }}
            >
              📦 Deliveries: {totalDeliveries}
            </div>

            <div
              style={{
                background:
                  `${colors.warning}20`,

                color: colors.warning,

                padding: "10px 18px",

                borderRadius: "999px",

                fontWeight: "600",
              }}
            >
              ⚡ Efficiency: {efficiencyScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {["Today", "Week", "Month"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() =>
                setTimeFilter(filter)
              }
              style={{
                padding: "10px 18px",

                borderRadius: "12px",

                border:
                  timeFilter === filter
                    ? "1px solid #3b82f6"
                    : "1px solid rgba(255,255,255,0.08)",

                background:
                  timeFilter === filter
                    ? "rgba(59,130,246,0.2)"
                    : colors.glass,

                color:
                  timeFilter === filter
                    ? "#60a5fa"
                    : "#ffffff",

                cursor: "pointer",

                fontWeight: "600",

                backdropFilter:
                  "blur(16px)",

                transition:
                  "all 0.3s ease",
              }}
            >
              {filter}
            </button>
          )
        )}
      </div>

<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <button
    style={buttonStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 12px 24px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 6px 18px rgba(0,0,0,0.2)";
    }}
  >
    ➕ New Delivery
  </button>

  <button
    style={buttonStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 12px 24px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 6px 18px rgba(0,0,0,0.2)";
    }}
  >
    🚚 Add Vehicle
  </button>

  <button
    style={buttonStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 12px 24px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 6px 18px rgba(0,0,0,0.2)";
    }}
  >
    🗺 Map View
  </button>

  <button
    style={buttonStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 12px 24px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 6px 18px rgba(0,0,0,0.2)";
    }}
  >
    📊 Generate Report
  </button>

</div>

<div
  style={{
    background:
      "linear-gradient(90deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))",

    border:
      "1px solid rgba(239,68,68,0.25)",

    borderRadius: "16px",

    padding: "18px 24px",

    marginBottom: "30px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "15px",
  }}
>
  <div>
    <div
      style={{
        color: "#fca5a5",
        fontWeight: "700",
        marginBottom: "5px",
      }}
    >
      🚨 Operational Alert
    </div>

    <div
      style={{
        color: "#cbd5e1",
        fontSize: "14px",
      }}
    >
      {pendingDeliveries > 0
        ? `${pendingDeliveries} pending deliveries require attention`
        : "No operational anomalies detected"}
    </div>
  </div>

  <div
    style={{
      background:
        pendingDeliveries > 0
          ? "rgba(239,68,68,0.2)"
          : "rgba(34,197,94,0.2)",

      color:
        pendingDeliveries > 0
          ? colors.danger
          : colors.success,

      padding: "8px 14px",

      borderRadius: "999px",

      fontWeight: "600",
    }}
  >
    {pendingDeliveries > 0
      ? "Action Required"
      : "Healthy"}
  </div>
</div>

{/* KPI Cards */}

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
              "translateY(-10px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(0,0,0,0.25)";
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
                  `${colors.success}20`,
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
                  `${colors.success}20`,
                color: colors.success,
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
              color: colors.success,
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
              "translateY(-10px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(0,0,0,0.25)";
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
                color: colors.warning,
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
              color: colors.danger,
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
              "translateY(-10px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(0,0,0,0.25)";
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
                  `${colors.primary}20`,
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
                  `${colors.primary}20`,
                color: colors.primary,
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
              color: colors.primary,
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
              "translateY(-10px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(0,0,0,0.25)";
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
                  `${colors.success}20`,
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
                  `${colors.success}20`,
                color: colors.success,
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
              color: colors.success,
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
          background: colors.glass,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
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
    style={kpiCardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.35)";
      e.currentTarget.style.boxShadow =
        "0 20px 40px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.25)";
    }}
  >
    <h4 style={typography.smallTitle}>
      📈 Delivery Success Rate
    </h4>

    <h2 style={typography.smallCardValue}>
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
    style={kpiCardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 20px 40px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.25)";
    }}
  >
    <h4 style={typography.smallTitle}>
      🚚 Fleet Utilization
    </h4>

    <h2 style={typography.smallCardValue}>
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
    style={kpiCardStyle}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 20px 40px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.25)";
    }}
  >
    <h4 style={typography.smallTitle}>
      📦 Total Deliveries
    </h4>

    <h2 style={typography.smallCardValue}>
      {totalDeliveries}
    </h2>
  </div>

  <div
  style={kpiCardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(0,0,0,0.25)";
  }}
>
  <h4 style={typography.smallTitle}>
    🛠 Fleet Availability
  </h4>

  <h2 style={typography.smallCardValue}>
    {fleetAvailability}%
  </h2>
</div>

  <div
  style={kpiCardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(0,0,0,0.25)";
  }}
>
  <h4 style={typography.smallTitle}>
    📍 Average Route
  </h4>

  <h2 style={typography.smallCardValue}>
    {averageRouteLength} km
  </h2>
</div>

<div
  style={kpiCardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(0,0,0,0.25)";
  }}
>
  <h4 style={typography.smallTitle}>
    ⚡ Efficiency Score
  </h4>

  <h2 style={typography.smallCardValue}>
    {efficiencyScore}%
  </h2>
</div>

<div
  style={kpiCardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(0,0,0,0.25)";
  }}
>
  <h4 style={typography.smallTitle}>
    ⏱ Average ETA
  </h4>

  <h2 style={typography.smallCardValue}>
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
            ...typography.sectionTitle,
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
              ...kpiCardStyle,
              borderLeft:
                "4px solid #22c55e",
            }}
          >
            <h4 style={typography.smallTitle}>
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
              ...kpiCardStyle,
              borderLeft:
                "4px solid #3b82f6",
            }}
          >
            <h4 style={typography.smallTitle}>
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
              ...kpiCardStyle,
              borderLeft:
                "4px solid #f59e0b",
            }}
          >
            <h4 style={typography.smallTitle}>
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
              ...kpiCardStyle,
              borderLeft:
                "4px solid #8b5cf6",
            }}
          >
            <h4 style={typography.smallTitle}>
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
    background: colors.glass,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h2
    style={{
      ...typography.sectionTitle,
      marginBottom: "20px",
    }}
  >
    📦 Delivery Status Breakdown
  </h2>

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
    background: colors.glass,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h2
    style={{
      ...typography.sectionTitle,
      marginBottom: "20px",
    }}
  >
    🚚 Fleet Analytics
  </h2>

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
          background: colors.glass,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2
          style={{
            ...typography.sectionTitle,
            marginBottom: "20px",
          }}
        >
          📊 System Health
        </h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div>
            <h4 style={typography.smallTitle}>
              Fleet Status
            </h4>
            <p style={{ color: colors.success }}>
              🟢 Operational
            </p>
          </div>

          <div>
            <h4 style={typography.smallTitle}>
              Traffic Conditions
            </h4>
            <p style={{ color: colors.warning }}>
              🟡 Moderate
            </p>
          </div>

          <div>
            <h4 style={typography.smallTitle}>
              Route Engine
            </h4>
            <p style={{ color: colors.success }}>
              🟢 Online
            </p>
          </div>

          <div>
            <h4 style={typography.smallTitle}>
              Delivery Success Rate
            </h4>
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
    background: colors.glass,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h2
    style={{
      ...typography.sectionTitle,
      marginBottom: "20px",
    }}
  >
    📦 Recent Delivery Activity
  </h2>

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
    background: colors.glass,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h2
    style={{
      ...typography.sectionTitle,
      marginBottom: "20px",
    }}
  >
    🚚 Fleet Status
  </h2>

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
    background: colors.glass,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  }}
>
  <h2
    style={{
      ...typography.sectionTitle,
      marginBottom: "20px",
    }}
  >
    🚨 Live Alerts
  </h2>

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