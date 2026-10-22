import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Search,
  Bell,
  Smartphone,
  ChevronDown,
  LogOut,
  Sparkles,
  ExternalLink,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const {
    user,
    switchRole,
    isAuthenticated,
    setIsAuthenticated,
    isReportModalOpen,
    setIsReportModalOpen,
    isMobilePreviewOpen,
    setIsMobilePreviewOpen,
    notificationCount,
    searchQuery,
    setSearchQuery
  } = useSafePassage();

  const location = useLocation();
  const navigate = useNavigate();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Report Emergency", path: "/emergency", icon: AlertTriangle, isAction: true },
    { label: "Nearby Services", path: "/services", icon: MapPin },
    { label: "My Incidents", path: "/cases", icon: Clock },
    { label: "Assistance Requests", path: "/assistance", icon: Wrench },
    { label: "Admin Analytics", path: "/admin", icon: BarChart3 },
  ];

  const handleLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.isAction) {
      setIsReportModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Utility Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-base tracking-tight leading-tight flex items-center gap-1.5">
                  Safe Passage
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold rounded-md bg-blue-50 text-blue-600 border border-blue-200/60">
                    Live
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  Travel Safety & Emergency
                </span>
              </div>
            </Link>
          </div>

          {/* Central Search Bar (Mockup Screen 2) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search services, incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Top Actions: Notifications, Mobile Preview Switcher, Role Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Report SOS Button */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-sm hover:shadow-md hover:from-red-600 hover:to-rose-700 transition"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report SOS</span>
            </button>

            {/* Mobile Companion Simulator Button */}
            <button
              onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition"
              title="Preview Mobile UI (Screen 8)"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>Mobile View</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
            </div>

            {/* Role Switcher Dropdown (Demonstrates Traveler, Provider, Admin from Proposal) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200/70 text-xs font-semibold text-slate-700 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
                />
                <span className="hidden lg:inline capitalize">
                  {user.name} ({user.role})
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isRoleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                  onClick={() => setIsRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Switch Active Role (RBAC):</p>
                  </div>
                  <button
                    onClick={() => {
                      switchRole("traveler");
                      navigate("/");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 hover:bg-slate-50 transition ${
                      user.role === "traveler" ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Traveler (Himla)
                  </button>
                  <button
                    onClick={() => {
                      switchRole("provider");
                      navigate("/assistance");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 hover:bg-slate-50 transition ${
                      user.role === "provider" ? "text-amber-600 font-bold bg-amber-50/50" : "text-slate-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Service Provider (Lanka Towing)
                  </button>
                  <button
                    onClick={() => {
                      switchRole("admin");
                      navigate("/admin");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 hover:bg-slate-50 transition ${
                      user.role === "admin" ? "text-indigo-600 font-bold bg-indigo-50/50" : "text-slate-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Emergency Admin (Hirunika)
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => setIsAuthenticated(!isAuthenticated)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {isAuthenticated ? "Sign Out / View Landing" : "Sign In"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900">Safe Passage</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => handleLinkClick(link)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{user.name}</h4>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
