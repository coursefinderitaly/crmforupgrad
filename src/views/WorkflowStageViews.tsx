import React, { useState } from 'react';
import {
  Award,
  Building2,
  Sparkles,
  Monitor,
  FileText,
  Plane,
  Compass,
  CreditCard,
  Users,
  UserCheck,
  UserPlus,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Download,
  AlertCircle,
  Plus,
  Calendar,
  Send,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

// ── Offer Letters View ──
export const OfferLettersView: React.FC = () => {
  const { navigate, students } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Award className="w-5 h-5 text-[#087cf5]" />
            <span>Offer Letters Received</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Stage 6
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified admission offers, conditional requirements, deposit deadlines &amp; acceptance letters
          </p>
        </div>
        <button
          onClick={() => navigate('students')}
          className="text-xs font-semibold text-[#087cf5] hover:underline"
        >
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">University</th>
              <th className="p-3">Program</th>
              <th className="p-3">Offer Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Conditions</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-[#101d37]">Rahul Sharma</td>
              <td className="p-3 font-medium">University of Bologna</td>
              <td className="p-3 text-slate-600">Advanced Materials Engineering</td>
              <td className="p-3 text-slate-500">10 Oct 2025</td>
              <td className="p-3 text-slate-600">Conditional</td>
              <td className="p-3 text-slate-600">IELTS 6.5 Final Transcript</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#fef3c7] text-[#d97706]">
                  Under Verification
                </span>
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => alert('Downloading official Bologna admission offer PDF...')}
                  className="px-2.5 py-1 rounded bg-[#087cf5] text-white font-semibold text-[11px]"
                >
                  Download PDF
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-[#101d37]">Pooja Verma</td>
              <td className="p-3 font-medium">IU International University (Germany)</td>
              <td className="p-3 text-slate-600">MSc Data Science &amp; AI (1+1)</td>
              <td className="p-3 text-slate-500">01 Oct 2025</td>
              <td className="p-3 text-slate-600">Unconditional</td>
              <td className="p-3 text-slate-600">None (upGrad Partner Waiver)</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#15803d]">
                  Accepted
                </span>
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => alert('Downloading official IU admission letter...')}
                  className="px-2.5 py-1 rounded bg-[#087cf5] text-white font-semibold text-[11px]"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Final University View ──
export const FinalUniversityView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#087cf5]" />
            <span>Final University Selection</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#087cf5] font-bold border border-blue-200">
              Stage 7
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed destination institution, enrollment deposit receipts, tuition schedule &amp; student agreement
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#087cf5]">Selected: University of Padova</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Confirmed</span>
          </div>
          <p className="text-xs text-slate-600">Candidate: Rahul Sharma (ITA-2027-001)</p>
          <p className="text-xs text-slate-600">Program: Materials Engineering &bull; 2-Year MSc</p>
          <p className="text-xs text-slate-600">Tuition Fee: €2,400/yr (Eligible for 100% DSU Regional Waiver)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-bold text-sm text-[#101d37]">Next Steps Checklist</h4>
          <ul className="text-xs space-y-1.5 text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seat Deposit (€150) paid to University of Padova treasury</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Acceptance confirmation sent to Admissions Office</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Universitaly portal pre-enrolment dossier validation pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ── Scholarship View ──
export const ScholarshipView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Scholarship Tracking &amp; Grants</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
              Stage 8
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Regional DSU financial aid, university merit scholarships, income certificate &amp; apostille verification
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">DSU Regional Scholarship (Veneto)</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              Documents Pending
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Provides full tuition fee waiver + up to €7,200 annual student stipend + free cafeteria meals.
          </p>
          <div className="text-xs space-y-1 text-slate-500">
            <p><strong>Deadline:</strong> 30 Nov 2026</p>
            <p><strong>Required ISEE Parificato:</strong> Under €25,000</p>
            <p><strong>Status:</strong> Family income documents awaiting MEA apostille</p>
          </div>
          <button
            onClick={() => alert('Starting DSU application submission process...')}
            className="w-full py-1.5 rounded-lg bg-[#087cf5] text-white font-semibold text-xs"
          >
            Manage DSU Dossier
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">University of Padova Merit Grant</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Not Applied
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Top academic performance grant: €8,000/year for candidates with CGPA &gt; 8.0.
          </p>
          <div className="text-xs space-y-1 text-slate-500">
            <p><strong>Deadline:</strong> 15 Feb 2027</p>
            <p><strong>Eligibility:</strong> Merit rank in Materials Engineering shortlist</p>
          </div>
          <button
            onClick={() => alert('Initiating Padova merit application...')}
            className="w-full py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Apply for Merit Grant
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Pre-Enrolment (Universitaly) View ──
export const PreEnrolmentView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#087cf5]" />
            <span>Pre-Enrolment (Universitaly)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 font-bold border border-orange-200">
              Stage 9
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Italian Ministry of Foreign Affairs (MUR) official pre-enrolment application and university validation
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h4 className="font-bold text-sm text-slate-900">Universitaly Step-by-Step Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-800">1. Account Created</span>
            <p className="text-emerald-700">Student account registered with passport credentials.</p>
            <span className="inline-block mt-1 text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
              Completed
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-800">2. Form Submission</span>
            <p className="text-emerald-700">Submitted on 05 Oct 2025 for University of Padova.</p>
            <span className="inline-block mt-1 text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
              Completed
            </span>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-800">3. University Validation</span>
            <p className="text-amber-700">Awaiting Summary (Riepilogo) release by Padua registrar.</p>
            <span className="inline-block mt-1 text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── DoV / CIMEA View ──
export const DovCimeaView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#087cf5]" />
            <span>Declaration of Value (DoV) / CIMEA Legalization</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              Stage 10
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Apostille, HRD authentication, and CIMEA Statement of Comparability / Verification
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900">Legalization Status: Not Started</h4>
        <p className="text-xs text-slate-600">
          The Embassy of Italy in New Delhi / Mumbai requires either a Declaration of Value (DoV) or CIMEA Statement of Comparability prior to visa stamping.
        </p>
        <button
          onClick={() => alert('Opening CIMEA DiploMe portal submission manager...')}
          className="px-4 py-2 rounded-lg bg-[#087cf5] text-white font-semibold text-xs shadow-xs"
        >
          Start CIMEA / DoV Process
        </button>
      </div>
    </div>
  );
};

// ── Visa Process View ──
export const VisaProcessView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#087cf5]" />
            <span>Study Visa (Type D) Process</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              Stage 11
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            VFS appointment scheduling, visa file compilation, insurance, cover letter &amp; embassy interview prep
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900">Visa Application Checklist</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p><strong>Appointment Date:</strong> Pending Universitaly release</p>
            <p><strong>Visa Type:</strong> National Long Stay Visa (Type D)</p>
            <p><strong>VFS Center:</strong> New Delhi / Mumbai / Kolkata</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p><strong>Solvency Balance:</strong> €6,000 for living expenses</p>
            <p><strong>Accommodation:</strong> Student housing in Padova booked</p>
            <p><strong>Travel Insurance:</strong> €30,000 Schengen cover</p>
          </div>
        </div>
        <button
          onClick={() => alert('Starting VFS Italy visa appointment booking workflow...')}
          className="px-4 py-2 rounded-lg bg-[#087cf5] text-white font-semibold text-xs shadow-xs"
        >
          Start Visa Process
        </button>
      </div>
    </div>
  );
};

// ── Pre-Departure View ──
export const PreDepartureView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#087cf5]" />
            <span>Pre-Departure &amp; Arrival Assistance</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              Stage 12
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Flight tickets, Codice Fiscale, Italian bank account, airport pickup &amp; residence permit (Permesso di Soggiorno)
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Student Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900">Arrival Readiness Protocol</h4>
        <p className="text-xs text-slate-600">
          Once the visa is stamped, the student is scheduled for a pre-departure orientation briefing covering foreign exchange (Forex card), Italian SIM card, and the 8-day Permesso di Soggiorno post office application kit in Italy.
        </p>
      </div>
    </div>
  );
};

// ── Leads View ──
export const LeadsView: React.FC = () => {
  const { students, navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#087cf5]" />
            <span>Leads Intake &amp; Inquiries</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#087cf5] font-bold border border-blue-200">
              Active Leads ({students.length})
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming students via upGrad articulation, website leads &amp; channel partner referrals
          </p>
        </div>
        <button
          onClick={() => navigate('students')}
          className="px-3 py-1.5 rounded-lg bg-[#087cf5] text-white font-semibold text-xs"
        >
          View Full Students Roster
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
            <tr>
              <th className="p-3">Lead ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Course</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Counsellor</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-600">{st.leadId}</td>
                <td className="p-3 font-bold text-[#101d37]">{st.name}</td>
                <td className="p-3">{st.countryInterest}</td>
                <td className="p-3 text-slate-600">{st.courseInterest}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[#087cf5] font-semibold text-[11px]">
                    {st.stage}
                  </span>
                </td>
                <td className="p-3 text-slate-600">{st.assignedCounsellor}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => navigate('students')}
                    className="text-[#087cf5] hover:underline font-semibold"
                  >
                    Open Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Counsellor View ──
export const CounsellorView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#087cf5]" />
            <span>Counsellor Workstation &amp; Follow-ups</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Student counselling sessions, profile evaluations, intake timelines &amp; pathway guidance
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Students
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900">Today&apos;s Scheduled Counselling Consultations</h4>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-slate-900">Rahul Sharma (ITA-2027-001)</p>
            <p className="text-slate-500">Topic: University of Padova vs Politecnico di Torino selection &amp; DSU eligibility</p>
          </div>
          <button
            onClick={() => alert('Starting video counselling session for Rahul Sharma...')}
            className="px-3 py-1.5 rounded-lg bg-[#087cf5] text-white font-semibold"
          >
            Start Call
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Finance & Payments View ──
export const FinanceView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#087cf5]" />
            <span>Finance &amp; Fee Payments</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Service package fee installments, GST tax invoices, university application fee waivers &amp; partner payouts
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Students
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-semibold">Total Pipeline Invoiced</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">₹ 2,80,000</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs text-emerald-600 font-semibold">Total Collected</p>
          <h3 className="text-xl font-bold text-emerald-600 mt-1">₹ 1,00,000</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs text-rose-600 font-semibold">Pending Balance</p>
          <h3 className="text-xl font-bold text-rose-600 mt-1">₹ 1,80,000</h3>
        </div>
      </div>
    </div>
  );
};

// ── HR View ──
export const HRView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto text-[#101d37]">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-[#087cf5]" />
            <span>HR &amp; Team Directory</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Counsellors, documentation executives, admissions officers &amp; channel managers
          </p>
        </div>
        <button onClick={() => navigate('students')} className="text-xs font-semibold text-[#087cf5] hover:underline">
          &larr; Back to Students
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900">Active Operational Staff</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-900">Neha Jain</p>
            <p className="text-slate-500">Senior Study Abroad Counsellor &bull; Europe Specialist</p>
            <p className="text-slate-600 mt-1">Assigned Students: 12 Active</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-900">Priya Singh</p>
            <p className="text-slate-500">Senior Documentation Executive &bull; CIMEA &amp; Universitaly Officer</p>
            <p className="text-slate-600 mt-1">Active Dossiers: 18 Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

