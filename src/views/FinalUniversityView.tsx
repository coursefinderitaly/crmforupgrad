import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileCheck2,
  Upload,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  DollarSign,
  UserCheck,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { FinalUniversityData, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const FinalUniversityView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    confirmFinalUniversity,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default final university data
  const finalChoice: FinalUniversityData = student.finalUniversityChoice || {
    universityId: 'uni-padova',
    universityName: student.countryInterest.includes('UK')
      ? 'Liverpool John Moores University'
      : student.countryInterest.includes('Germany')
        ? 'IU International University of Applied Sciences'
        : 'University of Padova',
    course: student.courseInterest || 'MSc Computer Science',
    country: student.countryInterest || 'Italy 🇮🇹',
    city: student.countryInterest.includes('Italy') ? 'Padova' : 'Berlin',
    intake: student.intake || 'Sept 2026',
    tuitionFee: '€2,400 / yr (Eligible for 100% DSU Regional Waiver)',
    depositAmount: '€150',
    depositStatus: 'Paid',
    depositReceiptRef: 'TRX-EUR-2026-98124',
    depositDate: '12 Oct 2025',
    studentAgreementSigned: true,
    signedDate: '12 Oct 2025',
    acceptanceLetterReceived: true,
    portalCredentialsCreated: true,
    notes: 'Enrolment seat confirmed. Deposit verified by Admissions Desk.',
  };

  const [depositStatus, setDepositStatus] = useState<FinalUniversityData['depositStatus']>(
    finalChoice.depositStatus
  );
  const [receiptRef, setReceiptRef] = useState(finalChoice.depositReceiptRef || 'TRX-EUR-2026-98124');
  const [agreementSigned, setAgreementSigned] = useState(finalChoice.studentAgreementSigned);
  const [acceptanceLetter, setAcceptanceLetter] = useState(finalChoice.acceptanceLetterReceived);
  const [credentialsDone, setCredentialsDone] = useState(finalChoice.portalCredentialsCreated);
  const [depositAmount, setDepositAmount] = useState(finalChoice.depositAmount);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    confirmFinalUniversity(student.id, {
      ...finalChoice,
      depositStatus,
      depositReceiptRef: receiptRef,
      depositAmount,
      studentAgreementSigned: agreementSigned,
      acceptanceLetterReceived: acceptanceLetter,
      portalCredentialsCreated: credentialsDone,
      depositDate: depositStatus === 'Paid' ? finalChoice.depositDate || 'Today' : undefined,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAdvanceToScholarship = () => {
    handleSave();
    advanceToStage(
      student.id,
      'scholarship',
      `Final University confirmed (${finalChoice.universityName}). Seat deposit ${depositStatus}. Transferred to Scholarships & Grants.`
    );
    navigate('scholarship', student.id);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="final-university"
        stageNumber={7}
        totalStages={12}
        stageShortName="Enrolment Seat Deposit"
        title="Final University Confirmation & Enrolment Deposit"
        subtitle="Finalize target destination, verify tuition seat deposits, student agreement contracts, and official university registration"
        icon={Building2}
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
        previousRoute={{ id: 'offer-letters', label: 'Offer Letters' }}
        nextRoute={{ id: 'scholarship', label: 'Scholarships & Grants' }}
        advanceButtonText="Advance to Scholarships →"
        onAdvanceStage={handleAdvanceToScholarship}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Details'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {finalChoice.universityName.split(' ')[0]}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Final Institution</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">{depositAmount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Seat Deposit: {depositStatus}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-purple-700 leading-tight">
              {agreementSigned ? 'Signed' : 'Pending'}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Student Agreement</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-teal-700 leading-tight">
              {credentialsDone ? 'Active' : 'In Progress'}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Portal Credentials</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: Destination Card (7 cols) + Deposit & Next Step Verification (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Confirmed Institution Dossier */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {finalChoice.universityName}
                    </h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Confirmed Choice
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {finalChoice.city}, {finalChoice.country} &bull; Intake: {finalChoice.intake}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Enrolled Program
                </span>
                <p className="font-extrabold text-slate-900">{finalChoice.course}</p>
                <p className="text-[11px] text-slate-500">Degree Level: Master of Science (120 ECTS)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Tuition Fee Structure
                </span>
                <p className="font-extrabold text-[#087cf5]">{finalChoice.tuitionFee}</p>
                <p className="text-[11px] text-emerald-700 font-bold">DSU Regional Grant reduces fee to €0</p>
              </div>
            </div>

            {/* Candidate & Enrolment Verification */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Candidate Information &amp; Verification
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 text-[10px] block">Student Name</span>
                  <span className="font-bold text-slate-900">{student.name}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 text-[10px] block">Lead Ref ID</span>
                  <span className="font-mono font-bold text-slate-900">{student.leadId}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 text-[10px] block">Passport Status</span>
                  <span className="font-bold text-emerald-700">✓ {student.passportStatus}</span>
                </div>
              </div>
            </div>

            {/* University Portal Credentials */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide">
                  University Student Portal Account
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Credentials Active
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-slate-600 font-semibold">
                    Portal: <strong>Uniweb Padova / Delphi Tor Vergata</strong>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Student Matricola / User: <strong className="font-mono text-slate-800">2026_{student.leadId.toLowerCase()}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Opening university student portal for ${student.name}...`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <span>Open Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#087cf5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Seat Deposit & Next Stage Verification */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                Seat Deposit &amp; Enrollment Checklist
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Verify seat confirmation fee and declaration agreements
              </p>
            </div>

            {/* Deposit Amount & Status Form */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Enrolment Deposit Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Paid', 'Pending', 'Waived'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setDepositStatus(status)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        depositStatus === status
                          ? 'bg-[#087cf5] text-white border-[#087cf5] shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {status === 'Paid' ? '✓ Paid' : status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deposit Amount</label>
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bank Receipt Ref</label>
                  <input
                    type="text"
                    value={receiptRef}
                    onChange={(e) => setReceiptRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Enrolment Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Mandatory Enrolment Gates
              </span>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={acceptanceLetter}
                  onChange={(e) => setAcceptanceLetter(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Official Admission Acceptance Signed &amp; Dispatched
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={agreementSigned}
                  onChange={(e) => setAgreementSigned(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  Student Service Agreement &amp; Code of Conduct Signed
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={credentialsDone}
                  onChange={(e) => setCredentialsDone(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087cf5] focus:ring-0"
                />
                <span className="font-semibold text-slate-800">
                  University Student ID &amp; Portal Login Generated
                </span>
              </label>
            </div>

            {/* Action Progression Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleAdvanceToScholarship}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Confirm Destination &amp; Advance to Scholarships</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Moves student into Stage 8: Regional DSU Financial Aid &amp; Merit Scholarships
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

