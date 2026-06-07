function DeliveryDetails({
  delivery,
  currentIndex,
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

      <button
        onClick={startDelivery}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        ▶ Start Delivery
      </button>

      <h3 style={{ marginTop: "20px" }}>
        📍 Current Station
      </h3>

      <div>{currentStation}</div>

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
    </div>
  );
}

export default DeliveryDetails;