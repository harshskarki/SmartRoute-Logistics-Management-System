import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Deliveries from "./pages/Deliveries";
import LogisticsCenter from "./pages/LogisticsCenter";

function App() {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-5">
        <h1 className="text-2xl font-bold text-blue-500">
          🚚 SmartRoute
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Logistics Management
        </p>

        <nav className="mt-8 space-y-2">
          <NavLink to="/" end className={navLinkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/vehicles"
            className={navLinkClass}
          >
            🚚 Vehicles
          </NavLink>

          <NavLink
            to="/deliveries"
            className={navLinkClass}
          >
            📦 Deliveries
          </NavLink>

          <NavLink to="/logistics">
            🗺 Logistics Center
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/vehicles"
            element={<Vehicles />}
          />
          <Route
            path="/deliveries"
            element={<Deliveries />}
          />
          <Route
            path="/logistics"
            element={<LogisticsCenter />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;