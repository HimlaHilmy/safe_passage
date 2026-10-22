import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import {
  AlertTriangle,
  MapPin,
  Camera,
  Navigation,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  X,
  Shield,
  Upload
} from "lucide-react";

export default function EmergencyReporting() {
  const { addIncident, setActiveIncidentId } = useSafePassage();
  const navigate = useNavigate();

  const [category, setCategory] = useState("Medical Emergency");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Colombo, Sri Lanka");
  const [severity, setSeverity] = useState("Medium");
  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=500&q=80"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedIncident, setSubmittedIncident] = useState(null);

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

      setSubmittedIncident(newInc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header (Matching Screen 3) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-600 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-tight">Report Emergency</h1>
              <p className="text-xs text-slate-500">Help us understand your situation.</p>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Emergency SOS</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submittedIncident ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Emergency Dispatched!</h2>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Your incident has been transmitted to emergency responders and local authorities in Colombo.
              </p>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-xs mx-auto">
                <span className="text-xs text-blue-500 font-semibold block">Incident Tracking Code</span>
                <span className="font-mono font-black text-lg text-blue-700">
                  #{submittedIncident.trackingId}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setActiveIncidentId(submittedIncident.id);
                    navigate("/cases");
                  }}
                  className="w-full py-3 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
                >
                  Track Case Progress
                </button>
                <button
                  onClick={() => {
                    setSubmittedIncident(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="w-full py-3 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                  Report Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.label} value={cat.label}>
                        {cat.icon} {cat.label} — {cat.desc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
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
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Use my location</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
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
                    <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0 group">
                      <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition cursor-pointer shrink-0">
                    <span className="text-2xl font-light leading-none">+</span>
                    <span className="text-[10px] font-semibold mt-1">Add Photo</span>
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
                <div className="grid grid-cols-4 gap-2.5">
                  {severityLevels.map((s) => (
                    <button
                      key={s.level}
                      type="button"
                      onClick={() => setSeverity(s.level)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all border ${
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
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25 transition transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <span>Transmitting SOS...</span> : <span>Submit Report</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
