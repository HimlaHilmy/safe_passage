import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Plus,
  MapPin,
  Calendar,
  ShieldAlert,
  Car,
  HeartPulse,
  Filter
} from "lucide-react";

export default function CaseLifecycle() {
  const { incidents, setActiveIncidentId, setIsReportModalOpen } = useSafePassage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "active" | "resolved"

  const filteredIncidents = incidents.filter((inc) => {
    if (activeTab === "active") return inc.status !== "Resolved";
    if (activeTab === "resolved") return inc.status === "Resolved";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Assistance in Progress":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Resolved":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default:
        return "bg-rose-50 text-rose-600 border-rose-200";
    }
  };

  const getCategoryIcon = (category) => {
    if (category.toLowerCase().includes("medical")) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <HeartPulse className="w-5 h-5" />
        </div>
      );
    }
    if (category.toLowerCase().includes("passport") || category.toLowerCase().includes("consular")) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
      );
    }
    if (category.toLowerCase().includes("breakdown") || category.toLowerCase().includes("car")) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Car className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header (Matching Screen 5) */}
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
              My Incidents
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Track your reported incidents & lifecycle states
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Filter Tabs (Matching Screen 5: [All], [Active], [Resolved]) */}
      <div className="flex items-center gap-2">
        {[
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "resolved", label: "Resolved" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-blue-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Incidents Cards List (Matching Screen 5) */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No Incidents in this tab</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              You do not have any {activeTab} emergency reports at the moment.
            </p>
          </div>
        ) : (
          filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setActiveIncidentId(inc.id)}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {getCategoryIcon(inc.category)}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition truncate">
                      {inc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    #{inc.trackingId}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {inc.reportedAgo}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3" />
                      {inc.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge + Chevron (Screen 5 Right) */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                    inc.status
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {inc.status}
                </span>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
