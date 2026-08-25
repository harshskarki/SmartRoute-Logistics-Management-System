import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Deliveries from "./pages/Deliveries";
import LogisticsCenter from "./pages/LogisticsCenter";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);
  const navLinkClass = ({ isActive }) =>
    `flex items-center ${
      sidebarCollapsed
        ? "justify-center px-0"
        : "px-4"
    } py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg border-l-4 border-cyan-400"
        : "text-gray-300 hover:bg-slate-700 hover:text-white hover:shadow-md"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-20" : "w-64"} bg-slate-800 border-r border-slate-700 p-5 transition-all duration-500 ease-in-out relative`}
      >
        <div className="pb-5 border-b border-slate-700">

          <div
            className={`flex mb-3 ${
              sidebarCollapsed
                ? "justify-center"
                : "justify-end"
            }`}
          >
            <button
              onClick={() =>
                setSidebarCollapsed(!sidebarCollapsed)
              }
              className="text-gray-300 hover:text-white"
            >
              {sidebarCollapsed ? "➡️" : "⬅️"}
            </button>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl shadow-lg">
              🚚
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                sidebarCollapsed
                  ? "w-0 opacity-0"
                  : "w-auto opacity-100"
              }`}
            >
              <h1 className="text-xl font-bold text-white whitespace-nowrap">
                SmartRoute
              </h1>

              <p className="text-gray-400 text-xs whitespace-nowrap">
                Logistics Suite
              </p>
            </div>

          </div>

        </div>

        <nav className="mt-8 space-y-2">
          <NavLink to="/" end className={navLinkClass}>
            {sidebarCollapsed
              ? "📊"
              : "📊 Dashboard"}
          </NavLink>

          <NavLink
            to="/vehicles"
            className={navLinkClass}
          >
            {sidebarCollapsed
              ? "🚚"
              : "🚚 Vehicles"}
          </NavLink>

          <NavLink
            to="/deliveries"
            className={navLinkClass}
          >
            {sidebarCollapsed
              ? "📦"
              : "📦 Deliveries"}
          </NavLink>

          <NavLink
            to="/logistics-center"
            className={navLinkClass}
          >
            {sidebarCollapsed
              ? "🗺"
              : "🗺 Logistics Center"}
          </NavLink>
        </nav>
        <div
          className={`absolute bottom-5 left-0 w-full px-4 ${
            sidebarCollapsed ? "text-center" : ""
          }`}
        >
          <div
            className="
              bg-slate-700/50
              border border-slate-600
              rounded-lg
              px-3 py-2
              text-xs
              text-gray-400
            "
          >
            {sidebarCollapsed
              ? "v1.0"
              : "SmartRoute v1.0"}
          </div>
        </div>
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