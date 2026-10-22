import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import EmergencyReporting from "./EmergencyReporting.jsx";
import ServiceDiscovery from "./ServiceDiscovery.jsx";
import CaseLifecycle from "./CaseLifecycle.jsx";
import AssistanceDispatch from "./AssistanceDispatch.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] bg-gray-50 px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404 – Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emergency" element={<EmergencyReporting />} />
          <Route path="/services" element={<ServiceDiscovery />} />
          <Route path="/cases" element={<CaseLifecycle />} />
          <Route path="/assistance" element={<AssistanceDispatch />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-slate-950 px-6 py-10 text-sm text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-bold text-white">🛡️ Safe Passage</p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-5">
            {[["Emergency", "/emergency"], ["Services", "/services"], ["Track Case", "/cases"], ["Assistance", "/assistance"]].map(([name, to]) => (
              <Link key={to} to={to} className="transition hover:text-white">{name}</Link>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} Safe Passage. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
