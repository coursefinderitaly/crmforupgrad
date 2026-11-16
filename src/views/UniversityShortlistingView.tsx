import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  ThumbsUp,
  Scale,
  UserCheck,
  Search,
  Filter,
  RotateCcw,
  Plus,
  Eye,
  Check,
  ArrowRight,
  Send,
  Globe,
  Award,
  Sparkles,
  Calendar,
  X,
} from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';
import { UniversityOption } from '../types/crm';

export const UniversityShortlistingView: React.FC = () => {
  const {
    students,
    selectedStudent,
    setSelectedStudent,
    availableUniversities,
    toggleUniversityShortlist,
    sendToStudentApproval,
    navigate,
  } = useUpGradWorkflow();

  const student = selectedStudent || students[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);
  const [comparingIds, setComparingIds] = useState<string[]>(['uni-bologna', 'uni-sapienza']);
  const [activeUniversity, setActiveUniversity] = useState<UniversityOption>(availableUniversities[0]);
  const [detailTab, setDetailTab] = useState<'overview' | 'courses' | 'requirements' | 'fees'>('overview');
  const [showCompareModal, setShowCompareModal] = useState(false);

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student selected.</div>;
  }

  // Filter universities
  const filteredUniversities = availableUniversities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || uni.country.includes(selectedCountry);
    const isShortlisted = student.shortlistedUniversities.some((u) => u.id === uni.id);
    if (showOnlyShortlisted && !isShortlisted) return false;
    return matchesSearch && matchesCountry;
  });

  const isShortlisted = (uniId: string) =>
    student.shortlistedUniversities.some((u) => u.id === uniId);

  const toggleCompare = (uniId: string) => {
    if (comparingIds.includes(uniId)) {
      setComparingIds(comparingIds.filter((id) => id !== uniId));
    } else {
      if (comparingIds.length >= 3) {
        alert('You can compare up to 3 universities simultaneously.');
        return;
      }
      setComparingIds([...comparingIds, uniId]);
    }
  };

  const comparedUnis = availableUniversities.filter((u) => comparingIds.includes(u.id));

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
            <span className="text-slate-800 font-bold">University Shortlisting</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            University Shortlisting Module
          </h2>
          <p className="text-xs text-slate-500">
            Compare, shortlist, and recommend the best partner universities for the student
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Student:</label>
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
                {s.name} ({s.countryInterest}) — {s.shortlistedUniversities.length} Shortlisted
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Student Quick Stats Banner (Exact Match of university shortlisting.jpeg) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-red-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900">{student.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Student ID: <span className="font-mono font-bold text-slate-700">{student.leadId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">Country Interest</span>
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
            <span className="text-slate-400 block text-[10px] font-semibold">Budget</span>
            <span className="font-bold text-slate-900">{student.budget}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold">University Type</span>
            <span className="font-bold text-slate-900">{student.universityType}</span>
          </div>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards (Shortlisted, Recommended, Comparing, Selected) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">
              {student.shortlistedUniversities.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Universities Shortlisted</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">
              {student.shortlistedUniversities.filter((u) => u.status === 'Recommended').length || 2}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Recommended for Student</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-tight">{comparingIds.length}</div>
            <div className="text-[11px] font-semibold text-slate-500">In Active Comparison</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-purple-700 leading-tight">
              {student.approvedUniversities.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Student Approved</div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by university, degree or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e21b22]/20"
            />
          </div>

          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="All">All Countries</option>
              <option value="Italy">Italy 🇮🇹</option>
              <option value="Germany">Germany 🇩🇪</option>
              <option value="United Kingdom">United Kingdom 🇬🇧</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyShortlisted}
                onChange={(e) => setShowOnlyShortlisted(e.target.checked)}
                className="rounded text-[#e21b22] focus:ring-red-400"
              />
              <span>Shortlisted only</span>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('All');
                setShowOnlyShortlisted(false);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Table on Left (8 cols) + Selected University Card on Right (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Table (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">
                Partner &amp; Target Universities ({filteredUniversities.length} results)
              </span>
              <button
                onClick={() => alert('Opening manual university add modal...')}
                className="text-xs font-bold text-[#e21b22] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add University Manually</span>
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-2">University</th>
                    <th className="py-2.5 px-2">City</th>
                    <th className="py-2.5 px-2">Course</th>
                    <th className="py-2.5 px-2">Tuition Fee</th>
                    <th className="py-2.5 px-2">Deadline</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredUniversities.map((uni) => {
                    const shortlisted = isShortlisted(uni.id);
                    const isSelected = activeUniversity?.id === uni.id;
                    return (
                      <tr
                        key={uni.id}
                        onClick={() => setActiveUniversity(uni)}
                        className={`hover:bg-red-50/30 transition-colors cursor-pointer ${
                          isSelected ? 'bg-red-50/50' : ''
                        }`}
                      >
                        {/* University Name & Logo */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={uni.logo}
                              alt={uni.name}
                              className="w-7 h-7 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div>
                              <div className="font-bold text-slate-900 leading-tight">{uni.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal">
                                {uni.degreeType} {uni.isUpGradPartner ? '• upGrad Partner' : ''}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-2 font-medium text-slate-600">{uni.city}</td>

                        <td className="py-3 px-2 max-w-[130px] truncate" title={uni.course}>
                          {uni.course}
                        </td>

                        <td className="py-3 px-2 font-bold text-slate-900">{uni.tuitionFee}</td>

                        <td className="py-3 px-2 text-[#e21b22] font-semibold">{uni.deadline}</td>

                        <td className="py-3 px-2">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                              shortlisted
                                ? 'bg-blue-100 text-blue-800'
                                : uni.status === 'Recommended'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {shortlisted ? 'Shortlisted' : uni.status}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => toggleUniversityShortlist(student.id, uni)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                shortlisted
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'border border-slate-200 hover:border-blue-400 text-slate-700'
                              }`}
                            >
                              {shortlisted ? 'Shortlisted' : 'Shortlist'}
                            </button>
                            <button
                              onClick={() => toggleCompare(uni.id)}
                              title="Compare"
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                comparingIds.includes(uni.id)
                                  ? 'bg-amber-100 text-amber-800 font-bold'
                                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <Scale className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compare Bar at Bottom */}
          {comparingIds.length > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">
                    Compare Universities ({comparingIds.length} added)
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {comparedUnis.map((u) => (
                      <span
                        key={u.id}
                        className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-200"
                      >
                        <span>{u.name}</span>
                        <X
                          className="w-3 h-3 hover:text-red-400 cursor-pointer"
                          onClick={() => toggleCompare(u.id)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCompareModal(true)}
                className="px-4 py-2 rounded-xl bg-[#e21b22] hover:bg-[#c4151b] text-white text-xs font-bold shadow-md cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                Compare Selected ({comparingIds.length}) →
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Active University Inspection Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-xs">University Profile</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-[#e21b22] border border-red-200">
                {activeUniversity.degreeType}
              </span>
            </div>

            {/* University Crest & Hero Campus Image */}
            <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 h-32 bg-slate-100">
              <img
                src={activeUniversity.campusImage}
                alt={activeUniversity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="text-sm font-extrabold leading-tight">{activeUniversity.name}</h3>
                <p className="text-[10.5px] text-slate-200">{activeUniversity.city}, {activeUniversity.country}</p>
              </div>
            </div>
          </div>

          {/* Sub-tabs: Overview, Courses, Requirements, Fees */}
          <div className="flex items-center border-b border-slate-200 gap-2 text-xs font-bold text-slate-500">
            {(['overview', 'courses', 'requirements', 'fees'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDetailTab(t)}
                className={`pb-1.5 capitalize transition-colors ${
                  detailTab === t
                    ? 'text-[#e21b22] border-b-2 border-[#e21b22]'
                    : 'hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {detailTab === 'overview' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">QS World Ranking</span>
                  <span className="font-bold text-slate-800">{activeUniversity.ranking}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">ECTS / Credits</span>
                  <span className="font-bold text-emerald-700">{activeUniversity.credits}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Tuition Fee</span>
                  <span className="font-bold text-slate-900">{activeUniversity.tuitionFee}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Application Deadline</span>
                  <span className="font-bold text-[#e21b22]">{activeUniversity.deadline}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Study Model / Articulation</span>
                <p className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                  {activeUniversity.model}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">About University</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {activeUniversity.description}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => toggleUniversityShortlist(student.id, activeUniversity)}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isShortlisted(activeUniversity.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {isShortlisted(activeUniversity.id)
                  ? 'Shortlisted for Student'
                  : 'Add to Student Shortlist'}
              </span>
            </button>

            {/* ── INTERLINKED PIPELINE STEP: Send to Student for Approval ── */}
            <button
              onClick={() => {
                if (student.shortlistedUniversities.length === 0) {
                  toggleUniversityShortlist(student.id, activeUniversity);
                }
                sendToStudentApproval(student.id);
                navigate('student-approval', student.id);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Shortlist for Student Approval</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Compare Universities Modal ── */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-500" />
                <span>Side-by-Side University Comparison</span>
              </h3>
              <button onClick={() => setShowCompareModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {comparedUnis.map((u) => (
                <div key={u.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-extrabold text-slate-900">{u.name}</h4>
                  <div className="text-[11px] text-slate-500">{u.course}</div>
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <div>Tuition: <strong className="text-slate-800">{u.tuitionFee}</strong></div>
                    <div>ECTS: <strong className="text-emerald-700">{u.credits}</strong></div>
                    <div>Deadline: <strong className="text-[#e21b22]">{u.deadline}</strong></div>
                    <div>Model: <span className="text-slate-600">{u.model}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

