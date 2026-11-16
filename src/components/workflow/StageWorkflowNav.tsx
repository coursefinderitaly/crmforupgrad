import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  User,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useUpGradWorkflow } from '../../context/UpGradWorkflowContext';
import { Student, PipelineStage } from '../../types/crm';

interface StageWorkflowNavProps {
  currentStageId: string;
  stageNumber: number; // e.g. 5
  totalStages?: number; // defaults to 12
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
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs space-y-3">
      {/* Top Row: Stage Info + Student Switcher + Interlink Nav Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Icon, Stage Badge, Title & Subtitle */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 uppercase tracking-wider">
                Stage {String(stageNumber).padStart(2, '0')} of {totalStages}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">&bull;</span>
              <span className="text-[11px] font-bold text-[#087cf5]">
                Presume Global Degree Pipeline
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug truncate">
              {title}
            </h1>
            <p className="text-[11.5px] font-medium text-slate-500 truncate max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Active Student Selector & Nav Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
          {/* Active Student Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-wide">
              Applicant:
            </span>
            <select
              value={student?.id || ''}
              onChange={(e) => {
                const found = students.find((s) => s.id === e.target.value);
                if (found) setSelectedStudent(found);
              }}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.countryInterest}) — {s.statusText || s.stage}
                </option>
              ))}
            </select>
          </div>

          {/* Previous Stage Button */}
          {previousRoute && (
            <button
              type="button"
              onClick={() => navigate(previousRoute.id, student?.id)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
              title={`Go back to ${previousRoute.label}`}
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">&larr; {previousRoute.label}</span>
              <span className="sm:hidden">Back</span>
            </button>
          )}

          {/* Next Stage Button */}
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
              className="px-3 py-1.5 rounded-xl bg-[#087cf5] hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
              title={`Advance or navigate to ${nextRoute.label}`}
            >
              <span>{advanceButtonText || `${nextRoute.label} →`}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Optional Custom Action */}
          {customAction}

          {/* Quick jump to dashboard */}
          <button
            type="button"
            onClick={() => navigate('dashboard', student?.id)}
            className="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 transition-all shadow-2xs"
            title="View Dashboard Pipeline Overview"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row: 12-Stage Visual Breadcrumb Rail */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider shrink-0 pr-1">
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
                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#087cf5] text-white shadow-2xs'
                    : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-200/70 hover:bg-slate-100 hover:text-slate-800'
                }`}
                title={st.label}
              >
                {isPast && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />}
                <span>{st.short}</span>
              </button>
              {idx < STAGES_LIST.length - 1 && (
                <span className="text-slate-300 text-[10px] shrink-0 font-bold">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
