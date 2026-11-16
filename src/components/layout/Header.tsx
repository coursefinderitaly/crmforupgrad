import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Calendar,
  LogOut,
  ChevronDown,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  FileCheck2,
  Award,
  UserCheck,
  X,
  ExternalLink,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Send,
  GraduationCap,
  AlertCircle,
  Users,
} from 'lucide-react';
import { useUpGradWorkflow } from '../../context/UpGradWorkflowContext';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal }) => {
  const {
    currentUser,
    logout,
    resetDemoData,
    students,
    setSelectedStudent,
    navigate,
    tasks,
  } = useUpGradWorkflow();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter students based on query
  const filteredSearchStudents = searchQuery.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.mobile.includes(searchQuery) ||
          s.leadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.countryInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.courseInterest.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Notifications derived from actual live CRM data
  const notificationsList = [
    {
      id: 'notif-1',
      title: 'Offer Letter Received',
      detail: 'Rahul Sharma received admission offer from University of Bologna',
      time: '10m ago',
      type: 'offer',
      icon: Award,
      iconColor: 'text-emerald-600 bg-emerald-50',
      route: 'offer-letters',
      studentId: 'stu-rahul',
    },
    {
      id: 'notif-2',
      title: 'Student Approved Choices',
      detail: 'Priya Singh confirmed 2 universities for application filing',
      time: '35m ago',
      type: 'approval',
      icon: UserCheck,
      iconColor: 'text-indigo-600 bg-indigo-50',
      route: 'applications',
      studentId: 'stu-priya',
    },
    {
      id: 'notif-3',
      title: 'Document Review Required',
      detail: '12th Marksheet & IELTS score card pending verification',
      time: '1h ago',
      type: 'docs',
      icon: FileCheck2,
      iconColor: 'text-purple-600 bg-purple-50',
      route: 'documentation',
      studentId: 'stu-rahul',
    },
    {
      id: 'notif-4',
      title: 'Solvency Statement Flagged',
      detail: 'Re-upload required for Rahul Sharma (28-day rule)',
      time: '2h ago',
      type: 'alert',
      icon: AlertCircle,
      iconColor: 'text-rose-600 bg-rose-50',
      route: 'documentation',
      studentId: 'stu-rahul',
    },
    {
      id: 'notif-5',
      title: 'Follow-up Due Now',
      detail: 'Schedule call with Amit Kumar for visa document review',
      time: '3h ago',
      type: 'task',
      icon: Clock,
      iconColor: 'text-amber-600 bg-amber-50',
      route: 'tasks',
      studentId: 'stu-amit',
    },
  ];

  const unreadCount = notificationsList.filter(
    (n) => !readNotifications.includes(n.id)
  ).length;

  // Calendar agenda schedule items
  const calendarItems = [
    {
      id: 'cal-1',
      time: '11:00 AM',
      title: 'Counselling Follow-up Call',
      person: 'Rahul Sharma',
      tag: 'Italy Admissions',
      tagColor: 'bg-blue-50 text-blue-700',
      studentId: 'stu-rahul',
    },
    {
      id: 'cal-2',
      time: '12:30 PM',
      title: 'University Shortlist Consultation',
      person: 'Priya Singh',
      tag: 'Germany IU 1+1',
      tagColor: 'bg-emerald-50 text-emerald-700',
      studentId: 'stu-priya',
    },
    {
      id: 'cal-3',
      time: '02:00 PM',
      title: 'Application Fee Confirmation',
      person: 'Amit Kumar',
      tag: 'Canada / Italy',
      tagColor: 'bg-amber-50 text-amber-700',
      studentId: 'stu-amit',
    },
    {
      id: 'cal-4',
      time: '04:30 PM',
      title: 'Pre-Departure Briefing Webinar',
      person: 'Enrolled Batch',
      tag: 'Rome / Berlin',
      tagColor: 'bg-purple-50 text-purple-700',
    },
  ];

  const handleSelectStudentFromSearch = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setSearchQuery('');
    setShowSearchResults(false);
    navigate('dashboard', student.id);
  };

  const handleNotificationClick = (route: string, studentId?: string, notifId?: string) => {
    if (notifId && !readNotifications.includes(notifId)) {
      setReadNotifications((prev) => [...prev, notifId]);
    }
    setShowNotifications(false);
    navigate(route, studentId);
  };

  return (
    <>
      {/* Background overlay for popover dismissal */}
      {(showNotifications || showCalendar || showProfileMenu) && (
        <div
          className="fixed inset-0 z-20 bg-transparent"
          onClick={() => {
            setShowNotifications(false);
            setShowCalendar(false);
            setShowProfileMenu(false);
          }}
        />
      )}

      <header className="h-14 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs gap-3">
        {/* Left: Global Quick Search with Live Interactive Results */}
        <div
          ref={searchContainerRef}
          className="relative flex items-center flex-1 max-w-md min-w-0"
        >
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Name, Mobile, Student ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#087cf5] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Live Search Results Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-80 overflow-y-auto">
              <div className="px-3 py-1 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Matching Students ({filteredSearchStudents.length})</span>
                <span className="text-[10px] text-slate-400">Click to view in Dashboard</span>
              </div>

              {filteredSearchStudents.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {filteredSearchStudents.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleSelectStudentFromSearch(st)}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between gap-2.5 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="text-[12px] font-bold text-slate-900 group-hover:text-[#087cf5] truncate leading-tight">
                            {st.name}
                          </div>
                          <div className="text-[10.5px] text-slate-500 truncate leading-tight mt-0.5">
                            {st.mobile} &bull; {st.leadId}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
                          {st.countryInterest}
                        </span>
                        <div className="text-[9.5px] text-slate-400 truncate mt-0.5">
                          {st.statusText}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  No matching student records found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Controls: WhatsApp, Notifications, Calendar, Register, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Add Student Button */}
          <button
            onClick={onOpenRegisterModal}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-[11.5px] font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Lead</span>
          </button>

          {/* Quick WhatsApp Support Center */}
          <button
            onClick={() => navigate('communication')}
            title="Communication & WhatsApp Center"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#22c55e] hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.044-2.029-.533-1.428-.592-2.348-2.04-2.42-2.137-.071-.097-.58-.771-.58-1.469 0-.698.362-1.041.49-1.185.127-.143.281-.179.375-.179.094 0 .188.001.27.006.086.004.202-.033.315.241.119.287.406.994.442 1.066.035.072.059.156.012.25-.047.093-.071.152-.142.235-.07.083-.148.185-.212.249-.071.071-.145.148-.062.291.082.143.366.604.786.978.54.482.996.632 1.138.703.142.071.226.059.31-.036.084-.095.361-.421.457-.565.095-.144.19-.119.321-.072.131.048.832.392.975.464.143.071.238.107.273.167.036.059.036.345-.108.75z" />
            </svg>
          </button>

          {/* Notifications Center with Interactive Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCalendar(false);
                setShowProfileMenu(false);
              }}
              title={`${unreadCount} Notifications`}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4 text-rose-500 shrink-0" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-rose-600 text-white text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">
                      Actionable Updates
                    </h4>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      {unreadCount} unread notices across active student pipelines
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() =>
                        setReadNotifications(notificationsList.map((n) => n.id))
                      }
                      className="text-[10.5px] font-bold text-[#087cf5] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {notificationsList.map((n) => {
                    const Icon = n.icon;
                    const isRead = readNotifications.includes(n.id);
                    return (
                      <div
                        key={n.id}
                        onClick={() =>
                          handleNotificationClick(n.route, n.studentId, n.id)
                        }
                        className={`p-3 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                          isRead ? 'opacity-65' : ''
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${n.iconColor}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11.5px] font-bold text-slate-900 truncate">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {n.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('tasks');
                    }}
                    className="text-[11px] font-bold text-[#087cf5] hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View all pipeline activities</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Schedule & Calendar Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              title="Today's Schedule & Appointments"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
            </button>

            {/* Calendar Popover */}
            {showCalendar && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">
                      Today&apos;s Appointments
                    </h4>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      Counselling sessions &amp; verification slots
                    </p>
                  </div>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    4 Slots
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {calendarItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowCalendar(false);
                        if (item.studentId) {
                          navigate('dashboard', item.studentId);
                        } else {
                          navigate('tasks');
                        }
                      }}
                      className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5"
                    >
                      <div className="px-2 py-1 rounded bg-slate-100 text-slate-800 text-[10.5px] font-bold shrink-0 text-center">
                        {item.time}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11.5px] font-bold text-slate-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                          {item.person}
                        </div>
                        <span
                          className={`inline-block mt-1 text-[9.5px] font-bold px-1.5 py-0.2 rounded ${item.tagColor}`}
                        >
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowCalendar(false);
                      navigate('tasks');
                    }}
                    className="text-[11px] font-bold text-[#087cf5] hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>Open full Tasks &amp; Schedule module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge & Dropdown */}
          <div className="relative pl-1 border-l border-slate-200">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowCalendar(false);
              }}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#101d37] text-white flex items-center justify-center text-[11px] font-bold shadow-xs shrink-0">
                AG
              </div>
              <div className="hidden sm:block text-left max-w-[110px] min-w-0">
                <div className="text-[12px] font-bold text-[#101d37] leading-tight truncate">
                  {currentUser?.name || 'Amit Gautam'}
                </div>
                <div className="text-[10px] font-medium text-slate-500 leading-tight truncate">
                  {currentUser?.role || 'Admin'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-[12px]">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900 truncate">
                    {currentUser?.name || 'Amit Gautam'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {currentUser?.email || 'amit.gautam@presume.com'}
                  </p>
                  <span className="inline-block mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#087cf5]">
                    Administrator &bull; upGrad Portal
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('students');
                    }}
                    className="w-full px-3.5 py-1.5 text-left font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Students Roster</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      resetDemoData();
                    }}
                    className="w-full px-3.5 py-1.5 text-left font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Demo Data</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full px-3.5 py-1.5 text-left font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
