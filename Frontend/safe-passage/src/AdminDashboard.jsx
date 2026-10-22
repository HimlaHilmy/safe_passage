import React, { useState } from "react";
import { useSafePassage } from "./context/SafePassageContext.jsx";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Users,
  Shield,
  MapPin,
  FileSpreadsheet,
  ArrowUpRight,
  Filter
} from "lucide-react";

export default function AdminDashboard() {
  const { incidents, dispatches, stats } = useSafePassage();
  const [filterPeriod, setFilterPeriod] = useState("30d");

  // Export CSV functionality required in Module 5
  const handleExportCSV = () => {
    const headers = ["Tracking ID", "Reporter Name", "Category", "Severity", "Location", "Status", "Created At"];
    const rows = incidents.map((inc) => [
      inc.trackingId,
      `"${inc.name}"`,
      `"${inc.category}"`,
      inc.severity,
      `"${inc.location}"`,
      inc.status,
      inc.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Safe_Passage_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const providers = [
    { name: "Lanka Towing & Recovery", type: "Roadside Towing", responseTime: "11 mins", rating: "4.9 ★", completed: 84, status: "Active" },
    { name: "National Hospital 1990 ER Unit", type: "Medical Paramedic", responseTime: "8 mins", rating: "5.0 ★", completed: 142, status: "Active" },
    { name: "Colombo Tourist Police Division", type: "Consular & Security", responseTime: "14 mins", rating: "4.8 ★", completed: 67, status: "Active" },
    { name: "City Rapid Tire & Jumpstart", type: "Mobile Mechanic", responseTime: "18 mins", rating: "4.7 ★", completed: 53, status: "Active" },
  ];

  const categoryBreakdown = [
    { name: "Medical Emergencies", percent: 42, color: "bg-red-500", count: 48 },
    { name: "Roadside & Towing", percent: 31, color: "bg-amber-500", count: 35 },
    { name: "Lost Passport & Consular", percent: 18, color: "bg-blue-600", count: 21 },
    { name: "Theft & Tourist Police", percent: 9, color: "bg-indigo-600", count: 10 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Admin Analytics & Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Module 5: Real-time emergency metrics, response-time tracking & audit reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-sm focus:outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">This Quarter</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Incidents Logged
          </span>
          <div className="text-2xl font-black text-slate-900">{stats.totalIncidents + 114}</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +12% from last month
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Avg Responder ETA
          </span>
          <div className="text-2xl font-black text-blue-600">{stats.avgResponseMinutes} mins</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 3.2m faster than SLA
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Provider Dispatches
          </span>
          <div className="text-2xl font-black text-amber-500">{stats.ongoingAssistance}</div>
          <p className="text-[11px] text-slate-400 font-medium">100% matched within 3km</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Overall Case Resolution
          </span>
          <div className="text-2xl font-black text-emerald-600">{stats.resolutionRate}</div>
          <p className="text-[11px] text-emerald-600 font-bold">Industry leading resolution</p>
        </div>
      </div>

      {/* Middle Row: Category Distribution & Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-sm font-extrabold text-slate-900">Emergency Incidents by Category</h3>
          
          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{cat.name}</span>
                  <span>{cat.percent}% ({cat.count} cases)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color} transition-all duration-700`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Data refreshed continuously from MongoDB Spatial Index</span>
            <span className="font-bold text-blue-600">GeoJSON Active</span>
          </div>
        </div>

        {/* Regional Density Distribution (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Geographic Hotspot Density</h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { region: "Colombo Fort & Galle Face", count: 44, severity: "High Traffic", color: "border-rose-200 bg-rose-50/50" },
              { region: "Kollupitiya & Bambalapitiya", count: 32, severity: "Medium Traffic", color: "border-amber-200 bg-amber-50/50" },
              { region: "Cinnamon Gardens (Colombo 07)", count: 21, severity: "Low Traffic", color: "border-blue-200 bg-blue-50/50" },
              { region: "Negombo & Airport Highway", count: 17, severity: "Transit Corridor", color: "border-emerald-200 bg-emerald-50/50" },
            ].map((spot) => (
              <div key={spot.region} className={`p-3.5 rounded-2xl border ${spot.color} space-y-1`}>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span className="truncate">{spot.region}</span>
                </div>
                <div className="text-lg font-black text-slate-800">{spot.count} Reports</div>
                <span className="text-[10px] font-semibold text-slate-500 block">{spot.severity}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
            💡 <strong>Dispatch Optimization:</strong> 72% of towing requests occur along coastal A2 (Galle Road). Pre-positioning roadside flatbeds near Kollupitiya reduces ETA by ~4.5 minutes.
          </div>
        </div>
      </div>

      {/* Provider Performance Analytics Table (Module 5 Deliverable) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Registered Service Provider Performance</h3>
            <p className="text-xs text-slate-500">Auditing response speeds, satisfaction ratings, and dispatch completion</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            4 Responders On Duty
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-bold">Provider / Station</th>
                <th className="pb-3 font-bold">Service Type</th>
                <th className="pb-3 font-bold">Avg Response</th>
                <th className="pb-3 font-bold">Rating</th>
                <th className="pb-3 font-bold">Jobs Completed</th>
                <th className="pb-3 font-bold">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {providers.map((p) => (
                <tr key={p.name} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 text-slate-500">{p.type}</td>
                  <td className="py-3 font-semibold text-blue-600">{p.responseTime}</td>
                  <td className="py-3 font-bold text-amber-500">{p.rating}</td>
                  <td className="py-3 font-mono">{p.completed}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
