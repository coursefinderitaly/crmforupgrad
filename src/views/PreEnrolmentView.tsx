import React, { useState } from 'react';
import {
  Monitor,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  Globe,
  Upload,
  UserCheck,
  Check,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { PreEnrolmentData, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const PreEnrolmentView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updatePreEnrolmentDossier,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default pre-enrolment data
  const preEnrolment: PreEnrolmentData = student.preEnrolmentDossier || {
    portal: 'Universitaly',
    applicationRef: `UNIV-2026-IT-98124`,
    targetEmbassy: 'Embassy of Italy - New Delhi (Consular Chancellery)',
    submissionDate: '18 Oct 2025',
    status: 'Summary Approved (Riepilogo Issued)',
    riepilogoSummaryIssued: true,
    riepilogoDate: '22 Oct 2025',
    facultyValidatorName: 'Prof. Marco Rossi (University Registrar Padova)',
    notes: 'Pre-enrolment validated by Padua faculty. Official Universitaly Riepilogo summary sheet issued for VFS Visa file.',
  };

  const [status, setStatus] = useState<PreEnrolmentData['status']>(preEnrolment.status);
  const [appRef, setAppRef] = useState(preEnrolment.applicationRef);
  const [targetEmbassy, setTargetEmbassy] = useState(preEnrolment.targetEmbassy);
  const [riepilogoIssued, setRiepilogoIssued] = useState(preEnrolment.riepilogoSummaryIssued);
  const [notes, setNotes] = useState(preEnrolment.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const steps = [
    { num: 1, title: 'Universitaly Account & Passport', sub: 'Identity credentials registered on MUR portal', done: true },
    { num: 2, title: 'Qualifications Upload', sub: 'Transcripts, IELTS score & CV attached', done: true },
    { num: 3, title: 'Application Submitted', sub: 'Dispatched to Italian University Registrar', done: true },
    {
      num: 4,
      title: 'Faculty Validation',
      sub: 'Approved by University Academic Board',
      done: status === 'Summary Approved (Riepilogo Issued)' || status === 'Under Faculty Validation',
    },
    {
      num: 5,
      title: 'Riepilogo Summary Issued',
      sub: 'Official Ministry validation for VFS Visa filing',
      done: riepilogoIssued,
    },
  ];

  const handleSave = () => {
    updatePreEnrolmentDossier(student.id, {
      ...preEnrolment,
      status,
      applicationRef: appRef,
      targetEmbassy,
      riepilogoSummaryIssued: riepilogoIssued,
      notes,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAdvanceToDoV = () => {
    handleSave();
    advanceToStage(
      student.id,
      'dov_cimea',
      `Universitaly pre-enrolment validated (${appRef}). Summary sheet on file. Transferred to DoV & CIMEA Legalization.`
    );
    navigate('dov-cimea', student.id);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="pre-enrolment"
        stageNumber={9}
        totalStages={12}
        title="Universitaly Official Pre-Enrolment Portal"
        subtitle="Manage Italian Ministry of University &amp; Research (MUR) pre-enrolment dossiers, faculty validations, and summary (Riepilogo) release"
        icon={Monitor}
        iconColor="text-orange-600"
        iconBg="bg-orange-50"
        previousRoute={{ id: 'scholarship', label: 'Scholarships' }}
        nextRoute={{ id: 'dov-cimea', label: 'DoV / CIMEA' }}
        advanceButtonText="Advance to DoV & CIMEA →"
        onAdvanceStage={handleAdvanceToDoV}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Dossier'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {appRef}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Universitaly Dossier Ref</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">
              {riepilogoIssued ? 'Issued ✓' : 'Pending'}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Riepilogo Summary PDF</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              Padova Registrar
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Faculty Validator</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-purple-700 leading-tight truncate">
              {targetEmbassy.split('-')[1]?.trim() || 'New Delhi'}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Italian Visa Mission</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: 5-Stage Step Stepper (7 cols) + Dossier Editor & PDF Download (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Step-by-Step Universitaly Workflow */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Universitaly Portal Progression (MUR Protocol)
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official ministerial registration required for non-EU students enrolling in Italian higher education
                </p>
              </div>
              <a
                href="https://www.universitaly.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#087cf5] hover:underline flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
              >
                <span>Universitaly Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Stepper Cards */}
            <div className="space-y-2.5">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    st.done
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        st.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st.done ? '✓' : st.num}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                        {st.num}. {st.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{st.sub}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      st.done
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {st.done ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Riepilogo Download Callout */}
            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-extrabold text-orange-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>Universitaly Summary Sheet (Riepilogo)</span>
                </div>
                <p className="text-[11px] text-orange-800">
                  Approved on {preEnrolment.riepilogoDate} by Padua Directorate. Essential document for VFS visa appointment.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(`Downloading official Universitaly Riepilogo summary PDF for ${student.name}...`)
                }
                className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Riepilogo PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Dossier Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                Universitaly Dossier Details
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Update ministerial submission attributes and embassy routing
              </p>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Dossier Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="Draft">Draft (In Preparation)</option>
                <option value="Submitted">Submitted to Portal</option>
                <option value="Under Faculty Validation">Under Faculty Validation</option>
                <option value="Summary Approved (Riepilogo Issued)">
                  Summary Approved (Riepilogo Issued)
                </option>
                <option value="Revision Needed">Revision Needed</option>
              </select>
            </div>

            {/* Application Reference ID */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Universitaly Reference ID</label>
              <input
                type="text"
                value={appRef}
                onChange={(e) => setAppRef(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Target Diplomatic Mission */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Italian Diplomatic Mission</label>
              <select
                value={targetEmbassy}
                onChange={(e) => setTargetEmbassy(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="Embassy of Italy - New Delhi (Consular Chancellery)">
                  Embassy of Italy - New Delhi
                </option>
                <option value="Consulate General of Italy - Mumbai">
                  Consulate General of Italy - Mumbai
                </option>
                <option value="Consulate General of Italy - Kolkata">
                  Consulate General of Italy - Kolkata
                </option>
                <option value="Consulate General of Italy - Bengaluru">
                  Consulate General of Italy - Bengaluru
                </option>
              </select>
            </div>

            {/* Riepilogo Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={riepilogoIssued}
                  onChange={(e) => setRiepilogoIssued(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Official Riepilogo Summary Sheet Released by University
                </span>
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ministerial Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Advance Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleAdvanceToDoV}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-teal-600 hover:from-orange-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Approve Pre-Enrolment &amp; Advance to DoV / CIMEA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Moves student into Stage 10: Declaration of Value (DoV) &amp; CIMEA Equivalence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

