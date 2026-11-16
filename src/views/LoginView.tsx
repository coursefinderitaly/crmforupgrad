import React, { useState } from 'react';
import {
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const LoginView: React.FC = () => {
  const { login } = useUpGradWorkflow();
  const [email, setEmail] = useState('lead@crm.com');
  const [password, setPassword] = useState('crm123');
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
        setErrorMsg(res.error || 'Unable to sign in. Please try again.');
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 flex items-center justify-center px-4 py-10">
      {/* Soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(226,27,34,0.07),_transparent_60%)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-slate-200/50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Brand */}
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e21b22] to-[#b81218] text-white shadow-lg shadow-red-500/20">
            <GraduationCap className="h-6 w-6" strokeWidth={2} />
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-900">CRM</span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-500">
            Study Abroad Operations
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
          <div className="mb-6">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">CRM Login</h1>
            <p className="mt-1 text-xs text-slate-500">
              Sign in with your work account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 transition-colors focus:border-[#e21b22] focus:outline-none focus:ring-2 focus:ring-[#e21b22]/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <LockKeyhole className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 transition-colors focus:border-[#e21b22] focus:outline-none focus:ring-2 focus:ring-[#e21b22]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#e21b22] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c4151b] focus:outline-none focus:ring-2 focus:ring-[#e21b22]/30 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Demo credentials are pre-filled</span>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} CRM · Authorized access only
        </p>
      </div>
    </div>
  );
};
