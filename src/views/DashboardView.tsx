import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  FileText,
  FileCheck2,
  Send,
  Award,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Filter,
  Layers,
  LayoutGrid,
  ChevronRight,
  Sparkles,
  Edit,
  GraduationCap,
  Building2,
  CheckSquare,
  Compass,
  Monitor,
  Plane,
  CreditCard,
  BarChart3,
  Search,
  ExternalLink,
  Plus,
  AlertCircle,
  RefreshCw,
  Mail,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { Student, DocumentItem, UniversityOption } from '../types/crm';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    tasks,
    toggleTask,
    navigate,
    advanceToEnrolled,
    advanceToShortlisting,
    sendToStudentApproval,
    recordStudentApproval,
    issueOfferLetter,
    updateDocumentStatus,
    addStudentNote,
    stats,
  } = useUpGradWorkflow();

  const [activeTab, setActiveTab] = useState<
    'all' | 'enrolled' | 'documentation' | 'shortlisting' | 'student_approval' | 'application' | 'offer_received'
  >('all');
  const [rightPanelTab, setRightPanelTab] = useState<
    'summary' | 'academic' | 'documents' | 'applications' | 'counselling'
  >('summary');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [lifecycleViewMode, setLifecycleViewMode] = useState<'grid' | 'rail'>('grid');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [newNoteText, setNewNoteText] = useState('');

  // Filter students based on active tab, search, and country
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Tab filter
      if (activeTab === 'enrolled' && s.stage !== 'enrolled' && s.stage !== 'registered' && s.stage !== 'counselling') return false;
      if (activeTab === 'documentation' && s.stage !== 'documentation') return false;
      if (activeTab === 'shortlisting' && s.stage !== 'shortlisting') return false;
      if (activeTab === 'student_approval' && s.stage !== 'student_approval') return false;
      if (activeTab === 'application' && s.stage !== 'application') return false;
      if (activeTab === 'offer_received' && s.stage !== 'offer_received') return false;

      // Country filter
      if (countryFilter !== 'all' && !s.countryInterest.toLowerCase().includes(countryFilter.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchTableQuery.trim()) {
        const query = searchTableQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(query);
        const matchesMobile = s.mobile.includes(query);
        const matchesLeadId = s.leadId.toLowerCase().includes(query);
        const matchesCourse = s.courseInterest.toLowerCase().includes(query);
        if (!matchesName && !matchesMobile && !matchesLeadId && !matchesCourse) {
          return false;
        }
      }

      return true;
    });
  }, [students, activeTab, countryFilter, searchTableQuery]);

  const activeStudent: Student = selectedStudent || filteredStudents[0] || students[0];

  // Real-time lifecycle stage counts (counsellor step removed from pipeline)
  const lifecycleStageCounts = useMemo(() => {
    return {
      profileEnrolled: students.filter((s) => s.stage === 'registered' || s.stage === 'enrolled' || s.stage === 'counselling').length,
      documentation: students.filter((s) => s.stage === 'documentation').length,
      shortlisting: students.filter((s) => s.stage === 'shortlisting').length,
      studentApproval: students.filter((s) => s.stage === 'student_approval').length,
      applications: students.filter((s) => s.stage === 'application').length,
      offerLetters: students.filter((s) => s.stage === 'offer_received').length,
      finalUni: students.filter((s) => s.stage === 'offer_received' || s.approvedUniversities?.length > 0).length,
      scholarship: students.filter((s) => s.scholarshipInterest).length,
      preEnrolment: students.filter((s) => s.stage === 'offer_received').length,
      dovCimea: students.filter((s) => s.stage === 'offer_received').length,
      visa: students.filter((s) => s.stage === 'offer_received').length,
      preDeparture: students.filter((s) => s.stage === 'offer_received').length,
      tasks: tasks.filter((t) => !t.completed).length,
    };
  }, [students, tasks]);

  // 12-Stage Lifecycle Navigator Data
  const lifecycleStages = useMemo(() => [
    {
      step: '01',
      id: 'students',
      name: 'Candidate Profiles',
      shortName: 'Profiles',
      sub: 'Enrolment & Leads',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderHover: 'hover:border-blue-300 hover:bg-blue-50/30',
      activeBorder: 'border-blue-400 bg-blue-50/50 ring-1 ring-blue-400',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      count: lifecycleStageCounts.profileEnrolled,
      phase: 1,
      isActiveStudentHere: ['registered', 'enrolled', 'counselling'].includes(activeStudent?.stage),
    },
    {
      step: '02',
      id: 'documentation',
      name: 'Documentation',
      shortName: 'Docs',
      sub: 'Academic Verification',
      icon: FileCheck2,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      borderHover: 'hover:border-purple-300 hover:bg-purple-50/30',
      activeBorder: 'border-purple-400 bg-purple-50/50 ring-1 ring-purple-400',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      count: lifecycleStageCounts.documentation,
      phase: 1,
      isActiveStudentHere: activeStudent?.stage === 'documentation',
    },
    {
      step: '03',
      id: 'shortlisting',
      name: 'Uni Shortlisting',
      shortName: 'Shortlist',
      sub: 'Course Matching',
      icon: GraduationCap,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      borderHover: 'hover:border-indigo-300 hover:bg-indigo-50/30',
      activeBorder: 'border-indigo-400 bg-indigo-50/50 ring-1 ring-indigo-400',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      count: lifecycleStageCounts.shortlisting,
      phase: 1,
      isActiveStudentHere: activeStudent?.stage === 'shortlisting',
    },
    {
      step: '04',
      id: 'student-approval',
      name: 'Student Approval',
      shortName: 'Approval',
      sub: 'Choice Lock & Consent',
      icon: CheckSquare,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/30',
      activeBorder: 'border-emerald-400 bg-emerald-50/50 ring-1 ring-emerald-400',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      count: lifecycleStageCounts.studentApproval,
      phase: 1,
      isActiveStudentHere: activeStudent?.stage === 'student_approval',
    },
    {
      step: '05',
      id: 'applications',
      name: 'Applications',
      shortName: 'Apply',
      sub: 'Direct Uni Submissions',
      icon: Send,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      borderHover: 'hover:border-cyan-300 hover:bg-cyan-50/30',
      activeBorder: 'border-cyan-400 bg-cyan-50/50 ring-1 ring-cyan-400',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      count: lifecycleStageCounts.applications,
      phase: 1,
      isActiveStudentHere: activeStudent?.stage === 'application',
    },
    {
      step: '06',
      id: 'offer-letters',
      name: 'Offer Letters',
      shortName: 'Offers',
      sub: 'Admissions & Decisions',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/30',
      activeBorder: 'border-emerald-400 bg-emerald-50/50 ring-1 ring-emerald-400',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      count: lifecycleStageCounts.offerLetters,
      phase: 1,
      isActiveStudentHere: activeStudent?.stage === 'offer_received',
    },
    {
      step: '07',
      id: 'final-university',
      name: 'Final University',
      shortName: 'Final Uni',
      sub: 'Enrolment Deposit',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderHover: 'hover:border-blue-300 hover:bg-blue-50/30',
      activeBorder: 'border-blue-400 bg-blue-50/50 ring-1 ring-blue-400',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      count: lifecycleStageCounts.finalUni,
      phase: 2,
      isActiveStudentHere: false,
    },
    {
      step: '08',
      id: 'scholarship',
      name: 'Scholarships & Grants',
      shortName: 'Grants',
      sub: 'Regional DSU Funding',
      icon: Sparkles,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderHover: 'hover:border-amber-300 hover:bg-amber-50/30',
      activeBorder: 'border-amber-400 bg-amber-50/50 ring-1 ring-amber-400',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      count: lifecycleStageCounts.scholarship,
      phase: 2,
      isActiveStudentHere: Boolean(activeStudent?.scholarshipInterest),
    },
    {
      step: '09',
      id: 'pre-enrolment',
      name: 'Universitaly Portal',
      shortName: 'Universitaly',
      sub: 'Official Italian Portal',
      icon: Monitor,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      borderHover: 'hover:border-rose-300 hover:bg-rose-50/30',
      activeBorder: 'border-rose-400 bg-rose-50/50 ring-1 ring-rose-400',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      count: lifecycleStageCounts.preEnrolment,
      phase: 2,
      isActiveStudentHere: false,
    },
    {
      step: '10',
      id: 'dov-cimea',
      name: 'DoV & CIMEA',
      shortName: 'DoV / CIMEA',
      sub: 'Degree Equivalence',
      icon: FileText,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      borderHover: 'hover:border-teal-300 hover:bg-teal-50/30',
      activeBorder: 'border-teal-400 bg-teal-50/50 ring-1 ring-teal-400',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
      count: lifecycleStageCounts.dovCimea,
      phase: 2,
      isActiveStudentHere: false,
    },
    {
      step: '11',
      id: 'visa-process',
      name: 'Visa Process (VFS)',
      shortName: 'Visa (VFS)',
      sub: 'Embassy & Appointments',
      icon: Plane,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      borderHover: 'hover:border-sky-300 hover:bg-sky-50/30',
      activeBorder: 'border-sky-400 bg-sky-50/50 ring-1 ring-sky-400',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      count: lifecycleStageCounts.visa,
      phase: 2,
      isActiveStudentHere: false,
    },
    {
      step: '12',
      id: 'pre-departure',
      name: 'Pre-Departure',
      shortName: 'Arrival',
      sub: 'Housing & Relocation',
      icon: Compass,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      borderHover: 'hover:border-violet-300 hover:bg-violet-50/30',
      activeBorder: 'border-violet-400 bg-violet-50/50 ring-1 ring-violet-400',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
      count: lifecycleStageCounts.preDeparture,
      phase: 2,
      isActiveStudentHere: false,
    },
  ], [lifecycleStageCounts, activeStudent]);

  // Bar Chart Data (Conversion Funnel)
  const barData = [
    { name: 'Leads', count: stats.totalLeads, fill: '#087cf5' },
    { name: 'Profile Done', count: stats.contacted, fill: '#10b981' },
    { name: 'Enrolled', count: stats.enrolled, fill: '#f43f5e' },
    { name: 'In Docs', count: stats.transferredDocs, fill: '#8b5cf6' },
    { name: 'Shortlisted', count: lifecycleStageCounts.shortlisting, fill: '#6366f1' },
    { name: 'Applied', count: stats.inApplication, fill: '#06b6d4' },
    { name: 'Admitted', count: stats.offerReceived, fill: '#10b981' },
  ];

  // Pie Chart Data (Lead Source Breakdown)
  const pieData = [
    { name: 'Google Ads', value: 35, color: '#087cf5' },
    { name: 'Website', value: 25, color: '#06b6d4' },
    { name: 'Instagram', value: 15, color: '#f59e0b' },
    { name: 'Justdial', value: 10, color: '#8b5cf6' },
    { name: 'Referral', value: 10, color: '#10b981' },
    { name: 'upGrad Partner', value: 5, color: '#e21b22' },
  ];

  // Handle posting a quick note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteText.trim() && activeStudent) {
      addStudentNote(activeStudent.id, newNoteText.trim());
      setNewNoteText('');
    }
  };

  // Helper for stage progress percent
  const getStagePercentage = (stage: Student['stage']) => {
    switch (stage) {
      case 'registered':
      case 'counselling':
        return 18;
      case 'enrolled':
        return 35;
      case 'documentation':
        return 52;
      case 'shortlisting':
        return 68;
      case 'student_approval':
        return 82;
      case 'application':
        return 92;
      case 'offer_received':
        return 100;
      default:
        return 20;
    }
  };

  // Helper for document status colors
  const getDocStatusBadge = (status: DocumentItem['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Received':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Re-upload Required':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none">
      {/* ── 1. Top Executive KPI Summary Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {/* Total Leads */}
        <div
          onClick={() => setActiveTab('all')}
          className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === 'all'
              ? 'border-[#087cf5] shadow-sm ring-1 ring-[#087cf5]/30'
              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{stats.totalLeads}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Total Leads</div>
            <div className="text-[10px] font-bold text-blue-600 truncate">↑ 12% live</div>
          </div>
        </div>

        {/* Contacted */}
        <div
          onClick={() => setActiveTab('all')}
          className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{stats.contacted}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Contacted</div>
            <div className="text-[10px] font-bold text-emerald-600 truncate">↑ 8% rate</div>
          </div>
        </div>

        {/* Profile Ready / Enrolled */}
        <div
          onClick={() => setActiveTab('enrolled')}
          className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === 'enrolled'
              ? 'border-[#087cf5] shadow-sm ring-1 ring-[#087cf5]/30'
              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{lifecycleStageCounts.profileEnrolled}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Profiles Ready</div>
            <div className="text-[10px] font-bold text-amber-600 truncate">Enrolled</div>
          </div>
        </div>

        {/* Enrolled Active */}
        <div
          onClick={() => setActiveTab('enrolled')}
          className="bg-white rounded-xl p-3 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{stats.enrolled}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Agreement Done</div>
            <div className="text-[10px] font-bold text-rose-600 truncate">Contract Signed</div>
          </div>
        </div>

        {/* Transferred to Documentation */}
        <div
          onClick={() => setActiveTab('documentation')}
          className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === 'documentation'
              ? 'border-[#087cf5] shadow-sm ring-1 ring-[#087cf5]/30'
              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{stats.transferredDocs}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Documentation</div>
            <div className="text-[10px] font-bold text-purple-600 truncate">Verification</div>
          </div>
        </div>

        {/* In Application */}
        <div
          onClick={() => setActiveTab('application')}
          className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === 'application'
              ? 'border-[#087cf5] shadow-sm ring-1 ring-[#087cf5]/30'
              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{stats.inApplication}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">In Application</div>
            <div className="text-[10px] font-bold text-cyan-600 truncate">Active Filing</div>
          </div>
        </div>

        {/* Offer Received */}
        <div
          onClick={() => setActiveTab('offer_received')}
          className={`bg-white rounded-xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
            activeTab === 'offer_received'
              ? 'border-[#087cf5] shadow-sm ring-1 ring-[#087cf5]/30'
              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-emerald-700 leading-tight">{stats.offerReceived}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Offer Received</div>
            <div className="text-[10px] font-bold text-emerald-600 truncate">Admitted 🎉</div>
          </div>
        </div>
      </div>

      {/* ── 2. Main Workstation: Pipeline Table (65%) + Comprehensive Inspector Drawer (35%) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column (8 cols ~ 66%) */}
        <div className="lg:col-span-8 space-y-3 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 sm:p-4">
            {/* Table Filters & Header Tabs */}
            <div className="flex flex-col gap-3 pb-3 border-b border-slate-100">
              {/* Row 1: Stage Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Leads ({students.length})
                </button>
                <button
                  onClick={() => setActiveTab('enrolled')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'enrolled'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Enrolled ({lifecycleStageCounts.profileEnrolled})
                </button>
                <button
                  onClick={() => setActiveTab('documentation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'documentation'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Docs ({students.filter((s) => s.stage === 'documentation').length})
                </button>
                <button
                  onClick={() => setActiveTab('shortlisting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'shortlisting'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Shortlist ({students.filter((s) => s.stage === 'shortlisting').length})
                </button>
                <button
                  onClick={() => setActiveTab('student_approval')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'student_approval'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Approval ({students.filter((s) => s.stage === 'student_approval').length})
                </button>
                <button
                  onClick={() => setActiveTab('application')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'application'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Applications ({students.filter((s) => s.stage === 'application').length})
                </button>
                <button
                  onClick={() => setActiveTab('offer_received')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'offer_received'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Offers ({students.filter((s) => s.stage === 'offer_received').length})
                </button>
              </div>

              {/* Row 2: Search, Country Filter, and Table/Kanban Switcher */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filter by name, mobile, course..."
                      value={searchTableQuery}
                      onChange={(e) => setSearchTableQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#087cf5] focus:bg-white transition-all"
                    />
                  </div>

                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="py-1 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
                  >
                    <option value="all">All Countries</option>
                    <option value="italy">Italy 🇮🇹</option>
                    <option value="germany">Germany 🇩🇪</option>
                    <option value="canada">Canada 🇨🇦</option>
                    <option value="kingdom">UK 🇬🇧</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Showing {filteredStudents.length} of {students.length}
                  </span>

                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                      }`}
                    >
                      Table
                    </button>
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                      }`}
                    >
                      Kanban
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' ? (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-2 w-8 text-center">#</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Country &amp; Course</th>
                      <th className="py-2.5 px-3">Academics &amp; Test</th>
                      <th className="py-2.5 px-3">Docs Progress</th>
                      <th className="py-2.5 px-3">Pipeline Status</th>
                      <th className="py-2.5 px-3">Next Follow-up</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredStudents.map((student, idx) => {
                      const isSelected = activeStudent?.id === student.id;
                      const verifiedDocsCount = student.documents?.filter((d) => d.status === 'Approved').length || 0;
                      const totalDocsCount = student.documents?.length || 1;
                      const docPercentage = Math.round((verifiedDocsCount / totalDocsCount) * 100);

                      return (
                        <tr
                          key={student.id}
                          onClick={() => setSelectedStudent(student)}
                          className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50/70 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3 px-2 text-center text-slate-400 text-[11px]">
                            {idx + 1}
                          </td>

                          {/* Student Name & Avatar */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 hover:text-[#087cf5] transition-colors truncate max-w-[140px]">
                                  {student.name}
                                </div>
                                <div className="text-[11px] text-slate-500 font-normal truncate max-w-[140px]">
                                  {student.mobile} &bull; {student.leadId}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Country & Course */}
                          <td className="py-3 px-3 max-w-[160px]">
                            <div className="font-bold text-slate-800 truncate" title={student.countryInterest}>
                              {student.countryInterest}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate" title={student.courseInterest}>
                              {student.courseInterest}
                            </div>
                          </td>

                          {/* Academics & Test */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="text-[11.5px] font-bold text-slate-800">
                              {student.graduationScore}
                            </div>
                            <div className="text-[10.5px] text-blue-700 font-semibold">
                              {student.testType} {student.overallBand}
                            </div>
                          </td>

                          {/* Documents Progress Bar */}
                          <td className="py-3 px-3 min-w-[120px]">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                              <span>{verifiedDocsCount}/{totalDocsCount} Verified</span>
                              <span>{docPercentage}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  docPercentage >= 80
                                    ? 'bg-emerald-500'
                                    : docPercentage >= 50
                                    ? 'bg-blue-500'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${docPercentage}%` }}
                              />
                            </div>
                          </td>

                          {/* Status Pill */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                student.stage === 'offer_received'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : student.stage === 'application'
                                  ? 'bg-cyan-100 text-cyan-800'
                                  : student.stage === 'student_approval'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : student.stage === 'shortlisting'
                                  ? 'bg-blue-100 text-blue-800'
                                  : student.stage === 'documentation'
                                  ? 'bg-purple-100 text-purple-800'
                                  : student.stage === 'enrolled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {student.statusText}
                            </span>
                          </td>

                          {/* Next Follow-up */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="text-[11px] font-bold text-[#087cf5]">
                              {student.nextFollowUpDate}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {student.nextFollowUpTime || 'Morning'}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => alert(`Calling ${student.name}: ${student.mobile}`)}
                                title="Voice Call"
                                className="w-7 h-7 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => alert(`Opening WhatsApp with ${student.name}...`)}
                                title="WhatsApp Chat"
                                className="w-7 h-7 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => navigate('documentation', student.id)}
                                title="Open Documentation"
                                className="w-7 h-7 rounded-lg text-purple-600 hover:bg-purple-50 flex items-center justify-center transition-colors"
                              >
                                <FileCheck2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => navigate('shortlisting', student.id)}
                                title="Open Shortlisting"
                                className="w-7 h-7 rounded-lg text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                              >
                                <GraduationCap className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Kanban View */
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
                {[
                  { id: 'documentation', label: 'Documentation Verification' },
                  { id: 'shortlisting', label: 'University Shortlisting' },
                  { id: 'student_approval', label: 'Awaiting Student Approval' },
                  { id: 'application', label: 'Applications in Process' },
                ].map((col) => {
                  const stageStudents = students.filter((s) => s.stage === col.id);
                  return (
                    <div key={col.id} className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-800 truncate">{col.label}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white text-slate-600 shadow-2xs">
                          {stageStudents.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {stageStudents.map((st) => (
                          <div
                            key={st.id}
                            onClick={() => setSelectedStudent(st)}
                            className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs hover:border-[#087cf5] transition-all cursor-pointer"
                          >
                            <div className="font-bold text-xs text-slate-900 truncate">{st.name}</div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {st.courseInterest} &bull; {st.countryInterest}
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                              <span>{st.leadId}</span>
                              <span className="text-[#087cf5] font-semibold">{st.leadSource}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Lead / Student Comprehensive Details Inspector (4 cols ~ 34%) */}
        {activeStudent && (
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3.5 min-w-0">
            {/* Header with Avatar & Details */}
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={activeStudent.avatar}
                  alt={activeStudent.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-[150px]">
                      {activeStudent.name}
                    </h3>
                    <span className="text-[9.5px] font-bold px-2 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                      {activeStudent.stage}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    Lead ID: <span className="font-mono font-bold text-slate-700">{activeStudent.leadId}</span>
                  </div>
                  <div className="text-[10.5px] text-slate-400 truncate">
                    {activeStudent.mobile} &bull; {activeStudent.email}
                  </div>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => alert(`Calling ${activeStudent.name}: ${activeStudent.mobile}`)}
                  title="Call student"
                  className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert(`WhatsApp chat with ${activeStudent.name}`)}
                  title="WhatsApp"
                  className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('students', activeStudent.id)}
                  title="Open Full Profile"
                  className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Visual Workflow Pipeline Stepper ── */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                <span>Pipeline Stage</span>
                <span className="text-[#087cf5] font-black">{activeStudent.statusText}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#087cf5] to-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${getStagePercentage(activeStudent.stage)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mt-1">
                <span className={activeStudent.stage === 'registered' ? 'text-[#087cf5]' : ''}>Profile</span>
                <span className={activeStudent.stage === 'enrolled' ? 'text-[#087cf5]' : ''}>Enrolled</span>
                <span className={activeStudent.stage === 'documentation' ? 'text-[#087cf5]' : ''}>Docs</span>
                <span className={activeStudent.stage === 'shortlisting' ? 'text-[#087cf5]' : ''}>Shortlist</span>
                <span className={activeStudent.stage === 'student_approval' ? 'text-[#087cf5]' : ''}>Approval</span>
                <span className={activeStudent.stage === 'application' ? 'text-[#087cf5]' : ''}>Apply</span>
                <span className={activeStudent.stage === 'offer_received' ? 'text-emerald-600' : ''}>Offer</span>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 gap-1 text-[11px] font-bold text-slate-500 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'summary', label: 'Summary' },
                  { id: 'academic', label: 'Academics & Test' },
                  { id: 'documents', label: 'Documents' },
                  { id: 'applications', label: 'Universities' },
                  { id: 'counselling', label: 'Notes' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRightPanelTab(tab.id)}
                  className={`pb-1.5 px-2 whitespace-nowrap transition-colors ${
                    rightPanelTab === tab.id
                      ? 'text-[#087cf5] border-b-2 border-[#087cf5]'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Sub-tab 1: Complete Executive Summary & Section Links ── */}
            {rightPanelTab === 'summary' && (
              <div className="space-y-3 text-xs">
                {/* Study Preferences Summary */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-slate-600">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Target Study Plan</span>
                    <span className="font-semibold text-slate-600">{activeStudent.universityType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-bold text-slate-900">{activeStudent.countryInterest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[170px]" title={activeStudent.courseInterest}>
                      {activeStudent.courseInterest}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Intake / Budget:</span>
                    <span className="font-bold text-slate-800">
                      {activeStudent.intake} &bull; {activeStudent.budget}
                    </span>
                  </div>
                </div>

                {/* Academic & Documents Snapshot */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Graduation</span>
                    <span className="font-extrabold text-blue-700 text-xs">{activeStudent.graduationScore}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="text-[10px] text-slate-500 block">{activeStudent.testType} Band</span>
                    <span className="font-extrabold text-emerald-700 text-xs">{activeStudent.overallBand}</span>
                  </div>
                </div>

                {/* Live Section Direct Jump Shortcuts */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Quick Section Links
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => navigate('documentation', activeStudent.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-left text-[11px] font-bold text-slate-700 flex items-center justify-between group transition-colors"
                    >
                      <span className="group-hover:text-purple-700">Documentation</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-purple-600" />
                    </button>
                    <button
                      onClick={() => navigate('shortlisting', activeStudent.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-left text-[11px] font-bold text-slate-700 flex items-center justify-between group transition-colors"
                    >
                      <span className="group-hover:text-blue-700">Shortlisting</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => navigate('student-approval', activeStudent.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-left text-[11px] font-bold text-slate-700 flex items-center justify-between group transition-colors"
                    >
                      <span className="group-hover:text-emerald-700">Student Approval</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                    </button>
                    <button
                      onClick={() => navigate('applications', activeStudent.id)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 text-left text-[11px] font-bold text-slate-700 flex items-center justify-between group transition-colors"
                    >
                      <span className="group-hover:text-cyan-700">Applications</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-600" />
                    </button>
                  </div>
                </div>

                {/* Follow-up reminder */}
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-amber-900 text-[11.5px]">
                      Follow-up: {activeStudent.nextFollowUpDate} at {activeStudent.nextFollowUpTime || '11:00 AM'}
                    </div>
                    <div className="text-[10.5px] text-amber-800 leading-snug mt-0.5">
                      {activeStudent.nextFollowUpNote || 'Discuss university application documents and finalize choices.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Sub-tab 2: Academics & Test Details ── */}
            {rightPanelTab === 'academic' && (
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">10th Secondary</div>
                  <div className="flex justify-between mt-1 text-[11px]">
                    <span>{activeStudent.tenthBoard}</span>
                    <span className="font-bold text-emerald-700">{activeStudent.tenthPercentage}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">12th Higher Secondary</div>
                  <div className="flex justify-between mt-1 text-[11px]">
                    <span className="truncate max-w-[160px]">{activeStudent.twelfthStream}</span>
                    <span className="font-bold text-emerald-700">{activeStudent.twelfthPercentage}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">Undergraduate Degree</div>
                  <div className="text-[11px] text-slate-700 font-medium truncate">{activeStudent.graduationDegree}</div>
                  <div className="flex justify-between mt-1 text-[11px]">
                    <span className="truncate max-w-[160px]">{activeStudent.graduationUniversity}</span>
                    <span className="font-bold text-blue-700">{activeStudent.graduationScore}</span>
                  </div>
                </div>

                {/* English Test Score Card */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-emerald-900">{activeStudent.testType} Official Score</span>
                    <span className="text-xs font-black text-emerald-700">Band {activeStudent.overallBand}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="p-1 rounded bg-white border border-emerald-100">
                      <span className="text-[9px] text-slate-400 block">L</span>
                      <span className="font-bold text-slate-800">{activeStudent.listening}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-emerald-100">
                      <span className="text-[9px] text-slate-400 block">R</span>
                      <span className="font-bold text-slate-800">{activeStudent.reading}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-emerald-100">
                      <span className="text-[9px] text-slate-400 block">W</span>
                      <span className="font-bold text-slate-800">{activeStudent.writing}</span>
                    </div>
                    <div className="p-1 rounded bg-white border border-emerald-100">
                      <span className="text-[9px] text-slate-400 block">S</span>
                      <span className="font-bold text-slate-800">{activeStudent.speaking}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Sub-tab 3: Documents Checklist & Quick Status ── */}
            {rightPanelTab === 'documents' && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-[11.5px]">Uploaded Documents</span>
                  <button
                    onClick={() => navigate('documentation', activeStudent.id)}
                    className="text-[10.5px] font-bold text-[#087cf5] hover:underline"
                  >
                    Open Workspace &rarr;
                  </button>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {activeStudent.documents?.slice(0, 7).map((doc) => (
                    <div
                      key={doc.id}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 text-[11px] truncate" title={doc.name}>
                          {doc.name}
                        </div>
                        <div className="text-[9.5px] text-slate-400 truncate">
                          {doc.category} &bull; {doc.verifiedBy || 'Pending verification'}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${getDocStatusBadge(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>

                        {doc.status !== 'Approved' && (
                          <button
                            onClick={() => updateDocumentStatus(activeStudent.id, doc.id, 'Approved')}
                            title="Verify and Approve Document"
                            className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Sub-tab 4: Universities & Applications ── */}
            {rightPanelTab === 'applications' && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-[11.5px]">Shortlisted Choices</span>
                  <button
                    onClick={() => navigate('shortlisting', activeStudent.id)}
                    className="text-[10.5px] font-bold text-[#087cf5] hover:underline"
                  >
                    Manage Shortlist &rarr;
                  </button>
                </div>

                {activeStudent.shortlistedUniversities?.length > 0 ? (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {activeStudent.shortlistedUniversities.map((uni) => (
                      <div
                        key={uni.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 text-[11px] truncate">
                            {uni.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {uni.course} &bull; {uni.country}
                          </div>
                          <div className="text-[9.5px] text-slate-400">
                            Tuition: {uni.tuitionFee} &bull; Deadline: {uni.deadline}
                          </div>
                        </div>

                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 shrink-0">
                          {uni.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-slate-400 text-xs bg-slate-50 rounded-lg border border-slate-200">
                    No universities shortlisted yet.
                  </div>
                )}

                {/* Active Application Records */}
                {activeStudent.applications?.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-800 text-[11px] block">
                      Active Applications ({activeStudent.applications.length})
                    </span>
                    {activeStudent.applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-2 rounded-lg bg-cyan-50/50 border border-cyan-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-[11px] truncate">
                            {app.universityName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            Status: <span className="font-semibold text-cyan-800">{app.status}</span>
                          </div>
                        </div>

                        {app.currentStep !== 6 && (
                          <button
                            onClick={() => issueOfferLetter(activeStudent.id, app.id)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0"
                          >
                            Issue Offer
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Sub-tab 5: Profile Notes ── */}
            {rightPanelTab === 'counselling' && (
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div className="font-bold text-slate-900 mb-1 text-[11.5px]">Profile Assessment</div>
                  <p className="leading-relaxed">{activeStudent.counsellingNotes || 'Profile verified. Ready for university documentation and applications.'}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[10.5px] text-slate-500 flex justify-between">
                    <span>Officer: <strong className="text-slate-800">{activeStudent.assignedCounsellor || 'Admissions Team'}</strong></span>
                    <span>Docs Exec: <strong className="text-slate-800">{activeStudent.assignedDocExecutive || 'Documentation Team'}</strong></span>
                  </div>
                </div>

                {/* Add Quick Internal Note Form */}
                <form onSubmit={handleAddNote} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span>Add Internal Staff Note</span>
                  </div>
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter interaction note or next action..."
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
                  />
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="w-full py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] disabled:opacity-50 text-white text-[11.5px] font-bold transition-colors cursor-pointer"
                  >
                    Post Note
                  </button>
                </form>
              </div>
            )}

            {/* ── Direct Stage Advancement Action Button ── */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {activeStudent.stage === 'registered' || activeStudent.stage === 'counselling' || activeStudent.stage === 'enrolled' ? (
                <button
                  onClick={() => {
                    advanceToEnrolled(activeStudent.id);
                    navigate('documentation', activeStudent.id);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Complete Profile &rarr; Advance to Docs</span>
                </button>
              ) : activeStudent.stage === 'documentation' ? (
                <button
                  onClick={() => {
                    advanceToShortlisting(activeStudent.id);
                    navigate('shortlisting', activeStudent.id);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 shrink-0" />
                  <span>Docs Complete &rarr; Open Shortlisting</span>
                </button>
              ) : activeStudent.stage === 'shortlisting' ? (
                <button
                  onClick={() => {
                    sendToStudentApproval(activeStudent.id);
                    navigate('student-approval', activeStudent.id);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Shortlist Ready &rarr; Send for Student Approval</span>
                </button>
              ) : activeStudent.stage === 'student_approval' ? (
                <button
                  onClick={() => {
                    recordStudentApproval(
                      activeStudent.id,
                      activeStudent.shortlistedUniversities.map((u) => u.id)
                    );
                    navigate('applications', activeStudent.id);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4 shrink-0" />
                  <span>Student Confirmed &rarr; Open Applications</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('applications', activeStudent.id)}
                  className="w-full py-2 px-3 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Manage Active Applications</span>
                </button>
              )}

              {/* Secondary Fast Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert(`Scheduling appointment for ${activeStudent.name}...`)}
                  className="py-1.5 px-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11.5px] font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Schedule Call</span>
                </button>
                <button
                  onClick={() => alert(`Dispatching email update to ${activeStudent.email}...`)}
                  className="py-1.5 px-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11.5px] font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Lifecycle Stage Navigator (Direct Access Across All 12 Operational Stages) ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3.5 sm:p-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#087cf5] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-black text-slate-900 tracking-tight">
                  Lifecycle Stage Navigator
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                  12 Operational Stages
                </span>
                {activeStudent && (
                  <span className="hidden sm:inline-flex text-[10px] font-semibold text-slate-400">
                    Active Student: <span className="font-bold text-slate-700 ml-1">{activeStudent.name}</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Direct access across all operational stages · Click any stage to open its dedicated view
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher: Grid (2x6) vs Pipeline Rail */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-[11px] font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setLifecycleViewMode('grid')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  lifecycleViewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                    : 'hover:text-slate-900'
                }`}
                title="Structured 2-Phase Grid Overview"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>Grid View</span>
              </button>
              <button
                type="button"
                onClick={() => setLifecycleViewMode('rail')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  lifecycleViewMode === 'rail'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                    : 'hover:text-slate-900'
                }`}
                title="Continuous Linear Workflow Rail"
              >
                <ArrowRight className="w-3.5 h-3.5 text-[#087cf5]" />
                <span>Timeline Rail</span>
              </button>
            </div>

            <button
              onClick={() => navigate('students')}
              className="text-[11px] font-bold text-[#087cf5] hover:text-blue-700 hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50/60 hover:bg-blue-50 border border-blue-100 transition-colors"
            >
              <span>View All Students</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content based on lifecycleViewMode */}
        {lifecycleViewMode === 'grid' ? (
          <div className="space-y-3">
            {/* Phase 1: Admissions & Applications */}
            <div>
              <div className="flex items-center gap-2 mb-2 px-0.5">
                <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">
                  Phase 1 · Admission & Applications (Steps 01 – 06)
                </span>
                <div className="h-px bg-slate-100 flex-1" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {lifecycleStages.slice(0, 6).map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => navigate(stage.id, activeStudent?.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all group flex flex-col justify-between relative bg-white hover:shadow-xs ${
                      stage.isActiveStudentHere
                        ? `${stage.activeBorder} shadow-2xs`
                        : `border-slate-200/90 ${stage.borderHover}`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 transition-colors shrink-0">
                          {stage.step}
                        </span>
                        <div className={`w-6 h-6 rounded-lg ${stage.bg} ${stage.color} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform`}>
                          <stage.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border shadow-2xs shrink-0 ${stage.badgeClass}`}>
                        {stage.count}
                      </span>
                    </div>

                    <div className="min-w-0 w-full">
                      <div className="text-[11.5px] font-extrabold text-slate-800 group-hover:text-[#087cf5] transition-colors leading-snug truncate">
                        {stage.name}
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors leading-tight truncate mt-0.5 flex items-center justify-between">
                        <span className="truncate">{stage.sub}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#087cf5] shrink-0" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Phase 2: Enrolment, Visa & Arrival */}
            <div>
              <div className="flex items-center gap-2 mb-2 px-0.5">
                <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">
                  Phase 2 · Enrolment, Visa & Relocation (Steps 07 – 12)
                </span>
                <div className="h-px bg-slate-100 flex-1" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {lifecycleStages.slice(6, 12).map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => navigate(stage.id, activeStudent?.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all group flex flex-col justify-between relative bg-white hover:shadow-xs ${
                      stage.isActiveStudentHere
                        ? `${stage.activeBorder} shadow-2xs`
                        : `border-slate-200/90 ${stage.borderHover}`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 transition-colors shrink-0">
                          {stage.step}
                        </span>
                        <div className={`w-6 h-6 rounded-lg ${stage.bg} ${stage.color} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform`}>
                          <stage.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border shadow-2xs shrink-0 ${stage.badgeClass}`}>
                        {stage.count}
                      </span>
                    </div>

                    <div className="min-w-0 w-full">
                      <div className="text-[11.5px] font-extrabold text-slate-800 group-hover:text-[#087cf5] transition-colors leading-snug truncate">
                        {stage.name}
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors leading-tight truncate mt-0.5 flex items-center justify-between">
                        <span className="truncate">{stage.sub}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#087cf5] shrink-0" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin scroll-smooth">
              {lifecycleStages.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => navigate(stage.id, activeStudent?.id)}
                    className={`shrink-0 w-44 p-2.5 rounded-xl border text-left transition-all group flex flex-col justify-between bg-white hover:shadow-xs ${
                      stage.isActiveStudentHere
                        ? `${stage.activeBorder} shadow-2xs`
                        : `border-slate-200/90 ${stage.borderHover}`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 shrink-0">
                          {stage.step}
                        </span>
                        <div className={`w-6 h-6 rounded-lg ${stage.bg} ${stage.color} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform`}>
                          <stage.icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border shadow-2xs shrink-0 ${stage.badgeClass}`}>
                        {stage.count}
                      </span>
                    </div>

                    <div className="min-w-0 w-full">
                      <div className="text-[11.5px] font-extrabold text-slate-800 group-hover:text-[#087cf5] transition-colors leading-snug truncate">
                        {stage.name}
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors leading-tight truncate mt-0.5">
                        {stage.sub}
                      </div>
                    </div>
                  </button>

                  {idx < lifecycleStages.length - 1 && (
                    <div className="shrink-0 text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 4. Bottom Analytics & Operational Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
        {/* Widget 1: Today's Tasks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#087cf5]" />
                <span>Today&apos;s Follow-ups</span>
              </h4>
              <button
                onClick={() => navigate('tasks')}
                className="text-[11px] font-semibold text-[#087cf5] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-[#087cf5] focus:ring-blue-400 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-snug truncate ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400">{task.time}</span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                          task.tag === 'Due Now'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {task.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 2: Funnel Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-900">Conversion Funnel</h4>
            <span className="text-[10.5px] font-semibold text-slate-400">Live Metric</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Widget 3: Lead Source Breakdown Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-slate-900">Lead Source Channels</h4>
            <span className="text-[10px] font-semibold text-slate-400">Monthly</span>
          </div>

          <div className="flex items-center justify-between h-44">
            <div className="w-1/2 h-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={32}
                    outerRadius={52}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-xs font-black text-slate-900">{stats.totalLeads}</span>
                <span className="text-[9px] text-slate-400 block">Total</span>
              </div>
            </div>

            <div className="w-1/2 space-y-1 text-[11px] text-slate-600 pl-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 4: Destination Country Demand */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900">Country Demand</h4>
            <span className="text-[10px] font-semibold text-slate-400">Top Destinations</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>🇮🇹 Italy</span>
                <span className="font-bold text-slate-900">16 Leads</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#087cf5] h-full rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>🇩🇪 Germany</span>
                <span className="font-bold text-slate-900">10 Leads</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#10b981] h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>🇨🇦 Canada</span>
                <span className="font-bold text-slate-900">8 Leads</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>🇬🇧 United Kingdom</span>
                <span className="font-bold text-slate-900">6 Leads</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#8b5cf6] h-full rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
