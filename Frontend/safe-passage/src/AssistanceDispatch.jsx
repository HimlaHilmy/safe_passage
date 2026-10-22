import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import {
  ArrowLeft,
  Truck,
  Wrench,
  Disc,
  Fuel,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  Plus,
  Navigation,
  AlertTriangle,
  UserCheck
} from "lucide-react";

export default function AssistanceDispatch() {
  const { dispatches, handleDispatchAction, addAssistance, user } = useSafePassage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Pending"); // "Pending" | "Accepted" | "Completed"
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // New assistance form state
  const [assistanceType, setAssistanceType] = useState("Towing Service");
  const [location, setLocation] = useState("Marine Drive, Colombo 03");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("+94 77 912 3456");
  const [priority, setPriority] = useState("Medium priority");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingCount = dispatches.filter((d) => d.status === "Pending").length;
  const acceptedCount = dispatches.filter((d) => d.status === "Accepted").length;
  const completedCount = dispatches.filter((d) => d.status === "Completed").length;

  const filteredDispatches = dispatches.filter((d) => {
    if (activeTab === "Pending") return d.status === "Pending";
    if (activeTab === "Accepted") return d.status === "Accepted";
    if (activeTab === "Completed") return d.status === "Completed";
    return true;
  });

  const getVehicleIcon = (type) => {
    const lower = type.toLowerCase();
    if (lower.includes("tow")) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes("mechanic")) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <Wrench className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes("tyre") || lower.includes("tire")) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <Disc className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <Fuel className="w-5 h-5" />
      </div>
    );
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addAssistance({
        assistanceType,
        location,
        details,
        phone,
        priority
      });
      setIsRequestModalOpen(false);
      setDetails("");
      setActiveTab("Pending");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header (Matching Screen 6) */}
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
              Assistance Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Live requests from travelers & responder dispatch portal
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Roadside SOS</span>
        </button>
      </div>

      {/* Tabs (Matching Screen 6: Pending (3), Accepted (1), Completed) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("Pending")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
            activeTab === "Pending"
              ? "bg-blue-600 text-white shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Pending ({pendingCount})
        </button>

        <button
          onClick={() => setActiveTab("Accepted")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
            activeTab === "Accepted"
              ? "bg-blue-600 text-white shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Accepted ({acceptedCount})
        </button>

        <button
          onClick={() => setActiveTab("Completed")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
            activeTab === "Completed"
              ? "bg-blue-600 text-white shadow-blue-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Dispatch Cards List (Matching Screen 6) */}
      <div className="space-y-3.5">
        {filteredDispatches.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No {activeTab} Dispatches</h3>
            <p className="text-xs text-slate-400">All assistance queues are currently clear.</p>
          </div>
        ) : (
          filteredDispatches.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {getVehicleIcon(req.assistanceType)}

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {req.title || req.assistanceType}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      #{req.requestId}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                      <span>{req.distance}</span>
                      <span>•</span>
                      <span
                        className={`font-semibold ${
                          req.priority?.includes("High")
                            ? "text-rose-600"
                            : "text-amber-600"
                        }`}
                      >
                        {req.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400 block">{req.timeAgo}</span>
                  {req.status === "Accepted" && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                      ETA: {req.eta}
                    </span>
                  )}
                </div>
              </div>

              {/* Location & Details */}
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-red-500" /> Destination
                  </span>
                  <span className="font-semibold text-slate-900">{req.location}</span>
                </div>
                <p className="text-slate-600 italic">"{req.details}"</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span className="text-slate-400">Traveler: {req.name}</span>
                  <a
                    href={`tel:${req.phone}`}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> {req.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons (Matching Screen 6: [Accept] [Reject] or Complete) */}
              <div className="flex items-center gap-2 pt-1">
                {req.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleDispatchAction(req.requestId, "accept")}
                      className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition active:scale-[0.99]"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDispatchAction(req.requestId, "reject")}
                      className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition active:scale-[0.99]"
                    >
                      Reject
                    </button>
                  </>
                ) : req.status === "Accepted" ? (
                  <button
                    onClick={() => handleDispatchAction(req.requestId, "complete")}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
                  >
                    Mark Service Completed
                  </button>
                ) : (
                  <div className="w-full py-2 text-center text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed & Closed</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Roadside Assistance Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Request Roadside Assistance</h3>
            <p className="text-xs text-slate-500">
              Direct dispatch to verified towing trucks and mobile mechanics nearby.
            </p>

            <form onSubmit={handleCreateRequest} className="space-y-3.5 text-left text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Required</label>
                <select
                  value={assistanceType}
                  onChange={(e) => setAssistanceType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="Towing Service">Towing Service (Flatbed / Lift)</option>
                  <option value="Mechanic Service">Mechanic Service (Battery / Alternator)</option>
                  <option value="Flat Tyre Assistance">Flat Tyre Assistance (Wheel Replacement)</option>
                  <option value="Fuel Delivery">Fuel Delivery (Emergency 5L Petrol/Diesel)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Vehicle Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Urgency Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="High priority">High priority (Vehicle blocking road / unsafe)</option>
                  <option value="Medium priority">Medium priority (Parked safely roadside)</option>
                  <option value="Low priority">Low priority (Hotel / driveway non-urgent)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Breakdown Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Engine cut off, steering locked, white smoke from radiator"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                >
                  {isSubmitting ? "Dispatching..." : "Send Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
