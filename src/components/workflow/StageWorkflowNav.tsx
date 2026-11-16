import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useUpGradWorkflow } from '../../context/UpGradWorkflowContext';
import { Student, PipelineStage } from '../../types/crm';

interface StageWorkflowNavProps {
  currentStageId: string;
  stageNumber: number; // e.g. 5
  totalStages?: number; // defaults to 12
  stageShortName?: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  previousRoute?: { id: string; label: string };
  nextRoute?: { id: string; label: string };
  onAdvanceStage?: () => void;
  advanceButtonText?: string;
  customAction?: React.ReactNode;
}

export const STAGES_LIST: { id: string; short: string; label: string; stageKey: PipelineStage }[] = [
  { id: 'students', short: '01 Profile', label: 'Profile Verification', stageKey: 'enrolled' },
  { id: 'documentation', short: '02 Docs', label: 'Documentation Verification', stageKey: 'documentation' },
  { id: 'shortlisting', short: '03 Shortlist', label: 'University Shortlisting', stageKey: 'shortlisting' },
  { id: 'student-approval', short: '04 Approval', label: 'Student Approval', stageKey: 'student_approval' },
  { id: 'applications', short: '05 Apply', label: 'Applications Submission', stageKey: 'application' },
  { id: 'offer-letters', short: '06 Offers', label: 'Offer Letters Received', stageKey: 'offer_received' },
  { id: 'final-university', short: '07 Final Uni', label: 'Final University Choice', stageKey: 'final_university' },
  { id: 'scholarship', short: '08 Grants', label: 'Scholarships & Grants', stageKey: 'scholarship' },
  { id: 'pre-enrolment', short: '09 Universitaly', label: 'Pre-Enrolment (Universitaly)', stageKey: 'pre_enrolment' },
  { id: 'dov-cimea', short: '10 DoV/CIMEA', label: 'DoV & CIMEA Legalization', stageKey: 'dov_cimea' },
  { id: 'visa-process', short: '11 Visa', label: 'Visa Process (VFS)', stageKey: 'visa_process' },
  { id: 'pre-departure', short: '12 Arrival', label: 'Pre-Departure & Arrival', stageKey: 'pre_departure' },
];

export const StageWorkflowNav: React.FC<StageWorkflowNavProps> = ({
  currentStageId,
  stageNumber,
  totalStages = 12,
  stageShortName,
  title,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  previousRoute,
  nextRoute,
  onAdvanceStage,
  advanceButtonText,
  customAction,
}) => {
  const { students, selectedStudent, setSelectedStudent, navigate } = useUpGradWorkflow();
  const student = selectedStudent || students[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden select-none">
      {/* ── Tier 1: Stage Meta & Interlink Navigation Bar ── */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
        {/* Left: Breadcrumbs & Stage Badge */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 font-medium">
          <span className="text-slate-400">Presume Pipeline</span>
          <span className="text-slate-300">/</span>
          <span className="font-extrabold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-800 text-[10.5px] shadow-2xs uppercase tracking-wider whitespace-nowrap shrink-0">
            Stage {String(stageNumber).padStart(2, '0')} of {totalStages}
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 truncate">{title}</span>
        </div>

        {/* Right: Stage Navigation Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {previousRoute && (
            <button
              type="button"
              onClick={() => navigate(previousRoute.id, student?.id)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer hover:border-slate-300"
              title={`Return to ${previousRoute.label}`}
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>&larr; {previousRoute.label}</span>
            </button>
          )}

          {nextRoute && (
            <button
              type="button"
              onClick={() => {
                if (onAdvanceStage) {
                  onAdvanceStage();
                } else {
                  navigate(nextRoute.id, student?.id);
                }
              }}
              className="px-3 py-1 rounded-lg bg-[#087cf5] hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm shadow-blue-500/20 cursor-pointer"
              title={`Advance to ${nextRoute.label}`}
            >
              <span>{(advanceButtonText || nextRoute.label).replace(/[→>›]/g, '').trim()}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('dashboard', student?.id)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-2xs cursor-pointer"
            title="Dashboard Overview"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Tier 2: Main Hero Header (Icon + Title & Subtitle + Applicant Switcher & Actions) ── */}
      <div className="p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Left: Stage Icon + Title & Subtitle */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div
            className={`w-12 h-12 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs border border-slate-100`}
          >
            <Icon className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#087cf5] border border-blue-200/80 uppercase tracking-wider whitespace-nowrap shrink-0">
                Presume Global Degree Pipeline
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">&bull;</span>
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap shrink-0">
                Stage {stageNumber}: {stageShortName || title}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Active Applicant Selector & Primary Custom Action */}
        <div className="flex flex-wrap items-center gap-2.5 xl:justify-end shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
          {/* Active Applicant Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 pr-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#087cf5] to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-2xs shrink-0">
              {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Applicant:
                </span>
                <span className="text-[9.5px] font-bold text-slate-500 font-mono">
                  {student.leadId}
                </span>
              </div>
              <div className="relative">
                <select
                  value={student?.id || ''}
                  onChange={(e) => {
                    const found = students.find((s) => s.id === e.target.value);
                    if (found) setSelectedStudent(found);
                  }}
                  className="bg-transparent text-xs font-black text-slate-900 focus:outline-none cursor-pointer pr-4 appearance-none truncate max-w-[200px]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.countryInterest})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Primary Custom Action (e.g. "+ Add Application", "+ Upload Offer", etc.) */}
          {customAction}
        </div>
      </div>

      {/* ── Tier 3: Active Student Quick Dossier Strip ── */}
      {student && (
        <div className="px-4 py-2.5 bg-blue-50/30 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <div>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mr-1.5">Candidate:</span>
              <span className="font-extrabold text-slate-900">{student.name}</span>
            </div>
            <div className="text-slate-300 hidden sm:inline">&bull;</div>
            <div>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mr-1.5">Destination:</span>
              <span className="font-bold text-slate-800">{student.countryInterest}</span>
            </div>
            <div className="text-slate-300 hidden sm:inline">&bull;</div>
            <div>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mr-1.5">Program:</span>
              <span className="font-bold text-slate-800 truncate max-w-[260px] inline-block align-bottom">{student.courseInterest}</span>
            </div>
            <div className="text-slate-300 hidden sm:inline">&bull;</div>
            <div>
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider mr-1.5">Intake:</span>
              <span className="font-bold text-slate-800">{student.intake}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">Current Pipeline Stage:</span>
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
              {student.statusText || student.stage}
            </span>
          </div>
        </div>
      )}

      {/* ── Tier 4: 12-Stage Visual Breadcrumb Flow Rail ── */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider shrink-0 pr-1.5">
          Flow:
        </span>
        {STAGES_LIST.map((st, idx) => {
          const isCurrent = st.id === currentStageId;
          const isPast = idx < stageNumber - 1;
          return (
            <React.Fragment key={st.id}>
              <button
                type="button"
                onClick={() => navigate(st.id, student?.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#087cf5] text-white shadow-2xs font-extrabold'
                    : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 font-semibold'
                      : 'bg-white text-slate-500 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-800 font-medium'
                }`}
                title={st.label}
              >
                {isPast ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                ) : null}
                <span>{st.short}</span>
              </button>
              {idx < STAGES_LIST.length - 1 && (
                <span className="text-slate-300 text-[11px] shrink-0 font-bold">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
