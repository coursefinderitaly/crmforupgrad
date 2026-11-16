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
  ChevronRight,
  Globe,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { ApplicationRecord } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const ApplicationsView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    advanceApplicationStep,
    issueOfferLetter,
    updateStudent,
    navigate,
  } = useUpGradWorkflow();

  const student = selectedStudent || students[0];

  const [activeAppId, setActiveAppId] = useState<string>('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showNewAppModal, setShowNewAppModal] = useState(false);

  // New Application Form State
  const [newUniName, setNewUniName] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newCountry, setNewCountry] = useState('Italy 🇮🇹');
  const [newDeadline, setNewDeadline] = useState('31 Mar 2026');
  const [newFee, setNewFee] = useState('€30');
  const [newPortalUrl, setNewPortalUrl] = useState('https://delphi.uniroma2.it');
  const [newNotes, setNewNotes] = useState('');

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
    { step: 1, label: '1. Draft Form' },
    { step: 2, label: '2. Form Completed' },
    { step: 3, label: '3. Docs Uploaded' },
    { step: 4, label: '4. Submitted to Portal' },
    { step: 5, label: '5. Under Review' },
    { step: 6, label: '6. Offer Received' },
  ];

  // Handler to add a new university application
  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUniName.trim() || !newCourse.trim()) return;

    const newApp: ApplicationRecord = {
      id: `app-custom-${Date.now()}`,
      universityId: `uni-custom-${Date.now()}`,
      universityName: newUniName.trim(),
      course: newCourse.trim(),
      country: newCountry,
      deadline: newDeadline,
      applicationFee: newFee,
      assignedExecutive: 'Rohan Shetty',
      lastUpdated: 'Just now',
      currentStep: 1,
      status: 'Draft',
      applicationNumber: `UG-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      portalUrl: newPortalUrl,
      notes: newNotes,
    };

    updateStudent(student.id, {
      applications: [newApp, ...student.applications],
    });

    setActiveAppId(newApp.id);
    setShowNewAppModal(false);
    setNewUniName('');
    setNewCourse('');
    setNewNotes('');
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="applications"
        stageNumber={5}
        totalStages={12}
        title="University Applications Submission"
        subtitle="Manage student applications, portal submissions, tracking numbers, and admissions progression"
        icon={Send}
        iconColor="text-cyan-600"
        iconBg="bg-cyan-50"
        previousRoute={{ id: 'student-approval', label: 'Student Approval' }}
        nextRoute={{ id: 'offer-letters', label: 'Offer Letters' }}
        advanceButtonText="Proceed to Offer Letters →"
        customAction={
          <button
            type="button"
            onClick={() => setShowNewAppModal(true)}
            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        }
      />

      {/* ── 2. Student Dossier Banner ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#087cf5] to-cyan-500 text-white font-black text-base flex items-center justify-center shadow-xs shrink-0">
            {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 truncate">{student.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 shrink-0">
                Application Stage Active
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Lead ID: <strong className="font-mono text-slate-700">{student.leadId}</strong></span>
              <span>&bull;</span>
              <span>Target: <strong className="text-slate-700">{student.countryInterest}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Target Program</span>
            <span className="font-bold text-slate-900">{student.courseInterest}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Intake</span>
            <span className="font-bold text-slate-900">{student.intake}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Total Active Submissions</span>
            <span className="font-black text-[#087cf5] text-sm">{student.applications.length} Universities</span>
          </div>
        </div>
      </div>

      {/* ── 3. Top Metrics Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{readyCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Applications Created</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{draftCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">In Preparation / Draft</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{submittedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Submitted to Portals</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">{offerCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Offers Issued 🎉</div>
          </div>
        </div>
      </div>

      {/* ── 4. Main Layout: Applications Table (8 cols) + Detail & Stepper Drawer (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols): Applications Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Applications Dossier ({student.name})
                </span>
                <p className="text-[11px] text-slate-500">
                  Click any row to inspect status, portal credentials, and advance lifecycle steps
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewAppModal(true)}
                className="text-xs font-bold text-[#087cf5] hover:text-blue-700 flex items-center gap-1 bg-blue-50/70 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New University Application</span>
              </button>
            </div>

            {student.applications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-3">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-slate-800">No applications created yet for {student.name}.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    You can either approve shortlisted options in Stage 4 (Student Approval) or add a direct application below.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewAppModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#087cf5] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Application</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-3">University</th>
                      <th className="py-2.5 px-3">Course</th>
                      <th className="py-2.5 px-3">Deadline</th>
                      <th className="py-2.5 px-3">Lifecycle Step</th>
                      <th className="py-2.5 px-3">Assigned Staff</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {student.applications.map((app) => {
                      const isSelected = activeApp?.id === app.id;
                      return (
                        <tr
                          key={app.id}
                          onClick={() => setActiveAppId(app.id)}
                          className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50/50 ring-1 ring-blue-200/50' : ''
                          }`}
                        >
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 leading-tight">{app.universityName}</div>
                            <div className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>{app.country}</span>
                              {app.portalUrl && (
                                <a
                                  href={app.portalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#087cf5] hover:underline flex items-center gap-0.5"
                                  title="Open University Portal"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3 max-w-[140px] truncate" title={app.course}>
                            <div className="font-semibold text-slate-800">{app.course}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{app.applicationNumber || 'N/A'}</div>
                          </td>

                          <td className="py-3 px-3 text-amber-700 font-bold whitespace-nowrap">
                            {app.deadline}
                          </td>

                          <td className="py-3 px-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap border ${
                                app.currentStep === 6
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : app.currentStep === 5
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : app.currentStep === 4
                                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                      : app.currentStep === 3
                                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                                        : 'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              Step {app.currentStep}: {app.status}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                            {app.assignedExecutive}
                          </td>

                          <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {app.currentStep < 6 ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    advanceApplicationStep(
                                      student.id,
                                      app.id,
                                      (app.currentStep + 1) as any
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-[#087cf5] hover:bg-blue-600 text-white text-[11px] font-bold shadow-2xs transition-all cursor-pointer"
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
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => navigate('offer-letters', student.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <Award className="w-3 h-3" />
                                  <span>View Offer</span>
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
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Application Pipeline Actions:</span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">&bull; 1-click step progressions &amp; offer generation</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewAppModal(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>+ Add Uni</span>
              </button>
              {activeApp && activeApp.currentStep < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    advanceApplicationStep(student.id, activeApp.id, 6);
                    setShowOfferModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Issue Official Offer Letter</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate('offer-letters', student.id)}
                className="px-3 py-1.5 rounded-xl bg-[#087cf5] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
              >
                <span>Go to Offer Letters</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Selected Application Details & 6-Step Stepper */}
        {activeApp && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4 text-xs">
            {/* Header with University Info */}
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Selected Dossier
                </span>
                <span className="font-mono text-[11px] font-bold text-[#087cf5] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {activeApp.applicationNumber || 'UG-APP-2026'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">{activeApp.universityName}</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">{activeApp.course} &bull; {activeApp.country}</p>
              
              {activeApp.portalUrl && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">University Portal:</span>
                  <a
                    href={activeApp.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#087cf5] hover:underline flex items-center gap-1"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* ── 6-Stage Progress Stepper ── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide">
                  Lifecycle Progress
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  Step {activeApp.currentStep} of 6
                </span>
              </div>

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
                          ? 'bg-blue-50 border-[#087cf5] text-[#087cf5] font-bold shadow-2xs'
                          : isDone
                            ? 'bg-slate-50 border-slate-200 text-slate-800 font-semibold'
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isDone ? 'bg-[#087cf5] text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : s.step}
                        </div>
                        <span className="truncate">{s.label}</span>
                      </div>

                      {isCurrent && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#087cf5] text-white uppercase tracking-wider shrink-0">
                          Active
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Requirements Checklist */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-extrabold text-slate-800 block text-[11px] uppercase tracking-wide">
                Submission Verification Checklist
              </span>

              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span>Passport (Bio &amp; Address Pages)</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Attached</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span>Degree Certificate &amp; Transcripts</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span>Statement of Purpose (SOP)</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tailored</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span>Academic Reference Letters (2 LORs)</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Signed</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Advance Step Action CTA */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {activeApp.currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() =>
                    advanceApplicationStep(
                      student.id,
                      activeApp.id,
                      (activeApp.currentStep + 1) as any
                    )
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-[#087cf5] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Advance Application to Step {activeApp.currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold space-y-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Official Offer Letter Issued!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('offer-letters', student.id)}
                    className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Review in Offer Letters Stage &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── New Application Modal ── */}
      {showNewAppModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Add University Application</h3>
                  <p className="text-xs text-slate-500">Applicant: {student.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewAppModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University of Milan (UniMi) / Sapienza"
                  value={newUniName}
                  onChange={(e) => setNewUniName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program / Degree *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MSc Data Science & AI"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country</label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5] bg-white"
                  >
                    <option value="Italy 🇮🇹">Italy 🇮🇹</option>
                    <option value="Germany 🇩🇪">Germany 🇩🇪</option>
                    <option value="United Kingdom 🇬🇧">United Kingdom 🇬🇧</option>
                    <option value="France 🇫🇷">France 🇫🇷</option>
                    <option value="Ireland 🇮🇪">Ireland 🇮🇪</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deadline Date</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Application Fee</label>
                  <input
                    type="text"
                    value={newFee}
                    onChange={(e) => setNewFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Portal URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newPortalUrl}
                  onChange={(e) => setNewPortalUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Special Notes / Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Add any specific requirements (IELTS waiver, GRE, apostille needed)..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewAppModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087cf5] text-white font-bold hover:bg-blue-600 shadow-sm"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Offer Letter Celebratory Modal ── */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <Award className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Offer Letter Issued! 🎉</h3>
              <p className="text-xs text-slate-600 mt-1">
                Congratulations! <strong>{student.name}</strong> has received an official Admission Offer Letter for <strong>{activeApp?.universityName}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 text-left space-y-1">
              <div>&bull; Program: <strong>{activeApp?.course}</strong></div>
              <div>&bull; Intake: <strong>{student.intake}</strong></div>
              <div>&bull; Application Ref: <strong>{activeApp?.applicationNumber}</strong></div>
              <div>&bull; Pipeline Status: <strong>Offer Received (Stage 6)</strong></div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowOfferModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOfferModal(false);
                  navigate('offer-letters', student.id);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Go to Offer Letters Stage &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
