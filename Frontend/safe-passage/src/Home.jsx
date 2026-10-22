import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import MapComponent from "./components/MapComponent.jsx";
import WelcomeHeroLanding from "./components/WelcomeHeroLanding.jsx";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Navigation,
  Phone,
  Shield,
  Plus,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  Building2,
  Car
} from "lucide-react";

export default function Home() {
  const {
    user,
    stats,
    services,
    incidents,
    dispatches,
    isAuthenticated,
    setIsReportModalOpen,
    setActiveIncidentId,
    selectedRadius,
    setSelectedRadius
  } = useSafePassage();

  const [activeFilter, setActiveFilter] = useState("all");
  const [showLandingView, setShowLandingView] = useState(false);

  // If user signed out, show the Welcome / Sign In hero landing
  if (!isAuthenticated || showLandingView) {
    return <WelcomeHeroLanding onLoginSuccess={() => setShowLandingView(false)} />;
  }

  // Filter services based on category pill
  const filteredServices = services.filter((srv) => {
    if (activeFilter === "all") return true;
    return srv.type === activeFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Header (Matching Screen 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good Morning, {user.name}! <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Your safety matters. Let's keep you safe.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLandingView(true)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
          >
            View Landing Hero
          </button>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Emergency</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards (Matching Screen 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Active Incidents Card */}
        <Link
          to="/cases"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {stats.activeIncidents}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Active Incidents</div>
          </div>
        </Link>

        {/* Ongoing Assistance Card */}
        <Link
          to="/assistance"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {stats.ongoingAssistance}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Ongoing Assistance</div>
          </div>
        </Link>

        {/* Resolved Cases Card */}
        <Link
          to="/cases"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {stats.resolvedCases}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Resolved Cases</div>
          </div>
        </Link>
      </div>

      {/* Main Interactive Map & Nearby Services Layout (Screen 2 Center) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
        {/* Map Filter Pills (Matching Screen 2: All, Hospitals, Police, Embassies, +) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All" },
              { id: "hospitals", label: "Hospitals" },
              { id: "police", label: "Police" },
              { id: "embassies", label: "Embassies" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeFilter === f.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {f.label}
              </button>
            ))}
            <Link
              to="/services"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold transition"
              title="Add / Configure Radius"
            >
              +
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Radius:</span>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
            </select>
          </div>
        </div>

        {/* Map + Side List Grid (Matching Screen 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Leaflet Map (Left 8 cols) */}
          <div className="lg:col-span-8 w-full">
            <MapComponent
              services={filteredServices}
              radiusKm={selectedRadius}
              height="440px"
            />
          </div>

          {/* Nearby Services Quick Panel (Right 4 cols - Matching Screen 2) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-slate-900">Nearby Services</h3>
              <Link to="/services" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {filteredServices.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-md transition group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        item.iconColor === "red"
                          ? "bg-red-100 text-red-600"
                          : item.iconColor === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {item.type === "hospitals" ? (
                        <span className="font-bold text-base leading-none">+</span>
                      ) : item.type === "police" ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <Building2 className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition">
                        {item.shortName || item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.distance}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <a
                          href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Get Directions</span>
                        </a>

                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Roadside Assistance Callout */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100/80 space-y-2">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-900">Roadside Breakdown?</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Connect with verified local towing and mechanics nearby in Colombo.
              </p>
              <Link
                to="/assistance"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 pt-1"
              >
                <span>Request Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Active Incidents Quick Tracker (Proposal Module 3 - Case Lifecycle) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Reported Cases</h3>
            <p className="text-xs text-slate-500">Real-time status of your active emergency cases</p>
          </div>
          <Link to="/cases" className="text-xs font-bold text-blue-600 hover:text-blue-700">
            View All Incidents
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidents.slice(0, 3).map((inc) => (
            <div
              key={inc.id}
              onClick={() => setActiveIncidentId(inc.id)}
              className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition bg-slate-50/50 cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-500">
                  #{inc.trackingId}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    inc.status === "Under Review"
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : inc.status === "Assistance in Progress"
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}
                >
                  {inc.status}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">{inc.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{inc.location}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                <span>{inc.reportedAgo}</span>
                <span className="text-blue-600 font-semibold flex items-center gap-1">
                  Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
