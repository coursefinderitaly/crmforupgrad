import React, { useState } from 'react';
import {
  Sparkles,
  Award,
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
  DollarSign,
  Plus,
  Coins,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { ScholarshipData, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const ScholarshipView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateScholarshipDossier,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default scholarship dossier
  const scholarship: ScholarshipData = student.scholarshipDossier || {
    schemeName: student.countryInterest.includes('Italy')
      ? 'Regional DSU Financial Aid (Veneto / ER.GO)'
      : student.countryInterest.includes('Germany')
        ? 'DAAD / IU Merit Excellence Waiver'
        : 'Dean Academic Merit Award',
    country: student.countryInterest || 'Italy 🇮🇹',
    status: 'Applied',
    grantAmount: '€7,200/yr + 100% Tuition Waiver + Free Meals',
    iseeParificatoScore: '€14,800',
    cafSubmissionDate: '15 Oct 2025',
    apostilledIncomeDoc: true,
    familyPropertyCertificate: true,
    bankSolvencySubmitted: true,
    deadline: '30 Nov 2026',
    dossierNotes: 'Income documents apostilled by MEA India. Submitted to Italian CAF for ISEE certification.',
  };

  const [status, setStatus] = useState<ScholarshipData['status']>(scholarship.status);
  const [iseeScore, setIseeScore] = useState(scholarship.iseeParificatoScore || '€14,800');
  const [grantAmount, setGrantAmount] = useState(scholarship.grantAmount);
  const [apostilleIncome, setApostilleIncome] = useState(scholarship.apostilledIncomeDoc);
  const [propertyCert, setPropertyCert] = useState(scholarship.familyPropertyCertificate);
  const [bankSolvency, setBankSolvency] = useState(scholarship.bankSolvencySubmitted);
  const [notes, setNotes] = useState(scholarship.dossierNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateScholarshipDossier(student.id, {
      ...scholarship,
      status,
      iseeParificatoScore: iseeScore,
      grantAmount,
      apostilledIncomeDoc: apostilleIncome,
      familyPropertyCertificate: propertyCert,
      bankSolvencySubmitted: bankSolvency,
      dossierNotes: notes,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAdvanceToPreEnrolment = () => {
    handleSave();
    advanceToStage(
      student.id,
      'pre_enrolment',
      `Scholarship dossier logged (${scholarship.schemeName} - ${status}). Transferred to Universitaly Pre-Enrolment.`
    );
    navigate('pre-enrolment', student.id);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="scholarship"
        stageNumber={8}
        totalStages={12}
        title="Scholarship Tracking &amp; Financial Aid Grants"
        subtitle="Manage Italian regional DSU scholarships, ISEE Parificato income certificates, apostille verification, and university merit waivers"
        icon={Sparkles}
        iconColor="text-amber-500"
        iconBg="bg-amber-50"
        previousRoute={{ id: 'final-university', label: 'Final University' }}
        nextRoute={{ id: 'pre-enrolment', label: 'Pre-Enrolment' }}
        advanceButtonText="Advance to Universitaly →"
        onAdvanceStage={handleAdvanceToPreEnrolment}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Dossier'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {scholarship.grantAmount.split('+')[0]}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Max Aid / Year</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">{iseeScore}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">ISEE Score (&lt; €25k: 100%)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{status}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Application Status</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-purple-700 leading-tight">{scholarship.deadline}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Filing Deadline</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: Regional DSU Scheme (7 cols) + Document Verification & ISEE (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Regional Scheme & Merit Grants */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main DSU Scheme Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    {scholarship.schemeName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Government Financial Aid for International Students in {student.countryInterest}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  status === 'Awarded'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : status === 'Applied'
                      ? 'bg-blue-50 text-[#087cf5] border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Provides full tuition fee waiver, an annual living allowance stipend of up to{' '}
              <strong className="text-slate-900 font-bold">€7,200 per academic year</strong>, and free access to university cafeteria catering meals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Calculated ISEE Parificato
                </span>
                <p className="font-extrabold text-emerald-700 text-sm">{iseeScore}</p>
                <p className="text-[11px] text-slate-500">Threshold: Under €25,000 for 100% grant</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Grant Value &amp; Entitlements
                </span>
                <p className="font-extrabold text-[#087cf5] text-sm">{grantAmount}</p>
                <p className="text-[11px] text-slate-500">Disbursed in 2 semi-annual tranches</p>
              </div>
            </div>

            {/* Notes Section */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <label className="block font-bold text-slate-700 text-xs">
                Dossier Submission &amp; Tracking Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes on MEA apostille, Italian translation, CAF appointment..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>
          </div>

          {/* Institutional Merit Grant Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-xs text-slate-900">
                  University of Padova Excellence Merit Scholarship
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                Merit Based
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600">
              €8,000/year fee waiver + stipend for candidates with GPA &gt; 8.0. Automatically considered upon admission application submission.
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Candidate Score: <strong>{student.graduationScore}</strong></span>
              <span className="text-emerald-700 font-bold">✓ Shortlist Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): ISEE Requirements & Status Update */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                ISEE Parificato &amp; MEA Apostille Checklist
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mandatory documentation required by Italian CAF offices
              </p>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Application Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Eligible', 'Applied', 'Awarded'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      status === s
                        ? 'bg-[#087cf5] text-white border-[#087cf5] shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s === 'Awarded' ? '✓ Awarded' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* ISEE Score Input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ISEE Score</label>
                <input
                  type="text"
                  value={iseeScore}
                  onChange={(e) => setIseeScore(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stipend Amount</label>
                <input
                  type="text"
                  value={grantAmount}
                  onChange={(e) => setGrantAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>
            </div>

            {/* Checklist Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Required Document Legalization
              </span>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={apostilleIncome}
                  onChange={(e) => setApostilleIncome(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Family Income Certificate (Apostilled by MEA)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={propertyCert}
                  onChange={(e) => setPropertyCert(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Family Real Estate / Property Certificate (Apostilled)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={bankSolvency}
                  onChange={(e) => setBankSolvency(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Bank Balance &amp; Solvency Statement (31 Dec Holding)
                </span>
              </label>
            </div>

            {/* Action Progression Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleAdvanceToPreEnrolment}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Save Dossier &amp; Advance to Universitaly</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Moves student into Stage 9: Universitaly Official Pre-Enrolment Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
