import React, { useState } from "react";
import { useSafePassage } from "../context/SafePassageContext.jsx";
import {
  X,
  Shield,
  Bell,
  MapPin,
  Clock,
  Wrench,
  User,
  AlertTriangle,
  ChevronRight,
  Wifi,
  Battery,
  Signal
} from "lucide-react";
import heroImg from "../assets/hero-image.jpg";

export default function MobileDevicePreview() {
  const {
    isMobilePreviewOpen,
    setIsMobilePreviewOpen,
    setIsReportModalOpen,
    incidents,
    setActiveIncidentId
  } = useSafePassage();

  const [activeTab, setActiveTab] = useState("home");

  if (!isMobilePreviewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      {/* Close button */}
      <button
        onClick={() => setIsMobilePreviewOpen(false)}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50 flex items-center gap-2 text-xs font-semibold"
      >
        <span>Close Mobile Preview</span>
        <X className="w-4 h-4" />
      </button>

      {/* Phone Mockup Frame (Matching Screen 8) */}
      <div className="relative w-full max-w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/20 flex flex-col overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30" />

        {/* Screen inner container */}
        <div className="relative w-full h-full bg-[#f6f8fc] rounded-[38px] overflow-hidden flex flex-col justify-between">
          {/* Status Bar */}
          <div className="px-6 pt-3 pb-1 flex items-center justify-between text-slate-800 text-[11px] font-bold select-none shrink-0 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mobile Header (Matching Screen 8) */}
          <div className="px-5 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">Safe Passage</span>
            </div>
            <button className="p-1.5 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Mobile Body */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            {/* Scenic Hero Card (Matching Screen 8) */}
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-md group">
              <img
                src={heroImg}
                alt="Travel Safe"
                className="w-full h-full object-cover brightness-75 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-base font-extrabold leading-tight">
                  Travel Safe,<br />Anywhere.
                </h3>
                <p className="text-[11px] text-slate-200 mt-1 max-w-[200px] leading-tight">
                  Quick help. Nearby services. Real-time updates.
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setIsMobilePreviewOpen(false);
                      setIsReportModalOpen(true);
                    }}
                    className="w-full py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition"
                  >
                    Report Emergency
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Grid Action Tiles (Matching Screen 8) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab("services")}
                className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Nearby Services</span>
              </button>

              <button
                onClick={() => setActiveTab("incidents")}
                className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-1.5">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">My Incidents</span>
              </button>

              <button
                onClick={() => setActiveTab("assistance")}
                className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Assistance</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Profile</span>
              </button>
            </div>

            {/* Recent Incidents Mini List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                <span>Recent Updates</span>
                <span className="text-blue-600 text-[11px]">View All</span>
              </div>

              {incidents.slice(0, 2).map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => {
                    setIsMobilePreviewOpen(false);
                    setActiveIncidentId(inc.id);
                  }}
                  className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-none">{inc.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">#{inc.trackingId}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tab Bar (Matching Screen 8) */}
          <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-slate-400 shrink-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
                activeTab === "home" ? "text-blue-600" : "hover:text-slate-700"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
                activeTab === "services" ? "text-blue-600" : "hover:text-slate-700"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Services</span>
            </button>
            <button
              onClick={() => setActiveTab("incidents")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
                activeTab === "incidents" ? "text-blue-600" : "hover:text-slate-700"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Incidents</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
                activeTab === "profile" ? "text-blue-600" : "hover:text-slate-700"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
