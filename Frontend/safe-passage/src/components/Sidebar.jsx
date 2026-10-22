import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSafePassage } from "../context/SafePassageContext.jsx";
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  MapPin,
  Clock,
  Wrench,
  BarChart3,
  User,
  Plus
} from "lucide-react";

export default function Sidebar() {
  const { user, setIsReportModalOpen } = useSafePassage();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Report Emergency", path: "/emergency", icon: AlertTriangle, action: () => setIsReportModalOpen(true) },
    { label: "Nearby Services", path: "/services", icon: MapPin },
    { label: "My Incidents", path: "/cases", icon: Clock },
    { label: "Assistance Requests", path: "/assistance", icon: Wrench },
    { label: "Admin Analytics", path: "/admin", icon: BarChart3 },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 bg-white border-r border-slate-200/80 p-5 shrink-0 min-h-[calc(100vh-61px)]">
      <div>
        {/* Safe Passage Brand on Sidebar */}
        <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Shield className="w-4 h-4 fill-white/20" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Safe Passage</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 transition group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-red-400" />
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Badge (Screen 2 bottom) */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-800 truncate">{user.name}</h4>
            <p className="text-[11px] text-slate-500 capitalize truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
