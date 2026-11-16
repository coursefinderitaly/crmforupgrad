import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  Building2,
  Check,
  ArrowRight,
  MessageCircle,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const StudentApprovalView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    recordStudentApproval,
    navigate,
  } = useUpGradWorkflow();

  const student = selectedStudent || students[0];

  // Selected universities for approval
  const [selectedUniIds, setSelectedUniIds] = useState<string[]>([]);
  const [studentConfirmed, setStudentConfirmed] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Sync selected universities with student state
  useEffect(() => {
    if (student) {
      if (student.approvedUniversities && student.approvedUniversities.length > 0) {
        setSelectedUniIds(student.approvedUniversities);
        setStudentConfirmed(true);
      } else if (student.shortlistedUniversities.length > 0) {
        // Default to first 2 universities
        setSelectedUniIds(student.shortlistedUniversities.slice(0, 2).map((u) => u.id));
        setStudentConfirmed(false);
      } else {
        setSelectedUniIds([]);
        setStudentConfirmed(false);
      }
    }
  }, [student?.id]);

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student selected.</div>;
  }

  const toggleSelectUni = (id: string) => {
    if (selectedUniIds.includes(id)) {
      if (selectedUniIds.length === 1) {
        alert('Student must select at least one university for application.');
        return;
      }
      setSelectedUniIds(selectedUniIds.filter((item) => item !== id));
    } else {
      setSelectedUniIds([...selectedUniIds, id]);
    }
  };

  const handleConfirmApproval = () => {
    if (selectedUniIds.length === 0) {
      alert('Please select at least one university choice.');
      return;
    }
    recordStudentApproval(student.id, selectedUniIds);
    setShowSuccessModal(true);
  };

  const approvalQueue = students.filter(
    (s) => s.stage === 'student_approval' || s.approvedUniversities.length > 0
  );

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1580px] mx-auto select-none">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <span>Students</span>
            <span>&gt;</span>
            <span>{student.name}</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">Student Approval</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Student Approval Module
          </h2>
          <p className="text-xs text-slate-500">
            Record student consent for shortlisted options and automatically handover to the Application Team
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Active Student:</label>
          <select
            value={student.id}
            onChange={(e) => {
              const found = students.find((s) => s.id === e.target.value);
              if (found) setSelectedStudent(found);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white shadow-xs focus:outline-none"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.countryInterest}) — {s.stage === 'student_approval' ? '⏳ Awaiting Approval' : '✅ Approved'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Student Header Banner ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-red-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900">{student.name}</h3>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  student.approvedUniversities.length > 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {student.approvedUniversities.length > 0 ? 'Approved by Student' : 'Awaiting Approval'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500 mt-1">
              <span>Lead ID: <strong className="text-slate-800">{student.leadId}</strong></span>
              <span>Mobile: <strong className="text-slate-800">{student.mobile}</strong></span>
              <span>Email: <strong className="text-slate-800">{student.email}</strong></span>
              <span>Target Country: <strong className="text-slate-800">{student.countryInterest}</strong></span>
            </div>
          </div>
        </div>

        {/* WhatsApp & Reminder Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Sending WhatsApp reminder with university options link to ${student.mobile}...`)}
            className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Send Reminder on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* ── Main Layout: Universities Selection on Left (8 cols) + Approval Consent & Handover on Right (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols): Shortlisted Universities Cards */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Recommended Universities for Student Selection ({student.shortlistedUniversities.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select the universities approved by the candidate to initiate official applications.
                </p>
              </div>

              <span className="text-xs font-bold text-[#e21b22]">
                {selectedUniIds.length} Selected for Application
              </span>
            </div>

            {student.shortlistedUniversities.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No universities shortlisted yet.</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Visit the University Shortlisting module to add recommended options.
                </p>
                <button
                  onClick={() => navigate('shortlisting', student.id)}
                  className="mt-3 px-3 py-1.5 rounded-xl bg-[#e21b22] text-white text-xs font-bold"
                >
                  Go to Shortlisting
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {student.shortlistedUniversities.map((uni) => {
                  const isChecked = selectedUniIds.includes(uni.id);
                  return (
                    <div
                      key={uni.id}
                      onClick={() => toggleSelectUni(uni.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/30 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs mt-0.5 shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-extrabold text-slate-900">{uni.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                              {uni.degreeType}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-slate-700 mt-0.5">
                            {uni.course} • {uni.city}, {uni.country}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-2">
                            <span>Tuition: <strong className="text-slate-800">{uni.tuitionFee}</strong></span>
                            <span>Credits: <strong className="text-emerald-700">{uni.credits}</strong></span>
                            <span>App Deadline: <strong className="text-[#e21b22]">{uni.deadline}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right sm:self-center shrink-0">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl inline-flex items-center gap-1 ${
                            isChecked
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isChecked ? '✓ Candidate Selected' : 'Click to Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Consent & Handover Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Candidate Consent &amp; Sign-off</h3>
                <p className="text-[10px] text-slate-400">Formal Student Authorization</p>
              </div>
            </div>

            {/* Checkbox consent */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={studentConfirmed}
                  onChange={(e) => setStudentConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-400 cursor-pointer"
                />
                <span className="leading-snug">
                  Student confirmed choices via WhatsApp/Email. Agrees to application fee &amp; university requirements.
                </span>
              </label>
            </div>

            {/* Additional Remarks */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Student Approval Remarks / Preferences
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Student prefers Padova as 1st priority and Rome as 2nd..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            {/* ── INTERLINKED PIPELINE STEP: Confirm & Transfer to Application Team ── */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={handleConfirmApproval}
                disabled={!studentConfirmed || selectedUniIds.length === 0}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-[#e21b22] hover:brightness-110 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Transfer to Application Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10.5px] text-slate-400 text-center leading-tight">
                Instantly spawns active application files for the Application Team dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Success Celebration Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">Student Approval Confirmed!</h3>
              <p className="text-xs text-slate-600 mt-1">
                <strong>{student.name}</strong>'s university choices ({selectedUniIds.length} programs) have been locked and transferred to the <strong>Application Team</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Transferred Applications:</div>
              {student.shortlistedUniversities
                .filter((u) => selectedUniIds.includes(u.id))
                .map((u) => (
                  <div key={u.id} className="font-bold text-slate-800">
                    • {u.name} ({u.course})
                  </div>
                ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Stay Here
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('applications', student.id);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#e21b22] hover:bg-[#c4151b] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-red-500/20"
              >
                <span>Go to Applications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

