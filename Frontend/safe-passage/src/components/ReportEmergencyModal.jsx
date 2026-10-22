import React, { useState } from "react";
import { useSafePassage } from "../context/SafePassageContext.jsx";
import {
  X,
  AlertTriangle,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  ChevronDown,
  Navigation,
  FileText,
  AlertCircle,
  ShieldAlert,
  Car,
  HeartPulse,
  Compass
} from "lucide-react";

export default function ReportEmergencyModal() {
  const { isReportModalOpen, setIsReportModalOpen, addIncident } = useSafePassage();

  const [category, setCategory] = useState("Medical Emergency");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Colombo, Sri Lanka");
  const [severity, setSeverity] = useState("Medium");
  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  if (!isReportModalOpen) return null;

  const categories = [
    { label: "Medical Emergency", icon: "🏥", desc: "Illness, acute injury, hospital required" },
    { label: "Lost Passport / Consular", icon: "🛂", desc: "Stolen travel documents, embassy support" },
    { label: "Roadside Breakdown / Towing", icon: "🚗", desc: "Engine fault, flat tyre, vehicle stuck" },
    { label: "Crime / Theft", icon: "👮", desc: "Robbery, tourist police assistance" },
    { label: "Natural Disaster", icon: "⚠️", desc: "Flood, extreme weather, evacuation" }
  ];

  const severityLevels = [
    { level: "Low", color: "hover:bg-slate-100", activeColor: "bg-slate-700 text-white" },
    { level: "Medium", color: "hover:bg-blue-100", activeColor: "bg-blue-600 text-white shadow-md shadow-blue-500/20" },
    { level: "High", color: "hover:bg-amber-100", activeColor: "bg-amber-500 text-white shadow-md shadow-amber-500/20" },
    { level: "Critical", color: "hover:bg-red-100", activeColor: "bg-red-600 text-white shadow-md shadow-red-500/25 ring-2 ring-red-400" },
  ];

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`Colombo Fort (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        },
        () => {
          setLocation("Colombo 03, Western Province, Sri Lanka");
        }
      );
    } else {
      setLocation("Colombo 03, Western Province, Sri Lanka");
    }
  };

  const handlePhotoAdd = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos([...photos, url]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newInc = await addIncident({
        title: title || `${category} in ${location}`,
        category,
        description,
        location,
        severity,
        photoUrl: photos[0] || null
      });

      setSubmittedId(newInc.trackingId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsReportModalOpen(false);
    setSubmittedId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header (Matching Screen 3) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Report Emergency</h2>
            <p className="text-xs text-slate-500">Help us understand your situation.</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5">
          {submittedId ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Emergency Report Logged!</h3>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Local emergency coordinators have been notified. Your unique incident tracking ID is:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-base">
                #{submittedId}
              </div>
              <p className="text-xs text-slate-400">
                You can track updates and responder dispatches in the "My Incidents" tab.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/25"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Category Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.label} value={cat.label}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need medical help"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              {/* Current Location with "Use my location" button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Location
                  </label>
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Use my location</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Upload Photo (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Upload Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {photos.map((src, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                      <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-slate-900/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <label className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition cursor-pointer shrink-0">
                    <span className="text-xl font-light leading-none">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoAdd}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Severity Level (Pill Selectors matching Screen 3) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Severity Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {severityLevels.map((s) => (
                    <button
                      key={s.level}
                      type="button"
                      onClick={() => setSeverity(s.level)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border ${
                        severity === s.level
                          ? `${s.activeColor} border-transparent`
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s.level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25 transition transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Report...</span>
                  ) : (
                    <span>Submit Report</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
