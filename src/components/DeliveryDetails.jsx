function DeliveryDetails({
  delivery,
  currentIndex,
  progress,
  startDelivery,
}) {
  if (!delivery) return null;

  const currentStation =
    delivery.route[currentIndex];

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>📦 Delivery Details</h2>

      <p>
        <strong>Source:</strong>{" "}
        {delivery.source}
      </p>

      <p>
        <strong>Destination:</strong>{" "}
        {delivery.destination}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {delivery.status}
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

      {delivery.status !== "Delivered ✅" && (
  <button
    onClick={startDelivery}
    style={{
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
    }}
  >
    ▶ Start Delivery
  </button>
)}

      <h3 style={{ marginTop: "25px" }}>
        📊 Delivery Progress
      </h3>

      <div
        style={{
          width: "100%",
          height: "20px",
          background: "#334155",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#22c55e",
            transition: "0.5s",
          }}
        />
      </div>

      <p style={{ marginTop: "10px" }}>
        <strong>{progress}% Complete</strong>
      </p>

      <h3 style={{ marginTop: "20px" }}>
        📍 Current Station
      </h3>

      <div
        style={{
          background: "#0f172a",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "8px",
        }}
      >
        🚉 {currentStation}
      </div>

      <h3 style={{ marginTop: "20px" }}>
        ✅ Completed Stops
      </h3>

      {delivery.route
        .slice(0, currentIndex + 1)
        .map((station) => (
          <div key={station}>
            ✅ {station}
          </div>
        ))}

      {delivery.route.slice(currentIndex + 1)
  .length > 0 && (
  <>
    <h3 style={{ marginTop: "20px" }}>
      ⏳ Remaining Stops
    </h3>

    {delivery.route
      .slice(currentIndex + 1)
      .map((station) => (
        <div key={station}>
          ⏳ {station}
        </div>
      ))}
  </>
)}
    </div>
  );
}

export default DeliveryDetails;