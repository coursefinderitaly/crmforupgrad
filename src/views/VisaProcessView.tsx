import React, { useState } from 'react';
import {
  Plane,
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
  UserCheck,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { VisaProcessData, VisaChecklistItem, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const VisaProcessView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateVisaProcessDossier,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Active or default visa process dossier
  const visaData: VisaProcessData = student.visaProcessDossier || {
    visaType: 'National Long-Stay (Type D) Study Visa',
    vfsCenter: 'VFS Italy - New Delhi Shivaji Stadium',
    appointmentDate: '15 Oct 2026',
    appointmentTime: '09:30 AM',
    appointmentStatus: 'Confirmed',
    status: 'VFS Appointment Booked',
    trackingNumber: 'ITA/DEL/261025/0043/01',
    solvencyAmountDemonstrated: '€6,500 (~₹6,00,000)',
    accommodationProofType: 'University Residence Padova Confirmation',
    insurancePolicyNumber: 'BA-SCH-998242',
    checklist: [
      { id: 'vc-1', label: 'Universitaly Summary Sheet (Riepilogo) Validated', category: 'Mandatory', checked: true },
      { id: 'vc-2', label: 'Official University Admission Letter on File', category: 'Mandatory', checked: true },
      { id: 'vc-3', label: 'CIMEA Statement of Comparability / DoV Attached', category: 'Academic', checked: true },
      { id: 'vc-4', label: 'Financial Solvency Proof (€6,000+ Holding Period)', category: 'Financial', checked: true },
      { id: 'vc-5', label: 'Accommodation Proof / Student Housing Lease in Italy', category: 'Travel', checked: true },
      { id: 'vc-6', label: 'Schengen Travel Health Insurance (€30,000 Cover)', category: 'Travel', checked: true },
      { id: 'vc-7', label: 'Return Dummy Flight Ticket Itinerary', category: 'Travel', checked: true },
      { id: 'vc-8', label: 'Passport with 15+ Months Remaining Validity', category: 'Mandatory', checked: true },
      { id: 'vc-9', label: 'All Original Academic Certificates & IELTS TRF', category: 'Academic', checked: true },
      { id: 'vc-10', label: 'National Visa D Application Form Signed with Photos', category: 'Mandatory', checked: true },
    ],
    stampedDate: '26 Oct 2026',
    visaValidUntil: '30 Sept 2027',
    embassyInterviewNotes: 'Student cleared mock visa interview with 10/10 readiness. Statement of purpose and financial sponsorship documents fully aligned.',
  };

  const [status, setStatus] = useState<VisaProcessData['status']>(visaData.status);
  const [vfsCenter, setVfsCenter] = useState(visaData.vfsCenter);
  const [appointmentDate, setAppointmentDate] = useState(visaData.appointmentDate || '15 Oct 2026');
  const [appointmentTime, setAppointmentTime] = useState(visaData.appointmentTime || '09:30 AM');
  const [trackingNumber, setTrackingNumber] = useState(visaData.trackingNumber || 'ITA/DEL/261025/0043/01');
  const [solvency, setSolvency] = useState(visaData.solvencyAmountDemonstrated);
  const [checklist, setChecklist] = useState<VisaChecklistItem[]>(visaData.checklist);
  const [interviewNotes, setInterviewNotes] = useState(visaData.embassyInterviewNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((i) => i.checked).length;
  const isReadyForFiling = checkedCount === checklist.length;

  const handleSave = () => {
    updateVisaProcessDossier(student.id, {
      ...visaData,
      status,
      vfsCenter,
      appointmentDate,
      appointmentTime,
      trackingNumber,
      solvencyAmountDemonstrated: solvency,
      checklist,
      embassyInterviewNotes: interviewNotes,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAdvanceToPreDeparture = () => {
    handleSave();
    advanceToStage(
      student.id,
      'pre_departure',
      `Study Visa Process complete! Visa Stamped (${status}). Transferred to Pre-Departure Orientation & Arrival.`
    );
    navigate('pre-departure', student.id);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="visa-process"
        stageNumber={11}
        totalStages={12}
        title="Study Visa (Type D) Application &amp; VFS Filing"
        subtitle="Schedule VFS embassy appointments, audit financial solvency proofs, verify 10-point visa files, and track embassy decisions"
        icon={Plane}
        iconColor="text-sky-600"
        iconBg="bg-sky-50"
        previousRoute={{ id: 'dov-cimea', label: 'DoV & CIMEA' }}
        nextRoute={{ id: 'pre-departure', label: 'Pre-Departure' }}
        advanceButtonText="Advance to Pre-Departure →"
        onAdvanceStage={handleAdvanceToPreDeparture}
        customAction={
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved! ✓' : 'Save Visa File'}</span>
          </button>
        }
      />

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {status}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Embassy Filing Status</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {appointmentDate}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">VFS Slot: {appointmentTime}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900 leading-tight truncate">
              {solvency}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Solvency Demonstrated</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-purple-700 leading-tight">
              {checkedCount} / {checklist.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Checklist Verified</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: 10-Point Checklist (7 cols) + VFS Appointment & Tracking (5 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Mandatory VFS Document Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  VFS Official 10-Point Study Visa Dossier Checklist
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click any item to verify and confirm presence in student&apos;s physical visa submission file
                </p>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  isReadyForFiling
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {isReadyForFiling ? 'File 100% Ready' : `${checkedCount}/10 Checked`}
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    item.checked
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800 hover:bg-emerald-50'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}} // controlled by div onClick
                      className="w-4 h-4 rounded text-sky-600 focus:ring-0 cursor-pointer shrink-0"
                    />
                    <span className="text-xs font-semibold truncate leading-tight">
                      {idx + 1}. {item.label}
                    </span>
                  </div>

                  <span
                    className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                      item.checked
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {item.checked ? 'Verified ✓' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>

            {/* Mock Interview Notes */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <label className="block font-bold text-slate-700 text-xs">
                Embassy Interview Readiness &amp; Notes
              </label>
              <textarea
                rows={2}
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                placeholder="Candidate interview preparation, post-study intentions, funding explanations..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): VFS Appointment & Tracking */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                VFS Appointment &amp; Tracking Details
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Official booking details and consular processing status
              </p>
            </div>

            {/* Visa Status Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Visa Processing Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="File Preparation">File Preparation</option>
                <option value="VFS Appointment Booked">VFS Appointment Booked</option>
                <option value="Submitted to Embassy">Submitted to Embassy (At Counter)</option>
                <option value="Under Processing">Under Embassy Processing</option>
                <option value="Visa Approved & Stamped">Visa Approved &amp; Stamped 🎉</option>
                <option value="Refused">Refused / Query Raised</option>
              </select>
            </div>

            {/* VFS Center */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">VFS Visa Application Center</label>
              <select
                value={vfsCenter}
                onChange={(e) => setVfsCenter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none focus:border-[#087cf5] bg-white"
              >
                <option value="VFS Italy - New Delhi Shivaji Stadium">VFS Italy - New Delhi</option>
                <option value="VFS Italy - Mumbai BKC">VFS Italy - Mumbai (BKC)</option>
                <option value="VFS Italy - Bengaluru Global Tech">VFS Italy - Bengaluru</option>
                <option value="VFS Italy - Kolkata">VFS Italy - Kolkata</option>
                <option value="VFS Italy - Hyderabad">VFS Italy - Hyderabad</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Appointment Date</label>
                <input
                  type="text"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Slot Time</label>
                <input
                  type="text"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>
            </div>

            {/* Tracking Reference Number */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">VFS File Tracking Number</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Solvency Amount */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Solvency Demonstrated</label>
              <input
                type="text"
                value={solvency}
                onChange={(e) => setSolvency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
              />
            </div>

            {/* Appointment Letter Action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => alert(`Downloading VFS Appointment Confirmation for ${student.name}...`)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>Download VFS Appointment Letter PDF</span>
              </button>
            </div>

            {/* Advance Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleAdvanceToPreDeparture}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Visa Stamped &amp; Advance to Pre-Departure</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-center text-slate-400">
                Moves student into Final Stage 12: Pre-Departure Orientation, Flights &amp; Arrival
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
