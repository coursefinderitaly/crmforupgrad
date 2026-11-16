import React, { useState } from 'react';
import {
  GraduationCap,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Globe,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const UpGradLoginView: React.FC = () => {
  const { login } = useUpGradWorkflow();
  const [email, setEmail] = useState('upgrad@crm.com');
  const [password, setPassword] = useState('upgrad123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    }, 400);
  };

  const handleQuickFill = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Soft Accents with upGrad Red Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[350px] bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* ── Top Header Navigation Bar ── */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e21b22] to-[#b81218] flex items-center justify-center text-white shadow-md shadow-red-500/20">
              <GraduationCap className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  <span className="text-[#e21b22]">upGrad</span> Global
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-[#e21b22] border border-red-200 uppercase">
                  CRM Channel Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Study Abroad Operations &amp; Partner Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Channel System Live</span>
          </div>
          <a
            href="https://upgrad.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-[#e21b22] transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>upgrad.com</span>
          </a>
        </div>
      </header>

      {/* ── Main Hero & Card Split ── */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        {/* Left Hero Column */}
        <div className="flex-1 max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/60 border border-red-200 text-xs font-bold text-[#e21b22]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1+1 GLOBAL PATHWAYS · DUAL DEGREES · SCHOLARSHIP ALLOCATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Unified Study Abroad <br />
            <span className="bg-gradient-to-r from-[#e21b22] to-rose-600 bg-clip-text text-transparent">
              Operations Portal
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Manage complete end-to-end student recruitment: from student registration, documentation verification, university shortlisting, student approvals, to direct university application submissions.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#e21b22] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900">Interlinked Pipeline</h4>
                <p className="text-[11px] text-slate-500">Auto-handover across 6 stages</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900">Partner Universities</h4>
                <p className="text-[11px] text-slate-500">Germany, Italy, UK &amp; more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 relative">
            {/* Top Brand Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#e21b22] mb-3 shadow-inner">
                <GraduationCap className="w-8 h-8 stroke-[2.2]" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Sign in to upGrad Portal</h2>
              <p className="text-xs text-slate-500 mt-1">Authorized Access for Operations &amp; Partners</p>
            </div>

            {/* Quick Login Presets */}
            <div className="mb-5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Demo Quick Sign-In
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickFill('upgrad@crm.com', 'upgrad123')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-slate-200 text-left transition-colors flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-700 truncate">upGrad Lead</span>
                  <span className="text-[10px] font-bold text-[#e21b22]">Fill</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('partner@crm.com', 'partner123')}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-slate-200 text-left transition-colors flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-700 truncate">Channel Partner</span>
                  <span className="text-[10px] font-bold text-[#e21b22]">Fill</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Work Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="upgrad@crm.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <LockKeyhole className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#e21b22] to-[#c4151b] hover:from-[#c4151b] hover:to-[#9f0f14] text-white font-bold text-sm shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span>Signing In…</span>
                ) : (
                  <>
                    <span>Enter upGrad Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Trust Badges */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Role-Based Access</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-500 border-t border-slate-200/60 bg-white/50">
        © {new Date().getFullYear()} upGrad Global Education • Presume Overseas Study Abroad CRM • All Rights Reserved
      </footer>
    </div>
  );
};

