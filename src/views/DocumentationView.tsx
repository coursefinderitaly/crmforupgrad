import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Download,
  Eye,
  Check,
  Send,
  Plus,
  MessageCircle,
  Mail,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Edit,
  X,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { DocumentItem } from '../types/crm';

export const DocumentationView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateDocumentStatus,
    requestMissingDocs,
    advanceToShortlisting,
    navigate,
    addStudentNote,
  } = useUpGradWorkflow();

  const [activeTab, setActiveTab] = useState<'documents' | 'options' | 'notes' | 'timeline'>('documents');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [rejectModalDoc, setRejectModalDoc] = useState<DocumentItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [newNote, setNewNote] = useState('');

  // Documentation queue: show all students, prioritizing those in documentation/enrolled stage
  const student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student selected.</div>;
  }

  // Calculate live counts
  const totalDocs = student.documents.length;
  const approvedCount = student.documents.filter((d) => d.status === 'Approved').length;
  const receivedCount = student.documents.filter((d) => ['Received', 'Approved', 'Under Review'].includes(d.status)).length;
  const pendingVerificationCount = student.documents.filter((d) => d.status === 'Under Review' || d.status === 'Received').length;
  const missingCount = student.documents.filter((d) => d.status === 'Pending' || d.status === 'Re-upload Required').length;
  const completionPercent = totalDocs > 0 ? Math.round((approvedCount / totalDocs) * 100) : 0;

  const handleApprove = (doc: DocumentItem) => {
    updateDocumentStatus(student.id, doc.id, 'Approved');
  };

  const handleReject = () => {
    if (!rejectModalDoc) return;
    updateDocumentStatus(student.id, rejectModalDoc.id, 'Rejected', rejectionReason || 'Document requires correction');
    setRejectModalDoc(null);
    setRejectionReason('');
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1580px] mx-auto select-none">
      {/* ── Top Header & Breadcrumb ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <span>Home</span>
            <span>&gt;</span>
            <span>Documentation</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">{student.name}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Documentation Module
          </h2>
          <p className="text-xs text-slate-500">
            Verify and complete student documents before university applications
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Active Dossier:</label>
          <select
            value={student.id}
            onChange={(e) => {
              const found = students.find((s) => s.id === e.target.value);
              if (found) setSelectedStudent(found);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#e21b22]/20"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.countryInterest}) — {s.documents.filter((d) => d.status === 'Approved').length}/{s.documents.length} Docs
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── 5 Top KPI Metric Cards (Exact Match of documentation.jpeg) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{receivedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Documents Received</div>
            <div className="text-[10px] font-bold text-blue-600">↑ 25%</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{pendingVerificationCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Pending Verification</div>
            <div className="text-[10px] font-bold text-amber-600">Action Required</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{approvedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Approved Documents</div>
            <div className="text-[10px] font-bold text-emerald-600">Verified 100%</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-rose-700 leading-tight">{missingCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Pending from Student</div>
            <div className="text-[10px] font-bold text-rose-600">Reminder Sent</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">
              {student.shortlistedUniversities.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">University Options</div>
            <div className="text-[10px] font-bold text-purple-600">Shortlisted</div>
          </div>
        </div>
      </div>

      {/* ── Student Header Banner with Document Completion Stepper ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-red-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">{student.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Active Dossier
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500 mt-1">
              <span>Lead ID: <strong className="text-slate-800">{student.leadId}</strong></span>
              <span>Country: <strong className="text-slate-800">{student.countryInterest}</strong></span>
              <span>Course: <strong className="text-slate-800">{student.courseInterest}</strong></span>
              <span>Intake: <strong className="text-slate-800">{student.intake}</strong></span>
            </div>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Document Completion</span>
            <span className="text-[#e21b22]">{approvedCount} / {totalDocs} ({completionPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#e21b22] to-rose-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Layout: Checklist on Left (8 cols) + Info & Actions on Right (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            {/* Sub-tabs header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'documents'
                      ? 'bg-[#e21b22] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Document Checklist ({student.documents.length})
                </button>
                <button
                  onClick={() => setActiveTab('options')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'options'
                      ? 'bg-[#e21b22] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  University Options ({student.shortlistedUniversities.length})
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'notes'
                      ? 'bg-[#e21b22] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Verification Notes
                </button>
              </div>

              <button
                onClick={() => alert('Downloading official student documentation checklist PDF...')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist</span>
              </button>
            </div>

            {/* Sub-tab 1: Document Checklist Table */}
            {activeTab === 'documents' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-2 w-8 text-center">#</th>
                      <th className="py-2.5 px-3">Document</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Submitted On</th>
                      <th className="py-2.5 px-3">Verified By</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {student.documents.map((doc, idx) => (
                      <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-2 text-center text-slate-400 text-[11px]">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {doc.name}
                          {doc.rejectionReason && (
                            <div className="text-[10px] text-rose-600 font-normal mt-0.5">
                              Reason: {doc.rejectionReason}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                              doc.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : doc.status === 'Received'
                                  ? 'bg-blue-100 text-blue-800'
                                  : doc.status === 'Under Review'
                                    ? 'bg-amber-100 text-amber-800'
                                    : doc.status === 'Re-upload Required' || doc.status === 'Rejected'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {doc.submittedOn || '—'}
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-[11px]">
                          {doc.verifiedBy || '—'}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* View Preview Button */}
                            <button
                              onClick={() => setPreviewDoc(doc)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </button>

                            {/* Verify / Approve Action */}
                            {doc.status !== 'Approved' && (
                              <button
                                onClick={() => handleApprove(doc)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Verify</span>
                              </button>
                            )}

                            {/* Request / Reject */}
                            {doc.status !== 'Approved' && (
                              <button
                                onClick={() => setRejectModalDoc(doc)}
                                className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                              >
                                Request
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sub-tab 2: University Options */}
            {activeTab === 'options' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Candidate Universities Recommended by Documentation Team
                  </span>
                  <button
                    onClick={() => navigate('shortlisting', student.id)}
                    className="text-xs font-bold text-[#e21b22] hover:underline flex items-center gap-1"
                  >
                    <span>Manage in Shortlisting Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-2">
                  {student.shortlistedUniversities.map((uni) => (
                    <div
                      key={uni.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{uni.name}</div>
                        <div className="text-[11px] text-slate-500">{uni.course} • {uni.country}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {uni.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">Deadline: {uni.deadline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-1">Dossier Notes</div>
                  <p className="whitespace-pre-line">{student.internalNotes}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add documentation verification comment..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 p-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <button
                    onClick={() => {
                      if (newNote.trim()) {
                        addStudentNote(student.id, newNote);
                        setNewNote('');
                      }
                    }}
                    className="px-3 py-2 bg-[#e21b22] text-white rounded-xl text-xs font-bold"
                  >
                    Post Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Profile Summary & Handover Action (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Student Profile Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Student Profile Summary
              </span>
              <button
                onClick={() => navigate('students', student.id)}
                className="text-[#e21b22] font-semibold text-[11px] flex items-center gap-0.5"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Name:</span>
                <span className="font-bold text-slate-800">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lead ID:</span>
                <span className="font-mono font-bold text-slate-800">{student.leadId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mobile:</span>
                <span className="font-semibold text-slate-800">{student.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[150px]">{student.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Country:</span>
                <span className="font-bold text-slate-800">{student.countryInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Preferred Course:</span>
                <span className="font-semibold text-slate-800 text-right">{student.courseInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Intake:</span>
                <span className="font-semibold text-slate-800">{student.intake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Stage:</span>
                <span className="font-bold text-purple-700">{student.statusText}</span>
              </div>
            </div>
          </div>

          {/* Missing Documents Alert Card */}
          {missingCount > 0 && (
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Missing Documents ({missingCount})</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {student.documents
                  .filter((d) => d.status === 'Pending' || d.status === 'Re-upload Required')
                  .slice(0, 3)
                  .map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-rose-100"
                    >
                      <span className="font-semibold text-slate-800 truncate">{d.name}</span>
                      <button
                        onClick={() => {
                          requestMissingDocs(student.id);
                          alert(`Automated WhatsApp & Email checklist dispatched for ${d.name}!`);
                        }}
                        className="text-[10px] font-bold text-rose-600 hover:text-rose-800 shrink-0 ml-2"
                      >
                        Request
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Assigned Executive & Target Completion */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5 text-xs">
            <div className="flex items-center gap-3">
              <img
                src="/avatars/priya.png"
                alt="Priya Singh"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                  Documentation Officer
                </span>
                <span className="font-bold text-slate-900">{student.assignedDocExecutive}</span>
                <span className="text-[11px] text-slate-500 block">+91 87654 32109</span>
              </div>
            </div>
          </div>

          {/* ── Key Interlinked Pipeline Action: Promote to University Shortlisting ── */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-300" />
              <div>
                <h4 className="text-xs font-bold">Step 3: University Shortlisting</h4>
                <p className="text-[10px] text-purple-200">Promote student to university matching</p>
              </div>
            </div>

            <p className="text-xs text-purple-100 leading-snug">
              When documents are verified, transfer the student dossier to the University Shortlisting module to match against European partner universities.
            </p>

            <button
              onClick={() => {
                advanceToShortlisting(student.id);
                navigate('shortlisting', student.id);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Promote to University Shortlisting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Document Preview Modal ── */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{previewDoc.name}</h3>
                <span className="text-xs text-slate-500">Student: {student.name}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-60 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 p-4 text-center">
              <FileCheck2 className="w-12 h-12 text-[#e21b22] mb-2" />
              <p className="text-xs font-bold text-slate-700">Official Document Digital Pouch</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Verified high-resolution scan on file in secure Presume cloud storage.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              {previewDoc.status !== 'Approved' && (
                <button
                  onClick={() => {
                    handleApprove(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify &amp; Approve</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Document Rejection/Request Modal ── */}
      {rejectModalDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Request Re-upload / Correction</h3>
              <button onClick={() => setRejectModalDoc(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Specify the reason why <strong>{rejectModalDoc.name}</strong> is rejected or requires re-upload:
            </p>

            <textarea
              rows={3}
              placeholder="e.g. Name mismatch with 10th mark sheet, or passport page 2 blur..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-400 focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalDoc(null)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Send Re-upload Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

