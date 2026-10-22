import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { SafePassageProvider, useSafePassage } from "./context/SafePassageContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./Home.jsx";
import EmergencyReporting from "./EmergencyReporting.jsx";
import ServiceDiscovery from "./ServiceDiscovery.jsx";
import CaseLifecycle from "./CaseLifecycle.jsx";
import AssistanceDispatch from "./AssistanceDispatch.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import ReportEmergencyModal from "./components/ReportEmergencyModal.jsx";
import CaseDetailsModal from "./components/CaseDetailsModal.jsx";
import MobileDevicePreview from "./components/MobileDevicePreview.jsx";
import BottomNav from "./components/BottomNav.jsx";
import { Shield, Smartphone, Heart, ArrowRight } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function UserProfile() {
  const { user, stats, switchRole } = useSafePassage();
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">{user.fullName || user.name}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 capitalize">
              Role: {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-semibold">Emergency Contact Phone</span>
            <span className="text-slate-800 font-bold mt-1 block">{user.phone}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block font-semibold">Assigned Region</span>
            <span className="text-slate-800 font-bold mt-1 block">{user.country}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Switch Role Perspective (For CA1 Demo Evaluation)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => switchRole("traveler")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                user.role === "traveler"
                  ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              Traveler (Himla)
            </button>
            <button
              onClick={() => switchRole("provider")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                user.role === "provider"
                  ? "bg-amber-600 text-white border-amber-700 shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              Service Provider
            </button>
            <button
              onClick={() => switchRole("admin")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                user.role === "admin"
                  ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              Emergency Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Shield className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900">404 – Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        The emergency portal route you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

function AppContent() {
  const { setIsMobilePreviewOpen } = useSafePassage();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fc] text-slate-800 pb-16 lg:pb-0">
      <ScrollToTop />
      <Navbar />

      {/* Main Layout: Desktop Sidebar + Content Area */}
      <div className="flex-1 flex w-full">
        <Sidebar />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emergency" element={<EmergencyReporting />} />
            <Route path="/services" element={<ServiceDiscovery />} />
            <Route path="/cases" element={<CaseLifecycle />} />
            <Route path="/assistance" element={<AssistanceDispatch />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Global Modals matching reference mockups */}
      <ReportEmergencyModal />
      <CaseDetailsModal />
      <MobileDevicePreview />
      <BottomNav />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-6 px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Safe Passage — South Eastern University of Sri Lanka (Group O)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/" className="hover:text-white transition">Dashboard</Link>
            <Link to="/services" className="hover:text-white transition">Nearby Services</Link>
            <Link to="/cases" className="hover:text-white transition">My Incidents</Link>
            <Link to="/assistance" className="hover:text-white transition">Assistance Dispatch</Link>
            <Link to="/admin" className="hover:text-white transition">Admin Analytics</Link>
          </div>

          <p className="text-[11px] text-slate-500">
            CA1 Group Assignment • SWT22022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SafePassageProvider>
      <AppContent />
    </SafePassageProvider>
  );
}
