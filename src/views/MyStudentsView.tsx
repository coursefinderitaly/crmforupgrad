import React, { useState, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Edit2,
  CheckCircle2,
  Plus,
  Clock,
  ChevronDown,
  GraduationCap,
  MapPin,
  CreditCard,
  Send,
  Building2,
  Award,
  Lightbulb,
  Monitor,
  Plane,
  X,
  ExternalLink,
  Mail,
  Save,
  Check,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Layers,
  Sparkles,
  Compass,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { Student, DocumentItem, ApplicationRecord } from '../types/crm';

interface MyStudentsViewProps {
  onOpenRegisterModal: () => void;
}

export const MyStudentsView: React.FC<MyStudentsViewProps> = ({ onOpenRegisterModal }) => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    updateStudent,
    updateDocumentStatus,
    advanceToEnrolled,
    advanceToShortlisting,
    sendToStudentApproval,
    recordStudentApproval,
    advanceApplicationStep,
    addStudentNote,
    navigate,
  } = useUpGradWorkflow();

  // Active student defaults to selected student or first student
  const currentStudent: Student = selectedStudent || students[0];

  // Active subtab state
  const [activeSubTab, setActiveSubTab] = useState<string>('Overview');

  // Overall status & Priority state
  const [overallStatus, setOverallStatus] = useState<string>('Processing');
  const [priority, setPriority] = useState<string>('Medium');

  // Modals for editing sections
  const [editModal, setEditModal] = useState<
    'personal' | 'academic' | 'program' | 'payment' | 'full' | null
  >(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // New Application Modal State
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    university: '',
    program: '',
    intake: '2026/27',
    status: 'Draft' as ApplicationRecord['status'],
  });

  // Quick activity log note state
  const [quickActivityText, setQuickActivityText] = useState('');

  // Editable form state synchronized with currentStudent
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Male',
    nationality: 'Indian',
    address: '',
    passportStatus: 'Available' as 'Available' | 'Applied' | 'Not Available',
    country: '',
    intake: '',
    courseLevel: 'Master',
    preferredCourse: '',
    alternativeCourses: [] as string[],
    targetUniversity: '',
    intakeDeadline: '15 Jan 2026',
    notes: '',
    enrollmentDate: '',
    nextFollowUp: '',
    nextFollowUpTime: '11:00 AM',
    nextFollowUpNote: '',

    // Academic Details
    highestQualification: "Bachelor's Degree",
    university: '',
    passingYear: '2024',
    cgpa: '8.0 CGPA',
    backlogs: 'No',
    educationGap: 'No',
    workExperience: 'Fresher',
    budget: '€ 10,000 – 15,000 / yr',

    // Secondary academics
    tenthBoard: 'CBSE',
    tenthPercentage: '85%',
    twelfthStream: 'Science (PCM)',
    twelfthPercentage: '82%',

    // Test Scores
    testType: 'IELTS' as 'IELTS' | 'PTE' | 'TOEFL' | 'Duolingo' | 'Pending',
    overallBand: '7.0',
    listening: '7.5',
    reading: '7.0',
    writing: '6.5',
    speaking: '7.0',
    trfNumber: '25TRF10098',
    testDate: '15 Jan 2025',
    testStatus: 'Accepted' as 'Valid' | 'Accepted' | 'Under Review' | 'Pending',

    // Payment & Agreement
    servicePackage: 'Global Degree Advisory',
    agreementStatus: 'Signed' as 'Signed' | 'Pending' | 'Draft',
    totalFee: '₹ 2,80,000',
    amountPaid: '₹ 1,00,000',
    balance: '₹ 1,80,000',
    paymentSchedule: [
      { id: '1', milestone: '1st Installment (Profile Enrolment)', amount: '₹ 50,000', status: 'Paid' },
      { id: '2', milestone: '2nd Installment (Documentation & Filing)', amount: '₹ 50,000', status: 'Paid' },
      { id: '3', milestone: '3rd Installment (Visa & Post-Admit)', amount: '₹ 1,80,000', status: 'Pending' },
    ],

    // Notes
    counsellingNotes: '',
    internalNotes: '',
    assignedDocExecutive: 'Priya Singh',
  });

  // Load active student data whenever currentStudent changes
  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name || '',
        studentId: currentStudent.leadId || '',
        phone: currentStudent.mobile || '',
        email: currentStudent.email || '',
        dob: currentStudent.dob || '12 May 2001',
        gender: currentStudent.gender || 'Male',
        nationality: currentStudent.nationality || 'Indian',
        address: currentStudent.address || '',
        passportStatus: currentStudent.passportStatus || 'Available',
        country: currentStudent.countryInterest || 'Italy',
        intake: currentStudent.intake || 'Sept 2026',
        courseLevel: currentStudent.courseLevel || 'Master',
        preferredCourse: currentStudent.courseInterest || '',
        alternativeCourses: currentStudent.alternativeCourses || ['Data Science', 'Applied AI'],
        targetUniversity: currentStudent.targetUniversity || currentStudent.shortlistedUniversities?.[0]?.name || 'University of Padova',
        intakeDeadline: currentStudent.intakeDeadline || '15 Jan 2026',
        notes: currentStudent.counsellingNotes || '',
        enrollmentDate: currentStudent.enrollmentDate || '02 Oct 2025',
        nextFollowUp: currentStudent.nextFollowUpDate || '10 Oct 2025',
        nextFollowUpTime: currentStudent.nextFollowUpTime || '11:00 AM',
        nextFollowUpNote: currentStudent.nextFollowUpNote || '',

        highestQualification: currentStudent.highestQualification || currentStudent.graduationDegree || 'B.Tech',
        university: currentStudent.graduationUniversity || '',
        passingYear: currentStudent.graduationYear || '2024',
        cgpa: currentStudent.graduationScore || '8.0 CGPA',
        backlogs: currentStudent.backlogs || 'No',
        educationGap: currentStudent.educationGap || 'No',
        workExperience: currentStudent.workExperience || 'Fresher',
        budget: currentStudent.budget || '€ 10,000 – 15,000',

        tenthBoard: currentStudent.tenthBoard || 'CBSE',
        tenthPercentage: currentStudent.tenthPercentage || '85%',
        twelfthStream: currentStudent.twelfthStream || 'Science',
        twelfthPercentage: currentStudent.twelfthPercentage || '82%',

        testType: currentStudent.testType || 'IELTS',
        overallBand: currentStudent.overallBand || '7.0',
        listening: currentStudent.listening || '7.5',
        reading: currentStudent.reading || '7.0',
        writing: currentStudent.writing || '6.5',
        speaking: currentStudent.speaking || '7.0',
        trfNumber: currentStudent.trfNumber || '25TRF9901',
        testDate: currentStudent.testDate || '15 Jan 2025',
        testStatus: currentStudent.testStatus || 'Accepted',

        servicePackage: currentStudent.servicePackage || 'Global Degree Advisory',
        agreementStatus: currentStudent.agreementStatus || 'Signed',
        totalFee: currentStudent.totalFee || '₹ 2,80,000',
        amountPaid: currentStudent.amountPaid || '₹ 1,00,000',
        balance: currentStudent.balance || '₹ 1,80,000',
        paymentSchedule: (currentStudent.paymentSchedule || [
          { id: '1', milestone: '1st Installment (Profile Enrolment)', amount: '₹ 50,000', status: 'Paid' },
          { id: '2', milestone: '2nd Installment (Documentation & Filing)', amount: '₹ 50,000', status: 'Paid' },
          { id: '3', milestone: '3rd Installment (Visa & Post-Admit)', amount: '₹ 1,80,000', status: 'Pending' },
        ]).map((p) => ({ ...p, status: p.status || 'Pending' })),

        counsellingNotes: currentStudent.counsellingNotes || '',
        internalNotes: currentStudent.internalNotes || '',
        assignedDocExecutive: currentStudent.assignedDocExecutive || 'Priya Singh',
      });

      setOverallStatus(
        currentStudent.stage === 'offer_received'
          ? 'Completed'
          : currentStudent.stage === 'application'
          ? 'Under Review'
          : 'Processing'
      );
    }
  }, [currentStudent]);

  // Save all profile changes to context & persist to localStorage
  const handleSaveProfile = () => {
    if (!currentStudent) return;

    updateStudent(currentStudent.id, {
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      nationality: formData.nationality,
      mobile: formData.phone,
      email: formData.email,
      address: formData.address,
      passportStatus: formData.passportStatus,
      countryInterest: formData.country,
      courseInterest: formData.preferredCourse,
      courseLevel: formData.courseLevel,
      preferredCourse: formData.preferredCourse,
      alternativeCourses: formData.alternativeCourses,
      targetUniversity: formData.targetUniversity,
      intake: formData.intake,
      intakeDeadline: formData.intakeDeadline,
      budget: formData.budget,
      highestQualification: formData.highestQualification,
      graduationUniversity: formData.university,
      graduationDegree: formData.highestQualification,
      graduationScore: formData.cgpa,
      graduationYear: formData.passingYear,
      backlogs: formData.backlogs,
      educationGap: formData.educationGap,
      workExperience: formData.workExperience,
      testType: formData.testType,
      overallBand: formData.overallBand,
      listening: formData.listening,
      reading: formData.reading,
      writing: formData.writing,
      speaking: formData.speaking,
      trfNumber: formData.trfNumber,
      testDate: formData.testDate,
      testStatus: formData.testStatus,
      tenthBoard: formData.tenthBoard,
      tenthPercentage: formData.tenthPercentage,
      twelfthStream: formData.twelfthStream,
      twelfthPercentage: formData.twelfthPercentage,
      servicePackage: formData.servicePackage,
      agreementStatus: formData.agreementStatus,
      totalFee: formData.totalFee,
      amountPaid: formData.amountPaid,
      balance: formData.balance,
      paymentSchedule: formData.paymentSchedule,
      counsellingNotes: formData.counsellingNotes,
      internalNotes: formData.internalNotes,
      nextFollowUpDate: formData.nextFollowUp,
      nextFollowUpTime: formData.nextFollowUpTime,
      lastActivity: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });

    setEditModal(null);
    setSaveSuccessMessage('Student details saved successfully!');
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // Lead flow transition: Profile Completed -> Advance to Documentation
  const handleCompleteProfileAndAdvance = () => {
    handleSaveProfile();
    advanceToEnrolled(currentStudent.id);
    navigate('documentation', currentStudent.id);
  };

  // Stepper stages (counsellor step completely removed)
  const stepperStages = [
    { num: 1, title: 'Profile & Enrolment', status: 'Completed', color: 'green', lineColor: 'green' },
    {
      num: 2,
      title: 'Documentation',
      status: currentStudent?.stage === 'documentation' ? 'In Progress' : 'Verified',
      color: currentStudent?.stage === 'registered' ? 'gray' : 'green',
      lineColor: currentStudent?.stage === 'registered' ? 'gray' : 'green',
    },
    {
      num: 3,
      title: 'Shortlisting',
      status: currentStudent?.stage === 'shortlisting' ? 'In Progress' : 'Selected',
      color: ['registered', 'enrolled', 'documentation'].includes(currentStudent?.stage) ? 'gray' : 'green',
      lineColor: ['registered', 'enrolled', 'documentation'].includes(currentStudent?.stage) ? 'gray' : 'green',
    },
    {
      num: 4,
      title: 'Student Approval',
      status: currentStudent?.stage === 'student_approval' ? 'In Progress' : 'Signed',
      color: ['registered', 'enrolled', 'documentation', 'shortlisting'].includes(currentStudent?.stage) ? 'gray' : 'green',
      lineColor: ['registered', 'enrolled', 'documentation', 'shortlisting'].includes(currentStudent?.stage) ? 'gray' : 'blue',
    },
    {
      num: 5,
      title: 'Applications',
      status: currentStudent?.stage === 'application' ? 'In Progress' : 'Ready',
      color: currentStudent?.stage === 'application' ? 'blue' : currentStudent?.stage === 'offer_received' ? 'green' : 'gray',
      lineColor: currentStudent?.stage === 'offer_received' ? 'green' : 'blue',
    },
    {
      num: 6,
      title: 'Offer Letter',
      status: currentStudent?.stage === 'offer_received' ? 'Received 🎉' : 'Pending',
      color: currentStudent?.stage === 'offer_received' ? 'green' : 'blue',
      lineColor: currentStudent?.stage === 'offer_received' ? 'green' : 'orange',
    },
    { num: 7, title: 'Final University', status: 'Selected', color: 'blue', lineColor: 'orange' },
    { num: 8, title: 'Scholarship', status: 'In Progress', color: 'orange', lineColor: 'orange' },
    { num: 9, title: 'Pre-Enrolment', status: 'Pending', color: 'orange', lineColor: 'gray' },
    { num: 10, title: 'DoV / CIMEA', status: 'Equivalence', color: 'gray', lineColor: 'gray' },
    { num: 11, title: 'Visa Process', status: 'File Prep', color: 'gray', lineColor: 'gray' },
    { num: 12, title: 'Travel & Arrival', status: 'Arrival', color: 'gray', isLast: true },
  ];

  // Sub-Tabs
  const tabs = [
    'Overview',
    'Enrolment & Profile',
    'Documents',
    'University Shortlisting',
    'Student Approval',
    'Applications',
    'Offer Letters',
    'Final University',
    'Scholarship',
    'Pre-Enrolment',
    'DoV / CIMEA',
    'Visa',
    'Pre-Departure',
    'Timeline',
  ];

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab);
    if (tab === 'Documents') navigate('documentation', currentStudent.id);
    else if (tab === 'University Shortlisting') navigate('shortlisting', currentStudent.id);
    else if (tab === 'Student Approval') navigate('student-approval', currentStudent.id);
    else if (tab === 'Applications') navigate('applications', currentStudent.id);
    else if (tab === 'Offer Letters') navigate('offer-letters', currentStudent.id);
    else if (tab === 'Final University') navigate('final-university', currentStudent.id);
    else if (tab === 'Scholarship') navigate('scholarship', currentStudent.id);
    else if (tab === 'Pre-Enrolment') navigate('pre-enrolment', currentStudent.id);
    else if (tab === 'DoV / CIMEA') navigate('dov-cimea', currentStudent.id);
    else if (tab === 'Visa') navigate('visa-process', currentStudent.id);
    else if (tab === 'Pre-Departure') navigate('pre-departure', currentStudent.id);
  };

  const handleStepperClick = (stageTitle: string) => {
    if (stageTitle === 'Profile & Enrolment') setActiveSubTab('Enrolment & Profile');
    else if (stageTitle === 'Documentation') navigate('documentation', currentStudent.id);
    else if (stageTitle === 'Shortlisting') navigate('shortlisting', currentStudent.id);
    else if (stageTitle === 'Student Approval') navigate('student-approval', currentStudent.id);
    else if (stageTitle === 'Applications') navigate('applications', currentStudent.id);
    else if (stageTitle === 'Offer Letter') navigate('offer-letters', currentStudent.id);
    else if (stageTitle === 'Final University') navigate('final-university', currentStudent.id);
    else if (stageTitle === 'Scholarship') navigate('scholarship', currentStudent.id);
    else if (stageTitle === 'Pre-Enrolment') navigate('pre-enrolment', currentStudent.id);
    else if (stageTitle === 'DoV / CIMEA') navigate('dov-cimea', currentStudent.id);
    else if (stageTitle === 'Visa Process') navigate('visa-process', currentStudent.id);
    else if (stageTitle === 'Travel & Arrival') navigate('pre-departure', currentStudent.id);
  };

  // Add new application to current student
  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppForm.university || !newAppForm.program) return;

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      universityId: `uni-${Date.now()}`,
      universityName: newAppForm.university,
      course: newAppForm.program,
      country: formData.country || 'Italy 🇮🇹',
      deadline: formData.intakeDeadline || '15 Jan 2026',
      applicationFee: 'Waived',
      assignedExecutive: formData.assignedDocExecutive || 'Application Team',
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      currentStep: newAppForm.status === 'Offer Received' ? 6 : newAppForm.status === 'Submitted' ? 4 : 1,
      status: newAppForm.status,
    };

    updateStudent(currentStudent.id, {
      applications: [...(currentStudent.applications || []), newApp],
      stage: newAppForm.status === 'Offer Received' ? 'offer_received' : 'application',
      statusText: newAppForm.status === 'Offer Received' ? 'Offer Letter Received 🎉' : 'Application in Process',
    });

    setShowAddAppModal(false);
    setNewAppForm({ university: '', program: '', intake: '2026/27', status: 'Draft' });
  };

  // Add quick activity note
  const handleAddQuickActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickActivityText.trim()) {
      addStudentNote(currentStudent.id, quickActivityText.trim());
      setQuickActivityText('');
    }
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 max-w-[1720px] mx-auto select-none font-sans text-[#101d37]">
      {/* ── Top Bar: Active Student Switcher & Quick Navigation ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#e5edf5] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-[#101d37]">Active Student Roster:</span>
          <select
            value={currentStudent?.id || ''}
            onChange={(e) => {
              const match = students.find((s) => s.id === e.target.value);
              if (match) setSelectedStudent(match);
            }}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
          >
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} &bull; {st.leadId} ({st.countryInterest} - {st.courseInterest})
              </option>
            ))}
          </select>
        </div>

        {/* Lead Flow Control Actions */}
        <div className="flex items-center gap-2">
          {saveSuccessMessage && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-in fade-in">
              {saveSuccessMessage}
            </span>
          )}

          <button
            onClick={() => setEditModal('full')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#087cf5]" />
            <span>Edit Full Profile</span>
          </button>

          <button
            onClick={handleCompleteProfileAndAdvance}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete Profile &amp; Advance to Docs &rarr;</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* ── 1. Student Master Header Profile Card ── */}
      <div className="bg-white rounded-xl border border-[#e5edf5] p-3.5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left Block: Avatar + Name + Core Identifiers */}
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src={currentStudent?.avatar || '/avatars/rahul.png'}
                alt={formData.name}
                className="w-14 h-14 aspect-square rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-bold text-[#101d37] leading-tight">
                  {formData.name}
                </h1>
                <span className="px-2 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold leading-normal">
                  {currentStudent?.statusText || 'Active Dossier'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Student ID:</span>
                  <span className="font-semibold text-[#101d37]">{formData.studentId}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Assigned Staff:</span>
                  <span className="font-semibold text-[#101d37]">{formData.assignedDocExecutive}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Mobile:</span>
                  <span className="font-semibold text-[#101d37]">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Email:</span>
                  <span className="font-semibold text-[#101d37]">{formData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Block: Target Country & Program Preferences */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 space-y-0.5 text-[11px]">
            <div className="flex items-center gap-1.5 pb-0.5">
              <span className="text-base">🇮🇹</span>
              <span className="font-bold text-[12.5px] text-[#101d37]">
                {formData.country}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Intake:</span>
              <span className="font-semibold text-[#101d37]">{formData.intake}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Course Level:</span>
              <span className="font-semibold text-[#101d37]">{formData.courseLevel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Preferred Course:</span>
              <span className="font-semibold text-[#101d37] truncate max-w-[160px]">{formData.preferredCourse}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Target University:</span>
              <span className="font-semibold text-[#101d37] truncate max-w-[160px]">{formData.targetUniversity}</span>
            </div>
          </div>

          {/* Right Block: Enrollment Date, Follow-up, Overall Status, Priority */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 flex flex-wrap items-center gap-2.5">
            {/* Enrollment Date Card */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Enrollment Date</div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e2e8f0] bg-white text-[11.5px] font-medium text-[#101d37]">
                <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                <span>{formData.enrollmentDate}</span>
              </div>
            </div>

            {/* Next Follow-up Card */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Next Follow-up</div>
              <button
                onClick={() => alert(`Next follow-up on ${formData.nextFollowUp} at ${formData.nextFollowUpTime}`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[11.5px] font-medium text-[#101d37] transition-colors"
                title="Follow-up scheduled"
              >
                <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                <span>{formData.nextFollowUp}</span>
              </button>
            </div>

            {/* Overall Status Dropdown */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Overall Status</div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e0f2fe] text-[#0284c7] font-semibold text-[11.5px]">
                <select
                  value={overallStatus}
                  onChange={(e) => setOverallStatus(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-[#0284c7]"
                >
                  <option value="Processing">Processing</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Under Review">Under Review</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Drop">Drop</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#0284c7]" />
              </div>
            </div>

            {/* Priority Dropdown */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Priority</div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#fef3c7] text-[#d97706] font-semibold text-[11.5px]">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-[#d97706]"
                >
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Low">Low</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#d97706]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── 12-Step Progression Stepper (No Counsellor Step) ── */}
        <div className="mt-4 pt-3 border-t border-slate-100 overflow-x-auto pb-1">
          <div className="min-w-[980px] flex items-center justify-between px-1">
            {stepperStages.map((step) => {
              let circleClass = '';
              let textColorClass = '';

              if (step.color === 'green') {
                circleClass = 'bg-[#16a34a] text-white';
                textColorClass = 'text-[#16a34a]';
              } else if (step.color === 'blue') {
                circleClass = 'bg-[#087cf5] text-white';
                textColorClass = 'text-[#087cf5]';
              } else if (step.color === 'orange') {
                circleClass = 'bg-[#ea580c] text-white';
                textColorClass = 'text-[#ea580c]';
              } else {
                circleClass = 'border-2 border-[#94a3b8] text-[#64748b] bg-white';
                textColorClass = 'text-[#64748b]';
              }

              let lineClass = 'bg-[#cbd5e1]';
              if (step.lineColor === 'green') lineClass = 'bg-[#16a34a]';
              else if (step.lineColor === 'blue') lineClass = 'bg-[#087cf5]';
              else if (step.lineColor === 'orange') lineClass = 'bg-[#ea580c]';

              return (
                <div key={step.num} className="flex-1 flex items-center last:flex-none">
                  <button
                    onClick={() => handleStepperClick(step.title)}
                    className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none"
                    title={`Click to open ${step.title}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow-xs transition-transform group-hover:scale-105 ${circleClass}`}
                    >
                      {step.num}
                    </div>
                    <div className="text-[10px] font-semibold text-[#101d37] whitespace-nowrap mt-1 leading-tight text-center">
                      {step.title}
                    </div>
                    <div className={`text-[9px] font-semibold whitespace-nowrap leading-tight text-center ${textColorClass}`}>
                      {step.status}
                    </div>
                  </button>

                  {!step.isLast ? (
                    <div className={`flex-1 h-[2px] mx-1.5 self-center -mt-6 ${lineClass}`} />
                  ) : (
                    <div className="ml-1 self-center -mt-6 text-[#94a3b8] text-[11px]">
                      &gt;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. Horizontal Navigation Sub-Tabs ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-medium cursor-pointer ${
                isActive
                  ? 'bg-[#087cf5] text-white font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-[#52627a] border border-[#e2e8f0]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── 3. Main Dashboard Content Grid (The 12 Activated Cards in Overview) ── */}
      {activeSubTab === 'Overview' && (
        <div className="space-y-3">
          {/* ── ROW 1: 4 Cards (Personal Details, Academic Details, Program Preferences, Payment & Agreement) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
            {/* Card 1: Personal Details */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Personal Details</span>
                  </div>
                  <button
                    onClick={() => setEditModal('personal')}
                    className="flex items-center gap-1 text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Full Name</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-semibold text-[#101d37]">{formData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Date of Birth</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.dob}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Nationality</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.nationality}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-[#64748b] shrink-0">Mobile</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] flex items-center gap-1">
                      {formData.phone}
                      <button
                        onClick={() => alert(`Launching WhatsApp for ${formData.phone}...`)}
                        title="Send WhatsApp"
                        className="text-[#22c55e] hover:opacity-80"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Email</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] truncate">{formData.email}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Address</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] truncate">{formData.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-[#64748b] shrink-0">Passport</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium flex items-center gap-1 text-[#15803d]">
                      {formData.passportStatus}
                      <CheckCircle2 className="w-3.5 h-3.5 fill-[#15803d] text-white" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Academic Details */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Academic Details</span>
                  </div>
                  <button
                    onClick={() => setEditModal('academic')}
                    className="flex items-center gap-1 text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Qualification</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-semibold text-[#101d37] truncate">{formData.highestQualification}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">University</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] truncate">{formData.university}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Passing Year</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.passingYear}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">CGPA / Score</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-blue-700">{formData.cgpa}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">English Test</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-emerald-700">{formData.testType} {formData.overallBand}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Backlogs / Gap</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.backlogs} Backlogs &bull; {formData.educationGap}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Budget Plan</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.budget}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Program Preferences */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <MapPin className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Program Preferences</span>
                  </div>
                  <button
                    onClick={() => setEditModal('program')}
                    className="flex items-center gap-1 text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Country</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#101d37]">{formData.country}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Course Level</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.courseLevel}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Target Course</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-semibold text-[#101d37] truncate">{formData.preferredCourse}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Target Intake</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.intake}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Intake Deadline</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{formData.intakeDeadline}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Target University</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-semibold text-[#101d37] truncate">{formData.targetUniversity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Payment & Agreement */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <CreditCard className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Payment &amp; Agreement</span>
                  </div>
                  <button
                    onClick={() => setEditModal('payment')}
                    className="flex items-center gap-1 text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Service Package</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-semibold text-[#101d37] truncate">{formData.servicePackage}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Agreement</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                      {formData.agreementStatus}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Total Agreed Fee</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#101d37]">{formData.totalFee}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Amount Paid</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#15803d]">{formData.amountPaid}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Outstanding</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#dc2626]">{formData.balance}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-[#64748b] shrink-0">Next Installment</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-slate-700">₹ 50,000 (Visa milestone)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: 2 Cards (University Applications & Offer Letters) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            {/* Left Table: University Applications (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>University Applications ({currentStudent.applications?.length || 0})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddAppModal(true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11px] font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                      <span>Add Application</span>
                    </button>
                    <button
                      onClick={() => navigate('applications', currentStudent.id)}
                      className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                    >
                      Full Workspace &rarr;
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1.5 px-2">#</th>
                        <th className="py-1.5 px-2">University Name</th>
                        <th className="py-1.5 px-2">Program</th>
                        <th className="py-1.5 px-2">Intake</th>
                        <th className="py-1.5 px-2">Application Number</th>
                        <th className="py-1.5 px-2">Status</th>
                        <th className="py-1.5 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentStudent.applications && currentStudent.applications.length > 0 ? (
                        currentStudent.applications.map((app, index) => (
                          <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-2 px-2 text-[#64748b]">{index + 1}</td>
                            <td className="py-2 px-2 font-semibold text-[#101d37]">{app.universityName}</td>
                            <td className="py-2 px-2 text-[#52627a]">{app.course}</td>
                            <td className="py-2 px-2 text-[#52627a]">{formData.intake}</td>
                            <td className="py-2 px-2 font-mono text-[10px] text-slate-600">{app.applicationNumber || 'Auto-generated'}</td>
                            <td className="py-2 px-2">
                              <span
                                className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                                  app.currentStep === 6
                                    ? 'bg-[#dcfce7] text-[#15803d]'
                                    : app.currentStep === 4
                                    ? 'bg-[#e0e7ff] text-[#4338ca]'
                                    : 'bg-[#e0f2fe] text-[#0284c7]'
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-right">
                              <button
                                onClick={() => navigate('applications', currentStudent.id)}
                                className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-4 text-center text-slate-400">
                            No applications submitted yet. Click &quot;Add Application&quot; to file a university choice.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Table: Offer Letters (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Mail className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Offer Letters</span>
                  </div>
                  <button
                    onClick={() => navigate('offer-letters', currentStudent.id)}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1.5 px-2">University</th>
                        <th className="py-1.5 px-2">Type</th>
                        <th className="py-1.5 px-2">Conditions</th>
                        <th className="py-1.5 px-2">Status</th>
                        <th className="py-1.5 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 px-2 font-medium text-[#101d37]">University of Bologna</td>
                        <td className="py-2 px-2 text-[#52627a]">Conditional</td>
                        <td className="py-2 px-2 text-[#52627a] truncate max-w-[120px]">Final Degree Transcripts</td>
                        <td className="py-2 px-2">
                          <span className="px-1.5 py-0.5 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                            Offer Accepted
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => alert('Downloading official admission offer letter PDF...')}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 px-2 font-medium text-[#101d37]">University of Padova</td>
                        <td className="py-2 px-2 text-[#52627a]">Unconditional</td>
                        <td className="py-2 px-2 text-[#52627a]">-</td>
                        <td className="py-2 px-2">
                          <span className="px-1.5 py-0.5 rounded font-semibold text-[10px] bg-[#fef3c7] text-[#d97706]">
                            Under Review
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => navigate('offer-letters', currentStudent.id)}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 3: 4 Columns (Document Checklist, Scholarship & Pre-Enrolment, DoV & Visa, Recent Activities) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
            {/* Col 1: Document Checklist */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                  <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                  <span>Document Checklist</span>
                </div>
                <button
                  onClick={() => navigate('documentation', currentStudent.id)}
                  className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                >
                  Verify All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto pt-1">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                      <th className="py-1 px-1.5">Document</th>
                      <th className="py-1 px-1.5">Status</th>
                      <th className="py-1 px-1.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {currentStudent.documents?.slice(0, 6).map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37] truncate max-w-[130px]" title={doc.name}>
                          {doc.name}
                        </td>
                        <td className="py-1.5 px-1.5">
                          <span
                            className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${
                              doc.status === 'Approved'
                                ? 'bg-[#dcfce7] text-[#15803d]'
                                : doc.status === 'Under Review'
                                ? 'bg-[#fef3c7] text-[#d97706]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-right">
                          {doc.status !== 'Approved' ? (
                            <button
                              onClick={() => updateDocumentStatus(currentStudent.id, doc.id, 'Approved')}
                              className="text-emerald-700 hover:underline font-bold cursor-pointer text-[10.5px]"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-emerald-600 font-semibold text-[10px]">Verified ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Col 2: Stacked Cards (Scholarship Process & Pre-Enrolment Universitaly) */}
            <div className="space-y-3">
              {/* Top: Scholarship Process */}
              <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Lightbulb className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Scholarship Process</span>
                  </div>
                  <button
                    onClick={() => navigate('scholarship', currentStudent.id)}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1 px-1.5">Scholarship</th>
                        <th className="py-1 px-1.5">Deadline</th>
                        <th className="py-1 px-1.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">DSU Regional Grant</td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">30 Nov 2026</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#fef3c7] text-[#d97706]">
                            Income Docs
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">Padova Merit Waiver</td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">15 Feb 2027</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                            Eligible
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom: Pre-Enrolment (Universitaly) */}
              <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Monitor className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Pre-Enrolment (Universitaly)</span>
                  </div>
                  <button
                    onClick={() => navigate('pre-enrolment', currentStudent.id)}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View &rarr;
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Portal Account:</span>
                    <span className="font-semibold text-emerald-700">Created ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Dossier Form:</span>
                    <span className="font-semibold text-emerald-700">Submitted ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Embassy Validation:</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#fef3c7] text-[#d97706]">
                      Under Review
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Stacked Cards (DoV / CIMEA & Visa Process) */}
            <div className="space-y-3">
              {/* Top: DoV / CIMEA */}
              <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>DoV / CIMEA Equivalence</span>
                  </div>
                  <button
                    onClick={() => navigate('dov-cimea', currentStudent.id)}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View &rarr;
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Process Type:</span>
                    <span className="font-semibold text-[#101d37]">CIMEA Statement</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Status:</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                      In Preparation
                    </span>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => navigate('dov-cimea', currentStudent.id)}
                      className="w-full py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-semibold shadow-xs"
                    >
                      Open Equivalence Desk
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom: Visa Process */}
              <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Plane className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Visa Process (Type D)</span>
                  </div>
                  <button
                    onClick={() => navigate('visa-process', currentStudent.id)}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View &rarr;
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">VFS Slot Date:</span>
                    <span className="font-semibold text-[#101d37]">Scheduled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748b]">Financial Solvency:</span>
                    <span className="font-semibold text-emerald-700">Verified ✓</span>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => navigate('visa-process', currentStudent.id)}
                      className="w-full py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-semibold shadow-xs"
                    >
                      Open Visa Workspace
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Recent Activities & Interactive Note Poster */}
            <div className="bg-white rounded-xl border border-[#e5edf5] p-3 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                  <Clock className="w-3.5 h-3.5 text-[#087cf5]" />
                  <span>Activity Trail &amp; Notes</span>
                </div>
                <button
                  onClick={() => setActiveSubTab('Timeline')}
                  className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                >
                  Full History &rarr;
                </button>
              </div>

              {/* Form to log quick activity */}
              <form onSubmit={handleAddQuickActivity} className="space-y-1">
                <input
                  type="text"
                  placeholder="Log quick interaction or next follow-up note..."
                  value={quickActivityText}
                  onChange={(e) => setQuickActivityText(e.target.value)}
                  className="w-full p-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
                />
                <button
                  type="submit"
                  disabled={!quickActivityText.trim()}
                  className="w-full py-1 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] disabled:opacity-50 text-white text-[11px] font-bold"
                >
                  Post Activity Note
                </button>
              </form>

              <div className="pt-1 space-y-2 text-[10.5px] max-h-52 overflow-y-auto pr-1">
                {currentStudent.timeline && currentStudent.timeline.length > 0 ? (
                  currentStudent.timeline.slice(0, 5).map((act) => (
                    <div key={act.id} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full mt-1 shrink-0 bg-[#087cf5]" />
                      <div className="leading-tight">
                        <div className="text-[#64748b]">
                          <span className="font-semibold text-[#101d37]">{act.date}</span> &bull; <span>{act.time}</span>
                        </div>
                        <div className="text-[#101d37] font-medium mt-0.5">
                          {act.action} <span className="text-[#64748b] text-[10px]">({act.user})</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 text-center py-2">No activities logged yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SubTab: Enrolment & Full Profile Editor ── */}
      {activeSubTab === 'Enrolment & Profile' && (
        <div className="bg-white rounded-xl border border-[#e5edf5] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#101d37] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                <span>Complete Student Profile &amp; Enrolment Registration</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit and save complete dossier details to ensure clean university submission.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Profile Details</span>
              </button>
              <button
                onClick={handleCompleteProfileAndAdvance}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Complete &amp; Advance to Docs &rarr;</span>
              </button>
            </div>
          </div>

          {/* Full Integrated Profile Editor Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Column 1: Personal Details */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>Personal Information</span>
              </h4>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">DOB</label>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Mobile Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Full Permanent Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Passport Status</label>
                <select
                  value={formData.passportStatus}
                  onChange={(e) => setFormData({ ...formData, passportStatus: e.target.value as any })}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="Available">Available</option>
                  <option value="Applied">Applied</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>

            {/* Column 2: Academics & English Test */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>Academics &amp; Test Scores</span>
              </h4>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Degree / Highest Qualification</label>
                <input
                  type="text"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Graduation University / College</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Passing Year</label>
                  <input
                    type="text"
                    value={formData.passingYear}
                    onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">CGPA / %</label>
                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">English Test</label>
                  <select
                    value={formData.testType}
                    onChange={(e) => setFormData({ ...formData, testType: e.target.value as any })}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="Duolingo">Duolingo</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Overall Band</label>
                  <input
                    type="text"
                    value={formData.overallBand}
                    onChange={(e) => setFormData({ ...formData, overallBand: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <div>
                  <label className="text-[10px] text-slate-500 block">L</label>
                  <input
                    type="text"
                    value={formData.listening}
                    onChange={(e) => setFormData({ ...formData, listening: e.target.value })}
                    className="w-full p-1 border rounded bg-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">R</label>
                  <input
                    type="text"
                    value={formData.reading}
                    onChange={(e) => setFormData({ ...formData, reading: e.target.value })}
                    className="w-full p-1 border rounded bg-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">W</label>
                  <input
                    type="text"
                    value={formData.writing}
                    onChange={(e) => setFormData({ ...formData, writing: e.target.value })}
                    className="w-full p-1 border rounded bg-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">S</label>
                  <input
                    type="text"
                    value={formData.speaking}
                    onChange={(e) => setFormData({ ...formData, speaking: e.target.value })}
                    className="w-full p-1 border rounded bg-white text-center font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Column 3: Study Preferences & Agreement Fees */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>Target Study Plan &amp; Agreement</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Target Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Target Intake</label>
                  <input
                    type="text"
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Target Course</label>
                <input
                  type="text"
                  value={formData.preferredCourse}
                  onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Service Package</label>
                <input
                  type="text"
                  value={formData.servicePackage}
                  onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Total Fee</label>
                  <input
                    type="text"
                    value={formData.totalFee}
                    onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Paid</label>
                  <input
                    type="text"
                    value={formData.amountPaid}
                    onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-0.5">Balance</label>
                  <input
                    type="text"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white font-bold text-rose-700"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-0.5">Contract Agreement Status</label>
                <select
                  value={formData.agreementStatus}
                  onChange={(e) => setFormData({ ...formData, agreementStatus: e.target.value as any })}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="Signed">Signed</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveSubTab('Overview')}
              className="px-4 py-2 rounded-lg border text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* ── SubTab: Timeline View ── */}
      {activeSubTab === 'Timeline' && (
        <div className="bg-white rounded-xl border border-[#e5edf5] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#101d37] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#087cf5]" />
              <span>Full Audit Trail &amp; Chronological Activity History</span>
            </h3>
            <button
              onClick={() => setActiveSubTab('Overview')}
              className="text-xs text-[#087cf5] font-semibold hover:underline"
            >
              Back to Overview
            </button>
          </div>

          <div className="relative pl-6 space-y-4 border-l-2 border-slate-200 ml-2 py-2">
            {currentStudent.timeline && currentStudent.timeline.length > 0 ? (
              currentStudent.timeline.map((item) => (
                <div key={item.id} className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs bg-[#087cf5]" />
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#101d37]">{item.action}</span>
                      <span className="text-[11px] text-[#64748b]">{item.date} {item.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="text-[#64748b]">By: {item.user}</span>
                      <span className="font-semibold text-[#087cf5] bg-blue-50 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-xs">No activity logged yet.</div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal: Edit Personal Details ── */}
      {editModal === 'personal' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Edit Personal Details</h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Mobile</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Permanent Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Passport Status</label>
                <select
                  value={formData.passportStatus}
                  onChange={(e) => setFormData({ ...formData, passportStatus: e.target.value as any })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Applied">Applied</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditModal(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 rounded-lg bg-[#087cf5] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Academic Details ── */}
      {editModal === 'academic' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Edit Academic Details</h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Highest Qualification</label>
                <input
                  type="text"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Graduation University</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Passing Year</label>
                <input
                  type="text"
                  value={formData.passingYear}
                  onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">CGPA / Score</label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">English Test</label>
                <input
                  type="text"
                  value={formData.testType}
                  onChange={(e) => setFormData({ ...formData, testType: e.target.value as any })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Overall Band</label>
                <input
                  type="text"
                  value={formData.overallBand}
                  onChange={(e) => setFormData({ ...formData, overallBand: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditModal(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 rounded-lg bg-[#087cf5] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Program Preferences ── */}
      {editModal === 'program' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Edit Program Preferences</h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Target Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Course Level</label>
                <input
                  type="text"
                  value={formData.courseLevel}
                  onChange={(e) => setFormData({ ...formData, courseLevel: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Preferred Program</label>
                <input
                  type="text"
                  value={formData.preferredCourse}
                  onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Target Intake</label>
                <input
                  type="text"
                  value={formData.intake}
                  onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditModal(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 rounded-lg bg-[#087cf5] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Payment & Agreement ── */}
      {editModal === 'payment' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Edit Payment &amp; Agreement</h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Service Package</label>
                <input
                  type="text"
                  value={formData.servicePackage}
                  onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Total Fee</label>
                <input
                  type="text"
                  value={formData.totalFee}
                  onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Amount Paid</label>
                <input
                  type="text"
                  value={formData.amountPaid}
                  onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Balance</label>
                <input
                  type="text"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Agreement Status</label>
                <select
                  value={formData.agreementStatus}
                  onChange={(e) => setFormData({ ...formData, agreementStatus: e.target.value as any })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Signed">Signed</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditModal(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 rounded-lg bg-[#087cf5] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Add Application ── */}
      {showAddAppModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Add University Application</h3>
              <button onClick={() => setShowAddAppModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddApplication} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">University Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University of Milan"
                  value={newAppForm.university}
                  onChange={(e) => setNewAppForm({ ...newAppForm, university: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Program / Degree</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MSc Data Science"
                  value={newAppForm.program}
                  onChange={(e) => setNewAppForm({ ...newAppForm, program: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Intake</label>
                  <input
                    type="text"
                    value={newAppForm.intake}
                    onChange={(e) => setNewAppForm({ ...newAppForm, intake: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Status</label>
                  <select
                    value={newAppForm.status}
                    onChange={(e) => setNewAppForm({ ...newAppForm, status: e.target.value as any })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Offer Received">Offer Received</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAppModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#087cf5] text-white text-xs font-semibold"
                >
                  Add Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
