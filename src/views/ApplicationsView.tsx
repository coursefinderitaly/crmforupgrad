import React, { useState } from 'react';
import {
  Send,
  FileCheck2,
  Clock,
  Award,
  CheckCircle2,
  Building2,
  Calendar,
  ExternalLink,
  Plus,
  Upload,
  ArrowRight,
  Eye,
  Check,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { ApplicationRecord } from '../types/crm';

export const ApplicationsView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    advanceApplicationStep,
    issueOfferLetter,
  } = useUpGradWorkflow();

  const student = selectedStudent || students[0];

  const [activeAppId, setActiveAppId] = useState<string>('');
  const [showOfferModal, setShowOfferModal] = useState(false);

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student selected.</div>;
  }

  // Active application selected in right panel
  const activeApp: ApplicationRecord | undefined =
    student.applications.find((a) => a.id === activeAppId) ||
    student.applications[0];

  // Global counts across student applications
  const readyCount = student.applications.length;
  const draftCount = student.applications.filter((a) => a.currentStep <= 2).length;
  const submittedCount = student.applications.filter((a) => a.currentStep === 4).length;
  const underReviewCount = student.applications.filter((a) => a.currentStep === 5).length;
  const offerCount = student.applications.filter((a) => a.currentStep === 6).length;

  const appSteps = [
    { step: 1, label: '1. Draft' },
    { step: 2, label: '2. Form Completed' },
    { step: 3, label: '3. Docs Uploaded' },
    { step: 4, label: '4. Submitted' },
    { step: 5, label: '5. Under Review' },
    { step: 6, label: '6. Offer' },
  ];

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1580px] mx-auto select-none">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <span>Home</span>
            <span>&gt;</span>
            <span>Applications</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">Application Team Dashboard</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Application Team Dashboard
          </h2>
          <p className="text-xs text-slate-500">
            Manage student applications, submissions, university portal tracking, and admission decisions
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Applicant:</label>
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
                {s.name} ({s.countryInterest}) — {s.applications.length} Applications
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Student Header Banner (Exact Match of applications.jpeg) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#087cf5] to-cyan-500 text-white font-black text-base flex items-center justify-center shadow-xs">
            {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900">{student.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Application in Progress
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Student ID: <span className="font-mono font-bold text-slate-700">{student.leadId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Country</span>
            <span className="font-bold text-slate-900">{student.countryInterest}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Preferred Course</span>
            <span className="font-bold text-slate-900">{student.courseInterest}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Intake</span>
            <span className="font-bold text-slate-900">{student.intake}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Selected Universities</span>
            <span className="font-bold text-[#e21b22] text-sm">{student.applications.length} Active</span>
          </div>
        </div>
      </div>

      {/* ── 4 Top KPI Cards Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{readyCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Applications Created</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{draftCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">In Preparation / Draft</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{submittedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Submitted to Portals</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-purple-700 leading-tight">{offerCount}</div>
            <div className="text-[11px] font-semibold text-slate-500">Offer Letters Received</div>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Applications Table (8 cols) + Detail & Stepper Drawer (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols): Applications Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">
                University Applications ({student.name})
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {student.applications.length} Records Active
              </span>
            </div>

            {student.applications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-bold">No applications active for this student.</p>
                <p className="text-[11px]">Proceed to Student Approval module to approve universities first.</p>
              </div>
            ) : (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-3">University</th>
                      <th className="py-2.5 px-3">Course</th>
                      <th className="py-2.5 px-3">Deadline</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Assigned Executive</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {student.applications.map((app) => {
                      const isSelected = activeApp?.id === app.id;
                      return (
                        <tr
                          key={app.id}
                          onClick={() => setActiveAppId(app.id)}
                          className={`hover:bg-red-50/30 transition-colors cursor-pointer ${
                            isSelected ? 'bg-red-50/50' : ''
                          }`}
                        >
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 leading-tight">{app.universityName}</div>
                            <div className="text-[10px] text-slate-400">{app.country}</div>
                          </td>

                          <td className="py-3 px-3 max-w-[130px] truncate" title={app.course}>
                            {app.course}
                          </td>

                          <td className="py-3 px-3 text-[#e21b22] font-semibold">{app.deadline}</td>

                          <td className="py-3 px-3">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                                app.currentStep === 6
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.currentStep === 5
                                    ? 'bg-purple-100 text-purple-800'
                                    : app.currentStep === 4
                                      ? 'bg-cyan-100 text-cyan-800'
                                      : app.currentStep === 3
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-slate-600">{app.assignedExecutive}</td>

                          <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setActiveAppId(app.id)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                              >
                                View
                              </button>

                              {/* Progress Step Button */}
                              {app.currentStep < 6 && (
                                <button
                                  onClick={() =>
                                    advanceApplicationStep(
                                      student.id,
                                      app.id,
                                      (app.currentStep + 1) as any
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-[#e21b22] hover:bg-[#c4151b] text-white text-xs font-bold"
                                >
                                  {app.currentStep === 1
                                    ? 'Complete Form'
                                    : app.currentStep === 2
                                      ? 'Upload Docs'
                                      : app.currentStep === 3
                                        ? 'Submit'
                                        : app.currentStep === 4
                                          ? 'Under Review'
                                          : 'Issue Offer'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions Footer Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
            <span className="text-xs font-bold text-slate-800">Application Quick Actions:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Starting new application draft...')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start Application</span>
              </button>
              <button
                onClick={() => alert('Uploading dossiers to university portal...')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Documents</span>
              </button>
              <button
                onClick={() => {
                  if (activeApp) {
                    advanceApplicationStep(student.id, activeApp.id, 6);
                    setShowOfferModal(true);
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Issue Offer Letter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Selected Application Details & 6-Step Stepper */}
        {activeApp && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4 text-xs">
            {/* Header with University Info */}
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Selected Application
                </span>
                <span className="font-mono text-[10.5px] font-bold text-blue-600">
                  {activeApp.applicationNumber || 'UG-APP-2026'}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">{activeApp.universityName}</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">{activeApp.course} • {activeApp.country}</p>
            </div>

            {/* ── 6-Stage Progress Stepper ── */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block text-[11px]">
                Application Lifecycle (Step {activeApp.currentStep} of 6)
              </span>

              <div className="space-y-1.5">
                {appSteps.map((s) => {
                  const isDone = activeApp.currentStep >= s.step;
                  const isCurrent = activeApp.currentStep === s.step;
                  return (
                    <div
                      key={s.step}
                      onClick={() =>
                        advanceApplicationStep(student.id, activeApp.id, s.step as any)
                      }
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-red-50 border-[#e21b22] text-[#e21b22] font-bold shadow-xs'
                          : isDone
                            ? 'bg-slate-50 border-slate-200 text-slate-800 font-semibold'
                            : 'bg-white border-slate-100 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone ? 'bg-[#e21b22] text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : s.step}
                        </div>
                        <span>{s.label}</span>
                      </div>

                      {isCurrent && (
                        <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded bg-[#e21b22] text-white uppercase">
                          Current
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Requirements Checklist */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-bold text-slate-800 block text-[11px]">
                Submission Dossier Requirements
              </span>

              <div className="space-y-1 text-slate-600 text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span>Passport (Bio Page)</span>
                  <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span>Academic Transcripts</span>
                  <span className="text-emerald-600 font-bold">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span>Statement of Purpose (SOP)</span>
                  <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                  <span>Recommendation Letters (2)</span>
                  <span className="text-emerald-600 font-bold">✓ On File</span>
                </div>
              </div>
            </div>

            {/* Advance Step Action */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {activeApp.currentStep < 6 ? (
                <button
                  onClick={() =>
                    advanceApplicationStep(
                      student.id,
                      activeApp.id,
                      (activeApp.currentStep + 1) as any
                    )
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-[#e21b22] hover:bg-[#c4151b] text-white font-bold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Advance to Step {activeApp.currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold">
                  🎉 Official Offer Letter Received!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Offer Letter Celebratory Modal ── */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Offer Letter Issued! 🎉</h3>
              <p className="text-xs text-slate-600 mt-1">
                Congratulations! <strong>{student.name}</strong> has received an official Admission Offer Letter for <strong>{activeApp?.universityName}</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 text-left space-y-1">
              <div>• Course: <strong>{activeApp?.course}</strong></div>
              <div>• Intake: <strong>{student.intake}</strong></div>
              <div>• Application Ref: <strong>{activeApp?.applicationNumber}</strong></div>
            </div>

            <button
              onClick={() => setShowOfferModal(false)}
              className="w-full py-2.5 bg-[#e21b22] text-white rounded-xl text-xs font-bold"
            >
              Continue Management
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

