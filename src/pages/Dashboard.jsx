function Dashboard() {
  const stats = [
    {
      title: "Active Vehicles",
      value: 12,
      icon: "🚚",
    },
    {
      title: "Pending Deliveries",
      value: 28,
      icon: "📦",
    },
    {
      title: "Completed Today",
      value: 64,
      icon: "✅",
    },
    {
      title: "Traffic Alerts",
      value: 3,
      icon: "🚦",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold text-blue-500 mb-3">
        SmartRoute Dashboard
      </h1>

      <p className="text-gray-400 mb-8">
        Logistics Management & Route Optimization Platform
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700"
          >
            <div className="text-4xl mb-3">
              {stat.icon}
            </div>

            <h2 className="text-gray-400 text-sm">
              {stat.title}
            </h2>

            <div className="text-3xl font-bold mt-2">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;