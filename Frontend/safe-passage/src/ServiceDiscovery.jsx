import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import MapComponent from "./components/MapComponent.jsx";
import {
  ArrowLeft,
  Navigation,
  Phone,
  Shield,
  Building2,
  Car,
  Search,
  ExternalLink,
  ArrowRight,
  Filter,
  CheckCircle2
} from "lucide-react";

export default function ServiceDiscovery() {
  const { services, selectedRadius, setSelectedRadius } = useSafePassage();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "hospitals", label: "Hospitals" },
    { id: "police", label: "Police" },
    { id: "embassies", label: "Embassies" },
  ];

  const filtered = services.filter((srv) => {
    const matchesCat = activeCategory === "all" || srv.type === activeCategory;
    const matchesSearch =
      srv.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      srv.address.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header (Matching Screen 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-slate-200/70 text-slate-600 transition"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nearby Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Find verified emergency services near you
            </p>
          </div>
        </div>

        {/* Dynamic Radius Dropdown (Matching Screen 4: [5 km v]) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Search Radius:
          </span>
          <select
            value={selectedRadius}
            onChange={(e) => setSelectedRadius(Number(e.target.value))}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills (Matching Screen 4) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
                activeCategory === c.id
                  ? "bg-blue-600 text-white shadow-blue-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Mini Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by name..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* 2-Column Layout (Matching Screen 4: Left List, Right Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Services Cards List (Matching Screen 4) */}
        <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 text-slate-400 text-sm">
              No services found matching the criteria.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedService(item)}
                className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                  selectedService?.id === item.id
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Icon matching Screen 4 */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        item.iconColor === "red"
                          ? "bg-red-50 text-red-500 ring-4 ring-red-50/50"
                          : item.iconColor === "blue"
                          ? "bg-blue-50 text-blue-600 ring-4 ring-blue-50/50"
                          : "bg-amber-50 text-amber-500 ring-4 ring-amber-50/50"
                      }`}
                    >
                      {item.type === "hospitals" ? (
                        <span className="font-extrabold text-lg leading-none">+</span>
                      ) : item.type === "police" ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <Building2 className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                        {item.shortName || item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.distance} • {item.time}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.statusText}
                      </span>
                    </div>
                  </div>

                  {/* Phone Call Button (Screen 4) */}
                  <a
                    href={`tel:${item.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 border border-slate-200/80 flex items-center justify-center transition shrink-0"
                    title={`Call ${item.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 truncate max-w-[200px]">{item.address}</span>
                  <a
                    href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Leaflet Map (Matching Screen 4) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm">
            <MapComponent
              services={filtered}
              radiusKm={selectedRadius}
              center={
                selectedService
                  ? [selectedService.lat, selectedService.lng]
                  : [6.9271, 79.8612]
              }
              zoom={selectedService ? 15 : 14}
              height="500px"
              onMarkerSelect={(srv) => setSelectedService(srv)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Roadside Assistance Callout Banner (Matching Screen 4 Bottom) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">Need help on the road?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Request towing or local roadside mechanical assistance across Colombo.
            </p>
          </div>
        </div>

        <Link
          to="/assistance"
          className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 shrink-0"
        >
          <span>Request Assistance</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
