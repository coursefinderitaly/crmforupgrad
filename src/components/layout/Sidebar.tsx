import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  GraduationCap,
  CheckSquare,
  Send,
  Award,
  Building2,
  Sparkles,
  Monitor,
  FileText,
  Plane,
  Compass,
  MessageSquare,
  BarChart3,
  CreditCard,
  Settings,
  PlusCircle,
} from 'lucide-react';
import { useUpGradWorkflow } from '../../context/UpGradWorkflowContext';

interface SidebarProps {
  onOpenRegisterModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenRegisterModal }) => {
  const { currentRoute, navigate, students, tasks } = useUpGradWorkflow();

  const pendingDocsCount = students.filter((s) =>
    s.documents.some((d) => d.status === 'Pending' || d.status === 'Under Review')
  ).length;

  const shortlistingCount = students.filter(
    (s) => s.stage === 'shortlisting' || s.shortlistedUniversities.length > 0
  ).length;

  const applicationsCount = students.reduce(
    (acc, s) => acc + (s.applications ? s.applications.length : 0),
    0
  );

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const mainLifecycleNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: students.length },
    { id: 'documentation', label: 'Documentation', icon: FileCheck2, badge: pendingDocsCount },
    { id: 'shortlisting', label: 'University Shortlisting', icon: GraduationCap, badge: shortlistingCount },
    { id: 'student-approval', label: 'Student Approval', icon: CheckSquare },
    { id: 'applications', label: 'Applications', icon: Send, badge: applicationsCount },
    { id: 'offer-letters', label: 'Offer Letters', icon: Award },
    { id: 'final-university', label: 'Final University', icon: Building2 },
    { id: 'scholarship', label: 'Scholarship', icon: Sparkles },
    { id: 'pre-enrolment', label: 'Pre-Enrolment', icon: Monitor },
    { id: 'dov-cimea', label: 'DoV / CIMEA', icon: FileText },
    { id: 'visa-process', label: 'Visa Process', icon: Plane },
    { id: 'pre-departure', label: 'Pre-Departure & Arrival', icon: Compass },
  ];

  const secondaryNav = [
    { id: 'tasks', label: 'Tasks & Follow-ups', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'communication', label: 'Communications', icon: MessageSquare },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'finance', label: 'Finance & Payments', icon: CreditCard },
    { id: 'hr', label: 'HR (Employees)', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 bg-[#07182c] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-[#152e4d]">
      <div className="overflow-y-auto max-h-screen scrollbar-none">
        {/* Brand Header */}
        <div className="p-3.5 border-b border-[#132c4a] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#087cf5] to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-950/40 shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="font-extrabold text-white text-[13px] tracking-tight leading-tight flex items-center gap-1.5 truncate">
              <span>Presume</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-600/30 text-red-300 border border-red-500/30 shrink-0">
                upGrad
              </span>
            </div>
            <div className="text-[9.5px] text-slate-400 font-medium truncate leading-tight mt-0.5">
              Overseas Education (OPC) Pvt. Ltd.
            </div>
          </div>
        </div>

        {/* Main Lifecycle Navigation */}
        <div className="px-2 py-2 space-y-0.5">
          {mainLifecycleNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#087cf5] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#0f2a4a]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8ca0ba]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                      isActive ? 'bg-white text-[#087cf5]' : 'bg-[#15345a] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-1.5 border-t border-[#132c4a]" />

        {/* Secondary Management Navigation */}
        <div className="px-2 pb-3 space-y-0.5">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#087cf5] text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#0f2a4a]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8ca0ba]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                      isActive ? 'bg-white text-[#087cf5]' : 'bg-[#15345a] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-2.5 border-t border-[#132c4a] bg-[#051426]/70 flex items-center justify-between text-[11px]">
        <button
          onClick={onOpenRegisterModal}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 shrink-0" />
          <span>New Student</span>
        </button>
      </div>
    </aside>
  );
};
