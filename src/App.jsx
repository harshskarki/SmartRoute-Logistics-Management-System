import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Deliveries from "./pages/Deliveries";
import LogisticsCenter from "./pages/LogisticsCenter";

function App() {
  const navLinkClass = ({ isActive }) =>
  `block px-4 py-3 rounded-xl transition-all duration-300 transform ${
    isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg border-l-4 border-cyan-400"
      : "text-gray-300 hover:bg-slate-700 hover:text-white hover:translate-x-2 hover:shadow-md"
  }`;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-5">
        <div className="flex items-center gap-3 pb-5 border-b border-slate-700">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl shadow-lg">
            🚚
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SmartRoute
            </h1>

            <p className="text-gray-400 text-xs">
              Logistics Suite
            </p>
          </div>
        </div>

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

          <NavLink to="/logistics-center">
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
            path="/logistics-center"
            element={<LogisticsCenter />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;