import React, { useState } from 'react';
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
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

interface MyStudentsViewProps {
  onOpenRegisterModal: () => void;
}

export const MyStudentsView: React.FC<MyStudentsViewProps> = ({ onOpenRegisterModal }) => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    navigate,
  } = useUpGradWorkflow();

  // Active student defaults to Rahul Sharma (or first student)
  const currentStudent = selectedStudent || students[0];

  // Active subtab state (defaults to 'Overview' as shown in the reference screenshot)
  const [activeSubTab, setActiveSubTab] = useState<string>('Overview');

  // Overall status & Priority state (interactive dropdowns)
  const [overallStatus, setOverallStatus] = useState<string>('Processing');
  const [priority, setPriority] = useState<string>('Medium');

  // Modals for editing sections
  const [editModal, setEditModal] = useState<string | null>(null);

  // Editable form state for Rahul Sharma matching reference screenshot
  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    studentId: 'ITA-2027-001',
    counsellor: 'Neha Jain',
    phone: '+91 98765 43210',
    email: 'rahulsharma@gmail.com',
    dob: '12 Mar 2001',
    nationality: 'Indian',
    address: 'Indore, Madhya Pradesh',
    passportStatus: 'Available (Valid till 2028)',
    country: 'Italy',
    intake: '2027/28',
    courseLevel: 'Master',
    preferredCourse: 'Materials Engineering',
    alternativeCourses: ['Polymer Engineering', 'Chemical Engineering'],
    targetUniversity: 'University of Padova',
    intakeDeadline: 'Varies by University',
    notes: 'Interested in scholarship',
    enrollmentDate: '12 Oct 2025',
    nextFollowUp: '15 Oct 2025',

    // Academic Details
    highestQualification: 'B.Tech (Mechanical)',
    university: 'RGPV, Bhopal',
    passingYear: '2025',
    cgpa: '7.8 / 10',
    englishTest: 'IELTS 6.5 (Available)',
    workExperience: 'Fresher',
    budget: '€10,000 - €15,000/year',

    // Payment & Agreement
    servicePackage: 'Italy Study Program',
    agreementStatus: 'Signed',
    totalFee: '₹ 2,80,000',
    amountPaid: '₹ 1,00,000',
    balance: '₹ 1,80,000',
    paymentSchedule: [
      { id: '1', milestone: '1st', amount: '₹40,000 (Paid)' },
      { id: '2', milestone: '2nd', amount: '₹40,000 (Dec 2025)' },
      { id: '3', milestone: '3rd', amount: '₹2,00,000 (After Visa)' },
    ],
  });

  // University Applications table data
  const [appRows, setAppRows] = useState([
    {
      id: 1,
      university: 'University of Padova',
      program: 'Materials Engineering',
      intake: '2027/28',
      date: '05 Oct 2025',
      status: 'Under Review',
      badgeClass: 'bg-[#e0f2fe] text-[#0284c7]',
    },
    {
      id: 2,
      university: 'University of Bologna',
      program: 'Advanced Materials Engineering',
      intake: '2027/28',
      date: '28 Sep 2025',
      status: 'Offer Received',
      badgeClass: 'bg-[#dcfce7] text-[#15803d]',
    },
    {
      id: 3,
      university: 'Politecnico di Torino',
      program: 'Chemical Engineering',
      intake: '2027/28',
      date: '02 Oct 2025',
      status: 'Submitted',
      badgeClass: 'bg-[#e0e7ff] text-[#4338ca]',
    },
    {
      id: 4,
      university: 'University of Pavia',
      program: 'Industrial Engineering',
      intake: '2027/28',
      date: '-',
      status: 'Draft',
      badgeClass: 'bg-[#f1f5f9] text-[#64748b]',
    },
  ]);

  // New Application Modal State
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    university: '',
    program: '',
    intake: '2027/28',
    status: 'Draft',
  });

  // Stepper stages matching the screenshot exactly
  const stepperStages = [
    { num: 1, title: 'Enrollment', status: 'Completed', color: 'green', lineColor: 'green' },
    { num: 2, title: 'Documentation', status: 'Completed', color: 'green', lineColor: 'green' },
    { num: 3, title: 'Shortlisting', status: 'Completed', color: 'green', lineColor: 'green' },
    { num: 4, title: 'Student Approval', status: 'Completed', color: 'green', lineColor: 'blue' },
    { num: 5, title: 'Applications', status: 'In Progress', color: 'blue', lineColor: 'blue' },
    { num: 6, title: 'Offer Letter', status: 'Received', color: 'blue', lineColor: 'blue' },
    { num: 7, title: 'Final University', status: 'Selected', color: 'blue', lineColor: 'orange' },
    { num: 8, title: 'Scholarship', status: 'In Progress', color: 'orange', lineColor: 'orange' },
    { num: 9, title: 'Pre-Enrolment', status: 'Pending', color: 'orange', lineColor: 'gray' },
    { num: 10, title: 'DoV / CIMEA', status: 'Not Started', color: 'gray', lineColor: 'gray' },
    { num: 11, title: 'Visa Process', status: 'Not Started', color: 'gray', lineColor: 'gray' },
    { num: 12, title: 'Travel & Arrival', status: 'Pending', color: 'gray', isLast: true },
  ];

  // 14 Sub-Tabs matching screenshot exactly
  const tabs = [
    'Overview',
    'Enrolment',
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
    // If user clicks a specific workflow tab, let them view the dedicated module if desired
    if (tab === 'Documents') navigate('documentation');
    else if (tab === 'University Shortlisting') navigate('shortlisting');
    else if (tab === 'Student Approval') navigate('student-approval');
    else if (tab === 'Applications') navigate('applications');
    else if (tab === 'Offer Letters') navigate('offer-letters');
    else if (tab === 'Final University') navigate('final-university');
    else if (tab === 'Scholarship') navigate('scholarship');
    else if (tab === 'Pre-Enrolment') navigate('pre-enrolment');
    else if (tab === 'DoV / CIMEA') navigate('dov-cimea');
    else if (tab === 'Visa') navigate('visa-process');
    else if (tab === 'Pre-Departure') navigate('pre-departure');
  };

  const handleStepperClick = (stageTitle: string) => {
    if (stageTitle === 'Enrollment') setActiveSubTab('Enrolment');
    else if (stageTitle === 'Documentation') navigate('documentation');
    else if (stageTitle === 'Shortlisting') navigate('shortlisting');
    else if (stageTitle === 'Student Approval') navigate('student-approval');
    else if (stageTitle === 'Applications') navigate('applications');
    else if (stageTitle === 'Offer Letter') navigate('offer-letters');
    else if (stageTitle === 'Final University') navigate('final-university');
    else if (stageTitle === 'Scholarship') navigate('scholarship');
    else if (stageTitle === 'Pre-Enrolment') navigate('pre-enrolment');
    else if (stageTitle === 'DoV / CIMEA') navigate('dov-cimea');
    else if (stageTitle === 'Visa Process') navigate('visa-process');
    else if (stageTitle === 'Travel & Arrival') navigate('pre-departure');
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppForm.university || !newAppForm.program) return;
    const newEntry = {
      id: appRows.length + 1,
      university: newAppForm.university,
      program: newAppForm.program,
      intake: newAppForm.intake,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: newAppForm.status,
      badgeClass:
        newAppForm.status === 'Submitted'
          ? 'bg-[#e0e7ff] text-[#4338ca]'
          : newAppForm.status === 'Offer Received'
          ? 'bg-[#dcfce7] text-[#15803d]'
          : 'bg-[#f1f5f9] text-[#64748b]',
    };
    setAppRows([...appRows, newEntry]);
    setShowAddAppModal(false);
    setNewAppForm({ university: '', program: '', intake: '2027/28', status: 'Draft' });
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 max-w-[1720px] mx-auto select-none font-sans text-[#101d37]">
      {/* ── Top Bar: Switcher & Quick Navigation ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3.5 py-2 rounded-[8px] border border-[#e5edf5] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-[#101d37]">Student Roster:</span>
          <select
            value={currentStudent?.id || ''}
            onChange={(e) => {
              const match = students.find((s) => s.id === e.target.value);
              if (match) setSelectedStudent(match);
            }}
            className="px-2 py-1 rounded-[5px] border border-slate-200 text-[11.5px] font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
          >
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} — {st.leadId} ({st.countryInterest})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('Overview')}
            className={`px-3 py-1 rounded-[5px] text-[11.5px] font-semibold transition-colors ${
              activeSubTab === 'Overview'
                ? 'bg-[#087cf5] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Candidate Profile
          </button>
          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1 px-3 py-1 rounded-[5px] bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11.5px] font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* ── 1. Student Master Header Profile Card (Matching Screenshot) ── */}
      <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3.5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left Block: Avatar + Name + Core Identifiers */}
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src={currentStudent?.avatar || '/avatars/rahul.png'}
                alt={profileData.name}
                className="w-14 h-14 aspect-square rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-bold text-[#101d37] leading-tight">
                  {profileData.name}
                </h1>
                <span className="px-2 py-0.2 rounded-full bg-[#15803d] text-white text-[10.5px] font-bold leading-normal">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Student ID:</span>
                  <span className="font-medium text-[#101d37]">{profileData.studentId}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Counsellor:</span>
                  <span className="font-medium text-[#101d37]">{profileData.counsellor}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Mobile:</span>
                  <span className="font-medium text-[#101d37]">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Email:</span>
                  <span className="font-medium text-[#101d37]">{profileData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Block: Country & Course Details */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 space-y-0.5 text-[11px]">
            <div className="flex items-center gap-1.5 pb-0.5">
              <span className="text-base">🇮🇹</span>
              <span className="font-bold text-[12.5px] text-[#101d37]">
                {profileData.country}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Intake:</span>
              <span className="font-medium text-[#101d37]">{profileData.intake}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Course Level:</span>
              <span className="font-medium text-[#101d37]">{profileData.courseLevel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Preferred Course:</span>
              <span className="font-medium text-[#101d37]">{profileData.preferredCourse}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Target University:</span>
              <span className="font-medium text-[#101d37]">{profileData.targetUniversity}</span>
            </div>
          </div>

          {/* Right Block: Enrollment Date, Follow-up, Overall Status, Priority */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 flex flex-wrap items-center gap-2.5">
            {/* Enrollment Date Card */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Enrollment Date</div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-[#e2e8f0] bg-white text-[11.5px] font-medium text-[#101d37]">
                <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                <span>{profileData.enrollmentDate}</span>
              </div>
            </div>

            {/* Next Follow-up Card */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Next Follow-up</div>
              <button
                onClick={() => alert(`Rescheduling follow-up for ${profileData.name}...`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[11.5px] font-medium text-[#101d37] transition-colors"
                title="Reschedule Follow-up"
              >
                <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                <span>{profileData.nextFollowUp}</span>
              </button>
            </div>

            {/* Overall Status Dropdown */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#64748b] font-medium">Overall Status</div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#e0f2fe] text-[#0284c7] font-semibold text-[11.5px]">
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
              <div className="flex items-center gap-1 px-3 py-1 rounded-[5px] bg-[#fef3c7] text-[#d97706] font-semibold text-[11.5px]">
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

        {/* ── 12-Step Progression Stepper (Matching Screenshot) ── */}
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

      {/* ── 2. Horizontal Navigation Sub-Tabs (14 Tabs Matching Screenshot) ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px] scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              className={`px-3 py-1.5 rounded-[5px] transition-all whitespace-nowrap font-medium cursor-pointer ${
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

      {/* ── 3. Main Dashboard Content Grid (The 12 Cards in Overview) ── */}
      {activeSubTab === 'Overview' && (
        <div className="space-y-3">
          {/* ── ROW 1: 4 Cards (Personal Details, Academic Details, Program Preferences, Payment & Agreement) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
            {/* Card 1: Personal Details */}
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
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
                    <span className="font-medium text-[#101d37]">{profileData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Date of Birth</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.dob}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Nationality</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.nationality}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-[#64748b] shrink-0">Mobile</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] flex items-center gap-1">
                      {profileData.phone}
                      <button
                        onClick={() => alert(`Launching WhatsApp for ${profileData.phone}...`)}
                        title="Send WhatsApp"
                        className="text-[#22c55e] hover:opacity-80"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.044-2.029-.533-1.428-.592-2.348-2.04-2.42-2.137-.071-.097-.58-.771-.58-1.469 0-.698.362-1.041.49-1.185.127-.143.281-.179.375-.179.094 0 .188.001.27.006.086.004.202-.033.315.241.119.287.406.994.442 1.066.035.072.059.156.012.25-.047.093-.071.152-.142.235-.07.083-.148.185-.212.249-.071.071-.145.148-.062.291.082.143.366.604.786.978.54.482.996.632 1.138.703.142.071.226.059.31-.036.084-.095.361-.421.457-.565.095-.144.19-.119.321-.072.131.048.832.392.975.464.143.071.238.107.273.167.036.059.036.345-.108.75z" />
                        </svg>
                      </button>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Email</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37] truncate">{profileData.email}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[#64748b] shrink-0">Address</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-[#64748b] shrink-0">Passport</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium flex items-center gap-1 text-[#15803d]">
                      {profileData.passportStatus}
                      <CheckCircle2 className="w-3.5 h-3.5 fill-[#15803d] text-white" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Academic Details */}
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
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
                    <span className="w-32 text-[#64748b] shrink-0">Highest Qualification</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.highestQualification}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">University</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.university}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Passing Year</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.passingYear}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">CGPA</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.cgpa}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">English Test</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.englishTest}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Work Experience</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.workExperience}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-[#64748b] shrink-0">Budget</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.budget}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Program Preferences */}
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
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
                    <span className="font-medium text-[#101d37]">{profileData.country}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Course Level</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.courseLevel}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Preferred Course</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.preferredCourse}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Alternative Courses</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <div className="font-medium text-[#101d37]">
                      {profileData.alternativeCourses.map((c, i) => (
                        <div key={i}>{c}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Target Intake</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.intake}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Intake Deadline</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.intakeDeadline}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-[#64748b] shrink-0">Notes</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">{profileData.notes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Payment & Agreement */}
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <CreditCard className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Payment & Agreement</span>
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
                    <span className="font-medium text-[#101d37]">{profileData.servicePackage}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Agreement Status</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                      {profileData.agreementStatus}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Total Fee</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#101d37]">{profileData.totalFee}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Amount Paid</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#15803d]">{profileData.amountPaid}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Balance</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-bold text-[#dc2626]">{profileData.balance}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-[#64748b] shrink-0">Payment Schedule</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <div className="font-medium text-[#101d37] space-y-0.5">
                      {profileData.paymentSchedule.map((row) => (
                        <div key={row.id}>
                          {row.milestone}: {row.amount}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: 2 Cards (University Applications & Offer Letters) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            {/* Left Table: University Applications (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>University Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddAppModal(true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11px] font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                      <span>Add Application</span>
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
                        <th className="py-1.5 px-2">Application Date</th>
                        <th className="py-1.5 px-2">Status</th>
                        <th className="py-1.5 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {appRows.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2 px-2 text-[#64748b]">{app.id}</td>
                          <td className="py-2 px-2 font-medium text-[#101d37]">{app.university}</td>
                          <td className="py-2 px-2 text-[#52627a]">{app.program}</td>
                          <td className="py-2 px-2 text-[#52627a]">{app.intake}</td>
                          <td className="py-2 px-2 text-[#52627a]">{app.date}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-0.5 rounded-[4px] font-semibold text-[10.5px] ${app.badgeClass}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right">
                            <button
                              onClick={() => navigate('applications')}
                              className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Table: Offer Letters (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Mail className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Offer Letters</span>
                  </div>
                  <button
                    onClick={() => navigate('offer-letters')}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1.5 px-2">University</th>
                        <th className="py-1.5 px-2">Offer Date</th>
                        <th className="py-1.5 px-2">Offer Type</th>
                        <th className="py-1.5 px-2">Conditions</th>
                        <th className="py-1.5 px-2">Status</th>
                        <th className="py-1.5 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 px-2 font-medium text-[#101d37]">University of Bologna</td>
                        <td className="py-2 px-2 text-[#52627a]">10 Oct 2025</td>
                        <td className="py-2 px-2 text-[#52627a]">Conditional</td>
                        <td className="py-2 px-2 text-[#52627a]">IELTS 6.5 Final Transcript</td>
                        <td className="py-2 px-2">
                          <span className="px-2 py-0.5 rounded-[4px] font-semibold text-[10.5px] bg-[#fef3c7] text-[#d97706]">
                            Under Verification
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => navigate('offer-letters')}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 px-2 font-medium text-[#101d37]">University of Pavia</td>
                        <td className="py-2 px-2 text-[#52627a]">-</td>
                        <td className="py-2 px-2 text-[#52627a]">-</td>
                        <td className="py-2 px-2 text-[#52627a]">-</td>
                        <td className="py-2 px-2">
                          <span className="px-2 py-0.5 rounded-[4px] font-semibold text-[10.5px] bg-[#f1f5f9] text-[#64748b]">
                            Not Received
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => navigate('offer-letters')}
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
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                  <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                  <span>Document Checklist</span>
                </div>
                <button
                  onClick={() => navigate('documentation')}
                  className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto pt-1">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                      <th className="py-1 px-1.5">Document</th>
                      <th className="py-1 px-1.5">Status</th>
                      <th className="py-1 px-1.5">Upload Date</th>
                      <th className="py-1 px-1.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Passport', status: 'Verified', date: '12 Oct 2025' },
                      { name: '10th Marksheet', status: 'Verified', date: '12 Oct 2025' },
                      { name: '12th Marksheet', status: 'Verified', date: '12 Oct 2025' },
                      { name: 'Bachelor Degree', status: 'Verified', date: '12 Oct 2025' },
                      { name: 'Transcripts (All Sem)', status: 'Verified', date: '12 Oct 2025' },
                      { name: 'CV / Resume', status: 'Verified', date: '10 Oct 2025' },
                      { name: 'SOP', status: 'Verified', date: '10 Oct 2025' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">{row.name}</td>
                        <td className="py-1.5 px-1.5">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">{row.date}</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <button
                            onClick={() => navigate('documentation')}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
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
              <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Lightbulb className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Scholarship Process</span>
                  </div>
                  <button
                    onClick={() => navigate('scholarship')}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1 px-1.5">Scholarship Name</th>
                        <th className="py-1 px-1.5">Deadline</th>
                        <th className="py-1 px-1.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">DSU Regional Scholarship</td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">30 Nov 2026</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#fef3c7] text-[#d97706]">
                            Documents Pending
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">University of Padova Merit</td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">15 Feb 2027</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#f1f5f9] text-[#64748b]">
                            Not Applied
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom: Pre-Enrolment (Universitaly) */}
              <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Monitor className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Pre-Enrolment (Universitaly)</span>
                  </div>
                  <button
                    onClick={() => navigate('pre-enrolment')}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#64748b] font-semibold">
                        <th className="py-1 px-1.5">Step</th>
                        <th className="py-1 px-1.5">Status</th>
                        <th className="py-1 px-1.5">Date</th>
                        <th className="py-1 px-1.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">Account Created</td>
                        <td className="py-1.5 px-1.5">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                            Completed
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">-</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <button
                            onClick={() => navigate('pre-enrolment')}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">Form Submission</td>
                        <td className="py-1.5 px-1.5">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#dcfce7] text-[#15803d]">
                            Completed
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">05 Oct 2025</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <button
                            onClick={() => navigate('pre-enrolment')}
                            className="text-[#087cf5] hover:underline font-semibold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-1.5 px-1.5 font-medium text-[#101d37]">University Validation</td>
                        <td className="py-1.5 px-1.5">
                          <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#fef3c7] text-[#d97706]">
                            Pending
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-[#52627a]">-</td>
                        <td className="py-1.5 px-1.5 text-right">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Col 3: Stacked Cards (DoV / CIMEA & Visa Process) */}
            <div className="space-y-3">
              {/* Top: DoV / CIMEA */}
              <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <FileText className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>DoV / CIMEA</span>
                  </div>
                  <button
                    onClick={() => navigate('dov-cimea')}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Process Type</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">DoV</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Status</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#f1f5f9] text-[#64748b]">
                      Not Started
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Required By</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">Embassy</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Documents</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">-</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate('dov-cimea')}
                      className="w-full py-1.5 rounded-[5px] bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11.5px] font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      Start DoV Process
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom: Visa Process */}
              <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                    <Plane className="w-3.5 h-3.5 text-[#087cf5]" />
                    <span>Visa Process</span>
                  </div>
                  <button
                    onClick={() => navigate('visa-process')}
                    className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Appointment Date</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">-</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Application Status</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] bg-[#f1f5f9] text-[#64748b]">
                      Not Started
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">Visa Type</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">Study Visa (Type D)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-28 text-[#64748b] shrink-0">VFS Reference</span>
                    <span className="text-[#64748b] mr-1">:</span>
                    <span className="font-medium text-[#101d37]">-</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate('visa-process')}
                      className="w-full py-1.5 rounded-[5px] bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11.5px] font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      Start Visa Process
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Recent Activities / Timeline */}
            <div className="bg-white rounded-[8px] border border-[#e5edf5] p-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-[#101d37] text-[12.5px]">
                  <Clock className="w-3.5 h-3.5 text-[#087cf5]" />
                  <span>Recent Activities / Timeline</span>
                </div>
                <button
                  onClick={() => setActiveSubTab('Timeline')}
                  className="text-[11px] text-[#087cf5] hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="pt-2 space-y-2.5 text-[10.5px]">
                {[
                  {
                    date: '12 Oct 2025',
                    time: '10:30 AM',
                    color: 'bg-[#16a34a]',
                    text: 'Document verification completed',
                    actor: 'by: Documentation Team',
                  },
                  {
                    date: '10 Oct 2025',
                    time: '04:15 PM',
                    color: 'bg-[#087cf5]',
                    text: 'Offer letter received - University of Bologna',
                    actor: 'by: Application Team',
                  },
                  {
                    date: '08 Oct 2025',
                    time: '11:20 AM',
                    color: 'bg-[#087cf5]',
                    text: 'Application submitted - University of Padova',
                    actor: 'by: Application Team',
                  },
                  {
                    date: '05 Oct 2025',
                    time: '03:40 PM',
                    color: 'bg-[#ea580c]',
                    text: 'Pre-enrolment form submitted',
                    actor: 'by: Documentation Team',
                  },
                  {
                    date: '02 Oct 2025',
                    time: '01:10 PM',
                    color: 'bg-[#eab308]',
                    text: 'University shortlisting approved by student',
                    actor: 'by: Counsellor - Neha Jain',
                  },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${act.color}`} />
                    <div className="leading-tight">
                      <div className="text-[#64748b]">
                        <span className="font-semibold text-[#101d37]">{act.date}</span>{' '}
                        <span>{act.time}</span>
                      </div>
                      <div className="text-[#101d37] font-medium mt-0.5">
                        {act.text} <span className="text-[#64748b] text-[10px]">({act.actor})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SubTab: Timeline View ── */}
      {activeSubTab === 'Timeline' && (
        <div className="bg-white rounded-[8px] border border-[#e5edf5] p-5 shadow-xs space-y-4">
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
            {[
              {
                date: '12 Oct 2025, 10:30 AM',
                title: 'Document verification completed',
                desc: 'All 7 mandatory academic and identification documents marked as Verified.',
                actor: 'Documentation Team (Priya Singh)',
                badge: 'Verification',
                color: 'bg-[#16a34a]',
              },
              {
                date: '10 Oct 2025, 04:15 PM',
                title: 'Conditional Offer Letter Issued',
                desc: 'University of Bologna issued Master admission offer with condition: IELTS 6.5 & Final Transcript.',
                actor: 'Application Team',
                badge: 'Offer Letter',
                color: 'bg-[#087cf5]',
              },
              {
                date: '08 Oct 2025, 11:20 AM',
                title: 'Application Packet Dispatched',
                desc: 'University of Padova Materials Engineering packet transmitted via portal.',
                actor: 'Application Team',
                badge: 'Application',
                color: 'bg-[#087cf5]',
              },
              {
                date: '05 Oct 2025, 03:40 PM',
                title: 'Universitaly Pre-Enrolment Form Submitted',
                desc: 'Official candidate pre-enrolment dossier uploaded to Italian ministry portal.',
                actor: 'Documentation Team',
                badge: 'Pre-Enrolment',
                color: 'bg-[#ea580c]',
              },
              {
                date: '02 Oct 2025, 01:10 PM',
                title: 'University Shortlist Confirmed by Student',
                desc: 'Rahul Sharma approved University of Padova, Bologna, Torino and Pavia.',
                actor: 'Counsellor (Neha Jain)',
                badge: 'Student Approval',
                color: 'bg-[#eab308]',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <span
                  className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${item.color}`}
                />
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#101d37]">{item.title}</span>
                    <span className="text-[11px] text-[#64748b]">{item.date}</span>
                  </div>
                  <p className="text-[11.5px] text-[#52627a] mb-1.5">{item.desc}</p>
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="text-[#64748b]">{item.actor}</span>
                    <span className="font-semibold text-[#087cf5] bg-blue-50 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SubTab: Enrolment View ── */}
      {activeSubTab === 'Enrolment' && (
        <div className="bg-white rounded-[8px] border border-[#e5edf5] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#101d37] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
              <span>Student Enrolment Details &amp; Signed Contract</span>
            </h3>
            <button
              onClick={() => setActiveSubTab('Overview')}
              className="text-xs text-[#087cf5] font-semibold hover:underline"
            >
              Back to Overview
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <p><strong>Package:</strong> {profileData.servicePackage}</p>
              <p><strong>Agreement Status:</strong> {profileData.agreementStatus}</p>
              <p><strong>Total Agreed Fee:</strong> {profileData.totalFee}</p>
              <p><strong>Amount Paid to Date:</strong> {profileData.amountPaid}</p>
              <p><strong>Outstanding Balance:</strong> {profileData.balance}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <p><strong>Enrolment Date:</strong> {profileData.enrollmentDate}</p>
              <p><strong>Assigned Counsellor:</strong> {profileData.counsellor}</p>
              <p><strong>Channel:</strong> upGrad Articulation &amp; Global Admissions</p>
              <p><strong>Intake Target:</strong> {profileData.intake}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Personal Details ── */}
      {editModal === 'personal' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
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
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={profileData.dob}
                  onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Mobile</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
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
                onClick={() => setEditModal(null)}
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
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
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
                  value={profileData.highestQualification}
                  onChange={(e) => setProfileData({ ...profileData, highestQualification: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">University</label>
                <input
                  type="text"
                  value={profileData.university}
                  onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Passing Year</label>
                <input
                  type="text"
                  value={profileData.passingYear}
                  onChange={(e) => setProfileData({ ...profileData, passingYear: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">CGPA</label>
                <input
                  type="text"
                  value={profileData.cgpa}
                  onChange={(e) => setProfileData({ ...profileData, cgpa: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">English Test</label>
                <input
                  type="text"
                  value={profileData.englishTest}
                  onChange={(e) => setProfileData({ ...profileData, englishTest: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Budget</label>
                <input
                  type="text"
                  value={profileData.budget}
                  onChange={(e) => setProfileData({ ...profileData, budget: e.target.value })}
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
                onClick={() => setEditModal(null)}
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
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#101d37]">Edit Program Preferences</h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Country</label>
                <input
                  type="text"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Course Level</label>
                <input
                  type="text"
                  value={profileData.courseLevel}
                  onChange={(e) => setProfileData({ ...profileData, courseLevel: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Preferred Course</label>
                <input
                  type="text"
                  value={profileData.preferredCourse}
                  onChange={(e) => setProfileData({ ...profileData, preferredCourse: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Target Intake</label>
                <input
                  type="text"
                  value={profileData.intake}
                  onChange={(e) => setProfileData({ ...profileData, intake: e.target.value })}
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
                onClick={() => setEditModal(null)}
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
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
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
                  value={profileData.servicePackage}
                  onChange={(e) => setProfileData({ ...profileData, servicePackage: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Total Fee</label>
                <input
                  type="text"
                  value={profileData.totalFee}
                  onChange={(e) => setProfileData({ ...profileData, totalFee: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Amount Paid</label>
                <input
                  type="text"
                  value={profileData.amountPaid}
                  onChange={(e) => setProfileData({ ...profileData, amountPaid: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Balance</label>
                <input
                  type="text"
                  value={profileData.balance}
                  onChange={(e) => setProfileData({ ...profileData, balance: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Agreement Status</label>
                <select
                  value={profileData.agreementStatus}
                  onChange={(e) => setProfileData({ ...profileData, agreementStatus: e.target.value })}
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
                onClick={() => setEditModal(null)}
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
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-5 space-y-4">
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
                    onChange={(e) => setNewAppForm({ ...newAppForm, status: e.target.value })}
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
