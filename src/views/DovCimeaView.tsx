import React, { useState } from 'react';
import {
  FileText,
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
  Award,
  Globe,
  Upload,
  Stamp,
  UserCheck,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { DovCimeaData, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const DovCimeaView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateDovCimeaDossier,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default DoV / CIMEA dossier
  const dovCimea: DovCimeaData = student.dovCimeaDossier || {
    preferredRoute: 'CIMEA DiploMe',
    diploMeRef: `CIMEA-IT-2026-5521`,
    comparabilityStatus: 'Certificate Issued',
    verificationStatus: 'Completed',
    apostilledDegree: true,
    apostilledTranscripts: true,
    certifiedItalianTranslation: true,
    certificateIssueDate: '24 Oct 2025',
    notes: 'CIMEA Statement of Comparability and Statement of Verification successfully issued via DiploMe platform. Uploaded to Universitaly dossier.',
  };

  const [preferredRoute, setPreferredRoute] = useState<DovCimeaData['preferredRoute']>(
    dovCimea.preferredRoute
  );
  const [comparabilityStatus, setComparabilityStatus] = useState<DovCimeaData['comparabilityStatus']>(
    dovCimea.comparabilityStatus
  );
  const [diploMeRef, setDiploMeRef] = useState(dovCimea.diploMeRef || 'CIMEA-IT-2026-5521');
  const [apostilleDegree, setApostilleDegree] = useState(dovCimea.apostilledDegree);
  const [apostilleTranscripts, setApostilleTranscripts] = useState(dovCimea.apostilledTranscripts);
  const [italianTranslation, setItalianTranslation] = useState(dovCimea.certifiedItalianTranslation);
  const [notes, setNotes] = useState(dovCimea.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateDovCimeaDossier(student.id, {
      ...dovCimea,
      preferredRoute,
      comparabilityStatus,
      diploMeRef,
      apostilledDegree: apostilleDegree,
      apostilledTranscripts: apostilleTranscripts,
      certifiedItalianTranslation: italianTranslation,
      notes,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAdvanceToVisa = () => {
    handleSave();
    advanceToStage(
      student.id,
      'visa_process',
      `Academic Legalization Complete (${preferredRoute} - ${comparabilityStatus}). Transferred to Visa Application Process (VFS).`
    );
    navigate('visa-process', student.id);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="dov-cimea"
        stageNumber={10}
        totalStages={12}
        title="Declaration of Value (DoV) &amp; CIMEA Legalization"
        subtitle="Manage academic equivalence verification, MEA apostille stamps, official Italian translations, and CIMEA DiploMe statements"
        icon={FileText}
        iconColor="text-teal-600"
        iconBg="bg-teal-50"
        previousRoute={{ id: 'pre-enrolment', label: 'Pre-Enrolment' }}
        nextRoute={{ id: 'visa-process', label: 'Visa Process' }}
        advanceButtonText="Advance to Visa Process →"
        onAdvanceStage={handleAdvanceToVisa}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Legalization'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {preferredRoute}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Legalization Pathway</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">
              {comparabilityStatus === 'Certificate Issued' ? 'Issued ✓' : comparabilityStatus}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Equivalence Status</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0">
            <Stamp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">
              {apostilleDegree && apostilleTranscripts ? 'MEA Done ✓' : 'In Prep'}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Apostille Verification</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-purple-700 leading-tight truncate">
              {diploMeRef}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">DiploMe Certificate Ref</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: Comparison Routes (7 cols) + Document Legalization Checklist (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): CIMEA vs DoV Pathway Cards */}
        <div className="lg:col-span-7 space-y-4">
          {/* CIMEA Route Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      CIMEA DiploMe Legalization (Recommended)
                    </h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      Digital &amp; Fast-Track
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Statement of Comparability &amp; Statement of Verification via NARIC Italy
                  </p>
                </div>
              </div>

              <a
                href="https://cimea.diplome.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#087cf5] hover:underline flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
              >
                <span>DiploMe Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              CIMEA statements are recognized by Italian universities (MUR framework) and accepted by Italian Embassies and VFS centers worldwide in lieu of a Declaration of Value (DoV).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Statement of Comparability
                </span>
                <p className="font-extrabold text-teal-700">Digital Certificate Ready</p>
                <p className="text-[11px] text-slate-500">Certifies {student.graduationDegree} equals Laurea Triennale (Level 6 EQF)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Statement of Verification
                </span>
                <p className="font-extrabold text-emerald-700">Authenticity Verified ✓</p>
                <p className="text-[11px] text-slate-500">Directly verified with {student.graduationUniversity}</p>
              </div>
            </div>

            {/* Certificate Download Callout */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-extrabold text-teal-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>CIMEA Official Equivalence Statement PDF</span>
                </div>
                <p className="text-[11px] text-teal-800">
                  Ref: {diploMeRef} &bull; Issued: {dovCimea.certificateIssueDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(`Downloading official CIMEA Statement of Comparability for ${student.name}...`)
                }
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CIMEA PDF</span>
              </button>
            </div>
          </div>

          {/* Traditional Consular DoV Pathway Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stamp className="w-4 h-4 text-slate-600" />
                <h4 className="font-extrabold text-xs text-slate-900">
                  Consular Declaration of Value (Dichiarazione di Valore)
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Consular Route
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600">
              For universities requiring paper consular seals: physical file submitted to Embassy of Italy consular section with apostilled original degrees and translated transcripts.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Legalization Attributes & Checklist */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                Document Legalization Tracker
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Verify MEA apostilles, translations, and DiploMe certification
              </p>
            </div>

            {/* Preferred Route */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Legalization Route</label>
              <div className="grid grid-cols-2 gap-2">
                {(['CIMEA DiploMe', 'Embassy DoV'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setPreferredRoute(r)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      preferredRoute === r
                        ? 'bg-[#087cf5] text-white border-[#087cf5] shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Comparability Status</label>
              <select
                value={comparabilityStatus}
                onChange={(e) => setComparabilityStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="Not Started">Not Started</option>
                <option value="Dossier Uploaded">Dossier Uploaded</option>
                <option value="Payment Complete">Payment Complete (€150)</option>
                <option value="Under Verification">Under Verification</option>
                <option value="Certificate Issued">Certificate Issued (Completed)</option>
              </select>
            </div>

            {/* DiploMe Reference ID */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">CIMEA DiploMe Reference ID</label>
              <input
                type="text"
                value={diploMeRef}
                onChange={(e) => setDiploMeRef(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Checklist Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Verification &amp; Authentication Check
              </span>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={apostilleDegree}
                  onChange={(e) => setApostilleDegree(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Graduation Degree Apostilled by MEA India
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={apostilleTranscripts}
                  onChange={(e) => setApostilleTranscripts(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Consolidated Transcripts Apostilled by MEA
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={italianTranslation}
                  onChange={(e) => setItalianTranslation(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Certified Italian Translation by Embassy-Approved Sworn Translator
                </span>
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Desk Notes</label>
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
                onClick={handleAdvanceToVisa}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Legalization Complete &amp; Advance to Visa</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Moves student into Stage 11: National Study Visa (Type D) Filing &amp; VFS Appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
