import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink,
  Plus,
  ArrowRight,
  Eye,
  Check,
  X,
  Sparkles,
  ChevronRight,
  Upload,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { OfferLetterItem, Student } from '../types/crm';
import { StageWorkflowNav } from '../components/workflow/StageWorkflowNav';

export const OfferLettersView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateStudent,
    addOfferLetter,
    updateOfferLetter,
    confirmFinalUniversity,
    advanceToStage,
    navigate,
  } = useUpGradWorkflow();

  const student: Student = selectedStudent || students[0];

  const [selectedOfferId, setSelectedOfferId] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [modalOffer, setModalOffer] = useState<OfferLetterItem | null>(null);

  // New offer form state
  const [uniName, setUniName] = useState('');
  const [course, setCourse] = useState(student?.courseInterest || '');
  const [country, setCountry] = useState(student?.countryInterest || 'Italy 🇮🇹');
  const [intake, setIntake] = useState(student?.intake || 'Sept 2026');
  const [offerType, setOfferType] = useState<'Unconditional' | 'Conditional'>('Unconditional');
  const [deadline, setDeadline] = useState('30 Nov 2026');
  const [depositAmount, setDepositAmount] = useState('€150');
  const [conditions, setConditions] = useState('');
  const [scholarshipGrant, setScholarshipGrant] = useState('€2,000 Dean Waiver');

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No applicant selected.</div>;
  }

  // Fallback default offers for realistic immediate interaction if none recorded
  const offers: OfferLetterItem[] =
    student.offerLetters && student.offerLetters.length > 0
      ? student.offerLetters
      : [
          {
            id: 'off-bologna',
            universityName: student.countryInterest.includes('UK')
              ? 'Liverpool John Moores University'
              : student.countryInterest.includes('Germany')
                ? 'IU International University of Applied Sciences'
                : 'University of Bologna',
            course: student.courseInterest || 'MSc Advanced Engineering',
            country: student.countryInterest || 'Italy 🇮🇹',
            intake: student.intake || 'Sept 2026',
            type: 'Conditional',
            status: 'Received',
            conditions: 'Provide final degree transcripts and valid IELTS score card by 30 June 2026',
            issuedDate: '10 Oct 2025',
            deadline: '30 Nov 2026',
            depositAmount: '€150',
            depositPaid: false,
            scholarshipAwarded: 'Eligible for 100% Regional DSU Waiver',
          },
          {
            id: 'off-padova',
            universityName: 'University of Padova',
            course: 'MSc Computer Science & Data Analytics',
            country: 'Italy 🇮🇹',
            intake: 'Sept 2026',
            type: 'Unconditional',
            status: 'Received',
            conditions: 'Direct Admission via upGrad Partner Articulation',
            issuedDate: '01 Oct 2025',
            deadline: '15 Dec 2026',
            depositAmount: '€150',
            depositPaid: false,
            scholarshipAwarded: 'Padova Excellence Merit Grant (€8,000/yr)',
          },
        ];

  const activeOffer = offers.find((o) => o.id === selectedOfferId) || offers[0];

  // KPI counts
  const totalOffers = offers.length;
  const unconditionalCount = offers.filter((o) => o.type === 'Unconditional').length;
  const conditionalCount = offers.filter((o) => o.type === 'Conditional').length;
  const acceptedCount = offers.filter((o) => o.status === 'Accepted').length;

  const handleAddNewOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uniName.trim() || !course.trim()) return;

    addOfferLetter(student.id, {
      universityName: uniName.trim(),
      course: course.trim(),
      country,
      intake,
      type: offerType,
      status: 'Received',
      conditions: offerType === 'Conditional' ? conditions || 'Subject to document submission' : 'None (Direct Admission)',
      issuedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      deadline,
      depositAmount,
      scholarshipAwarded: scholarshipGrant,
    });

    setShowAddModal(false);
    setUniName('');
    setConditions('');
  };

  const handleAcceptOffer = (offer: OfferLetterItem) => {
    // 1. Update this offer to Accepted
    updateOfferLetter(student.id, offer.id, { status: 'Accepted' });

    // 2. Set as Final University in student dossier
    confirmFinalUniversity(student.id, {
      universityName: offer.universityName,
      course: offer.course,
      country: offer.country,
      city: offer.country.includes('Italy') ? 'Padova / Rome' : 'Berlin',
      intake: offer.intake,
      tuitionFee: '€2,400 / yr',
      depositAmount: offer.depositAmount,
      depositStatus: 'Pending',
      studentAgreementSigned: true,
      acceptanceLetterReceived: true,
      portalCredentialsCreated: true,
      notes: `Offer accepted from ${offer.universityName}. Proceeding to seat deposit payment.`,
    });

    // 3. Promote stage to final_university
    advanceToStage(
      student.id,
      'final_university',
      `Student accepted offer from ${offer.universityName}! Promoted to Final University Selection.`
    );

    // 4. Navigate to final university stage
    navigate('final-university', student.id);
  };

  const handleOpenPdf = (offer: OfferLetterItem) => {
    setModalOffer(offer);
    setShowPdfModal(true);
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Reusable Workflow Navigation Header ── */}
      <StageWorkflowNav
        currentStageId="offer-letters"
        stageNumber={6}
        totalStages={12}
        title="Official Offer Letters Received"
        subtitle="Review admission offers, condition fulfillment, tuition deposit requirements, and student acceptance decisions"
        icon={Award}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        previousRoute={{ id: 'applications', label: 'Applications' }}
        nextRoute={{ id: 'final-university', label: 'Final University' }}
        advanceButtonText="Confirm Final University →"
        onAdvanceStage={() => {
          if (activeOffer) {
            handleAcceptOffer(activeOffer);
          } else {
            navigate('final-university', student.id);
          }
        }}
        customAction={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Offer</span>
          </button>
        }
      />

      {/* ── 2. Top Metrics Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{totalOffers}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Total Offers Received</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{unconditionalCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Unconditional Offers</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{conditionalCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Conditional Offers</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-[#087cf5] leading-tight">{acceptedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Accepted &amp; Finalized</div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Split View: Offers Roster (8 cols) + Offer Inspection Drawer (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols): Offers Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Admission Offers for {student.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Compare conditional terms, tuition deposits, and scholarship awards
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Offer Letter</span>
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">University</th>
                    <th className="py-2.5 px-3">Program</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Deposit Deadline</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {offers.map((offer) => {
                    const isSelected = activeOffer?.id === offer.id;
                    const isAccepted = offer.status === 'Accepted';
                    return (
                      <tr
                        key={offer.id}
                        onClick={() => setSelectedOfferId(offer.id)}
                        className={`hover:bg-emerald-50/30 transition-colors cursor-pointer ${
                          isSelected ? 'bg-emerald-50/50 ring-1 ring-emerald-200/60' : ''
                        }`}
                      >
                        <td className="py-3 px-3">
                          <div className="font-extrabold text-slate-900 leading-tight">
                            {offer.universityName}
                          </div>
                          <div className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{offer.country}</span>
                            <span>&bull;</span>
                            <span>Intake: {offer.intake}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3 max-w-[150px] truncate" title={offer.course}>
                          <div className="font-semibold text-slate-800">{offer.course}</div>
                          {offer.scholarshipAwarded && (
                            <div className="text-[10px] text-emerald-700 font-bold truncate">
                              ★ {offer.scholarshipAwarded}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                              offer.type === 'Unconditional'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {offer.type}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="font-bold text-slate-800">{offer.deadline}</div>
                          <div className="text-[10px] text-slate-400">Deposit: {offer.depositAmount}</div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isAccepted
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {isAccepted ? '✓ Accepted' : offer.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenPdf(offer)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-[11px] font-bold flex items-center gap-1 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                              title="View Official Offer PDF"
                            >
                              <FileText className="w-3 h-3 text-blue-600" />
                              <span>View PDF</span>
                            </button>

                            {!isAccepted ? (
                              <button
                                type="button"
                                onClick={() => handleAcceptOffer(offer)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                                <span>Accept &amp; Confirm</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => navigate('final-university', student.id)}
                                className="px-2.5 py-1 rounded-lg bg-[#087cf5] hover:bg-blue-600 text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                              >
                                <span>Go to Final Uni &rarr;</span>
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
          </div>

          {/* Quick Actions Footer Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Next Stage Workflow:</span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Accepting an offer locks in the institution and transfers the lead to Stage 7 (Final University &amp; Seat Deposit)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('applications', student.id)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
              >
                &larr; Back to Applications
              </button>
              <button
                type="button"
                onClick={() => {
                  if (activeOffer) {
                    handleAcceptOffer(activeOffer);
                  } else {
                    navigate('final-university', student.id);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-[#087cf5] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
              >
                <span>Proceed to Final University</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Selected Offer Detailed Dossier */}
        {activeOffer && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Admission Dossier
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    activeOffer.type === 'Unconditional'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {activeOffer.type} Offer
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                {activeOffer.universityName}
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {activeOffer.course} &bull; {activeOffer.country}
              </p>
            </div>

            {/* Offer Key Parameters */}
            <div className="space-y-2">
              <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                Offer Specifications
              </span>

              <div className="space-y-1.5 text-slate-700">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Issued On:</span>
                  <span className="font-bold text-slate-900">{activeOffer.issuedDate}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Deposit Deadline:</span>
                  <span className="font-extrabold text-amber-700">{activeOffer.deadline}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Tuition Seat Deposit:</span>
                  <span className="font-extrabold text-slate-900">{activeOffer.depositAmount}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-200 text-emerald-900">
                  <span className="font-semibold">Scholarship Grant:</span>
                  <span className="font-extrabold">{activeOffer.scholarshipAwarded || 'Eligible for DSU Waiver'}</span>
                </div>
              </div>
            </div>

            {/* Conditions Section */}
            {activeOffer.conditions && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide block">
                  Admission Conditions
                </span>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 inline mr-1 -mt-0.5" />
                  <span>{activeOffer.conditions}</span>
                </div>
              </div>
            )}

            {/* Actions for this Offer */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => handleOpenPdf(activeOffer)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Download Official Offer Letter (PDF)</span>
              </button>

              {activeOffer.status !== 'Accepted' ? (
                <button
                  type="button"
                  onClick={() => handleAcceptOffer(activeOffer)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Offer &amp; Advance to Final University</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold">
                  ✓ This Offer has been Accepted by {student.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Add Offer Letter Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Record Offer Letter</h3>
                  <p className="text-xs text-slate-500">Applicant: {student.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewOffer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University of Padova / IU Germany"
                  value={uniName}
                  onChange={(e) => setUniName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program / Degree *</label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Type</label>
                  <select
                    value={offerType}
                    onChange={(e) => setOfferType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5] bg-white font-semibold"
                  >
                    <option value="Unconditional">Unconditional (Direct)</option>
                    <option value="Conditional">Conditional (Prerequisites)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Response Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seat Deposit Required</label>
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Scholarship / Merit Grant Note</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Regional DSU Tuition Waiver or €2,000 Dean Grant"
                  value={scholarshipGrant}
                  onChange={(e) => setScholarshipGrant(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                />
              </div>

              {offerType === 'Conditional' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Conditions to Fulfill</label>
                  <textarea
                    rows={2}
                    placeholder="Specify conditions (e.g. Minimum 65% in final year, IELTS 6.5 TRF)..."
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#087cf5]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-sm"
                >
                  Save Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Official Offer PDF Viewer Modal ── */}
      {showPdfModal && modalOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Official Admission Letter</h3>
                  <p className="text-xs text-slate-500">{modalOffer.universityName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Official Letterhead */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs font-serif text-slate-800 shadow-inner">
              <div className="flex justify-between items-start border-b border-slate-300 pb-3">
                <div>
                  <h4 className="font-bold text-sm tracking-wide text-slate-900">{modalOffer.universityName}</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Office of International Admissions &bull; Registrar Directorate</p>
                </div>
                <div className="text-right text-[10.5px] font-sans text-slate-500">
                  <div>Ref: <strong>ITA/ADM/2026/0942</strong></div>
                  <div>Date: <strong>{modalOffer.issuedDate}</strong></div>
                </div>
              </div>

              <div className="space-y-2 font-sans text-slate-700">
                <p>Dear <strong>{student.name}</strong>,</p>
                <p>
                  We are pleased to inform you that you have been accepted for admission to the{' '}
                  <strong>{modalOffer.course}</strong> program starting in <strong>{modalOffer.intake}</strong> at{' '}
                  <strong>{modalOffer.universityName}</strong> ({modalOffer.country}).
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 font-mono text-[11px]">
                  <div>• Admission Type: <strong>{modalOffer.type}</strong></div>
                  <div>• Conditions: {modalOffer.conditions || 'None (Direct Admission)'}</div>
                  <div>• Seat Deposit Due: <strong>{modalOffer.depositAmount}</strong> (by {modalOffer.deadline})</div>
                  <div>• Financial Grant: {modalOffer.scholarshipAwarded || 'Eligible for DSU Regional Support'}</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Please confirm acceptance and submit your enrollment deposit via the university treasury portal before the deadline.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-300 flex justify-between items-center font-sans text-[10.5px] text-slate-500">
                <span>Verified by Presume Overseas Education</span>
                <span className="font-bold text-emerald-700">✓ Digital Signature Authenticated</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading admission letter PDF for ${student.name} (${modalOffer.universityName})...`);
                  setShowPdfModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#087cf5] text-white text-xs font-bold hover:bg-blue-600 flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
