import React, { useState } from "react";
import { useSafePassage } from "../context/SafePassageContext.jsx";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import heroImg from "../assets/hero-image.jpg";

export default function WelcomeHeroLanding({ onLoginSuccess }) {
  const { switchRole, setIsAuthenticated, setIsReportModalOpen } = useSafePassage();
  const [email, setEmail] = useState("himlahilmy@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleQuickRole = (role) => {
    switchRole(role);
    setIsAuthenticated(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="relative min-h-[calc(100vh-61px)] w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-900">
      {/* Background Image with soft dark vignette */}
      <img
        src={heroImg}
        alt="Travel Safe Scenic"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-slate-950/60" />

      {/* Main Container matching Screen 1 */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        {/* Left Side: Hero Title & 3 Frosted Badges (Screen 1 Left) */}
        <div className="lg:col-span-7 text-white space-y-6">
          {/* Logo */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5 fill-white/20" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs tracking-tight text-white leading-none">Safe Passage</span>
              <span className="text-[10px] text-blue-200">Your Safety, Our Priority</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Travel Safe,<br />
            We’re Here<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-300">
              When You Need Us.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 max-w-lg leading-relaxed font-normal">
            Emergency assistance, local services, and real-time support — all in one centralized platform designed for tourists and overseas travelers.
          </p>

          {/* 3 Frosted Quick Action Badges (Screen 1 Bottom Left) */}
          <div className="grid grid-cols-3 gap-3 pt-4 max-w-md">
            <button
              onClick={() => {
                setIsAuthenticated(true);
                setIsReportModalOpen(true);
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-center transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-4 h-4 text-rose-300" />
              </div>
              <span className="text-xs font-semibold text-white leading-tight">Report Incident</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(true);
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-center transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-xs font-semibold text-white leading-tight">Find Nearby Services</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(true);
              }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-center transition group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-xs font-semibold text-white leading-tight">Track Progress</span>
            </button>
          </div>
        </div>

        {/* Right Side: Frosted Glass Sign In Card (Screen 1 Right) */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white/85 backdrop-blur-xl p-7 sm:p-9 rounded-[32px] shadow-2xl border border-white/60">
            <div className="text-left mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-500 mt-1">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 transition transform active:scale-[0.99]"
                >
                  Login
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleQuickRole("traveler")}
                    className="font-bold text-blue-600 hover:text-blue-700"
                  >
                    Register
                  </button>
                </p>
              </div>

              {/* One-Click Stakeholder Demo Switcher (For assignment review) */}
              <div className="mt-4 pt-4 border-t border-slate-200/70">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Quick Role Login (CA1 Demo)
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickRole("traveler")}
                    className="py-1.5 px-2 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 transition"
                  >
                    Traveler
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRole("provider")}
                    className="py-1.5 px-2 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 border border-amber-200 transition"
                  >
                    Provider
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickRole("admin")}
                    className="py-1.5 px-2 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 border border-indigo-200 transition"
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Footer Logo (Screen 1 bottom right) */}
              <div className="text-center pt-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>Safe Passage</span>
                </div>
                <p className="text-[10px] text-slate-400">Travel Safe. Stay Connected.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
