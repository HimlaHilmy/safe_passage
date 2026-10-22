import React, { useState } from "react";
import { useSafePassage } from "../context/SafePassageContext.jsx";
import {
  X,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Shield,
  Navigation,
  UserCheck,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function CaseDetailsModal() {
  const { activeIncident, setActiveIncidentId, updateIncidentStatus, user } = useSafePassage();
  const [selectedStatus, setSelectedStatus] = useState("");

  if (!activeIncident) return null;

  const handleStatusChange = (newStatus) => {
    updateIncidentStatus(activeIncident.trackingId, newStatus);
    setSelectedStatus("");
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header (Matching Screen 7) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveIncidentId(null)}
              className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-600 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Case Details</h2>
              <p className="text-xs text-slate-400 font-mono">
                Tracking ID: #{activeIncident.trackingId}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveIncidentId(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                activeIncident.status
              )}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {activeIncident.status}
            </span>

            <span className="text-xs text-slate-400">
              Reported {activeIncident.reportedAgo || "Recently"}
            </span>
          </div>

          {/* Incident Information Card (Matching Screen 7) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Incident Information
            </h3>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-500" /> Category
                </span>
                <span className="font-semibold text-slate-900">{activeIncident.category}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Location
                </span>
                <span className="font-semibold text-slate-900">{activeIncident.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Reported On
                </span>
                <span className="font-semibold text-slate-900">
                  {new Date(activeIncident.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>

              {activeIncident.assignedOfficer && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-500" /> Assigned Lead
                  </span>
                  <span className="font-semibold text-indigo-700">{activeIncident.assignedOfficer}</span>
                </div>
              )}
            </div>

            {/* Incident Description */}
            <div className="pt-2 border-t border-slate-200/60">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{activeIncident.description}"
              </p>
            </div>
          </div>

          {/* Stepped Status Timeline (Matching Screen 7) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Status Timeline
            </h3>

            <div className="space-y-4 relative pl-3 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {activeIncident.timeline.map((step, idx) => {
                const isCurrent = activeIncident.status === step.step;
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white ${
                        step.completed
                          ? "bg-blue-600 ring-4 ring-blue-100"
                          : isCurrent
                          ? "bg-amber-500 ring-4 ring-amber-100"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold ${
                            step.completed || isCurrent ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {step.step}
                        </h4>
                        <span className="text-[11px] text-slate-400">{step.time}</span>
                      </div>
                      {step.note && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role-Based State Transition Actions (Proposal Module 3 - Case Lifecycle State Machine) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">
                Interactive State Transition (Admin/Responder):
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange("Under Review")}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition ${
                  activeIncident.status === "Under Review"
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                Under Review
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("Assistance in Progress")}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition ${
                  activeIncident.status === "Assistance in Progress"
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("Resolved")}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition ${
                  activeIncident.status === "Resolved"
                    ? "bg-emerald-600 text-white border-emerald-700"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                Resolve Case
              </button>
            </div>
          </div>

          {/* Bottom Primary Button (Matching Screen 7) */}
          <div className="pt-2">
            <a
              href={`https://maps.google.com/?q=${activeIncident.lat},${activeIncident.lng}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>View on Map</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
