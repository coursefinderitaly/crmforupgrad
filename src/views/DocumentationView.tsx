import React, { useState, useMemo } from 'react';
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
  Upload,
  FileText,
  Filter,
  Search,
  CheckSquare,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Trash2,
  ShieldCheck,
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
    updateStudent,
    navigate,
    addStudentNote,
  } = useUpGradWorkflow();

  const [activeTab, setActiveTab] = useState<'documents' | 'requirements' | 'notes'>('documents');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Mandatory' | 'Academic' | 'Financial' | 'Application'>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchDocQuery, setSearchDocQuery] = useState('');

  // Modals state
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [rejectModalDoc, setRejectModalDoc] = useState<DocumentItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Scan is blurry or edges are cropped');
  const [customRejectionText, setCustomRejectionText] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTargetDoc, setUploadTargetDoc] = useState<DocumentItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  // Upload Form State
  const [uploadForm, setUploadForm] = useState({
    docName: 'Passport (All 36 Pages)',
    customDocName: '',
    category: 'Mandatory' as DocumentItem['category'],
    fileName: 'passport_scan_hd.pdf',
    fileSize: '2.4 MB',
    uploader: 'Priya Singh (Doc Officer)',
    notes: 'Verified against government registry',
    autoApprove: false,
  });

  const student = selectedStudent || students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student selected.</div>;
  }

  // Calculate live counts
  const totalDocs = student.documents?.length || 0;
  const approvedCount = student.documents?.filter((d) => d.status === 'Approved').length || 0;
  const receivedCount = student.documents?.filter((d) => ['Received', 'Approved', 'Under Review'].includes(d.status)).length || 0;
  const pendingVerificationCount = student.documents?.filter((d) => d.status === 'Under Review' || d.status === 'Received').length || 0;
  const missingCount = student.documents?.filter((d) => d.status === 'Pending' || d.status === 'Re-upload Required').length || 0;
  const completionPercent = totalDocs > 0 ? Math.round((approvedCount / totalDocs) * 100) : 0;

  // Filtered documents list
  const filteredDocuments = useMemo(() => {
    return (student.documents || []).filter((doc) => {
      // Category filter
      if (categoryFilter !== 'All' && doc.category !== categoryFilter) return false;

      // Status filter
      if (statusFilter !== 'All' && doc.status !== statusFilter) return false;

      // Search query
      if (searchDocQuery.trim()) {
        const query = searchDocQuery.toLowerCase();
        if (!doc.name.toLowerCase().includes(query) && !doc.category.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [student.documents, categoryFilter, statusFilter, searchDocQuery]);

  // Handle single document approve
  const handleApprove = (doc: DocumentItem) => {
    updateDocumentStatus(student.id, doc.id, 'Approved');
    showNotification(`${doc.name} marked as Approved & Verified!`);
  };

  // Handle document reject with reason
  const handleReject = () => {
    if (!rejectModalDoc) return;
    const finalReason = customRejectionText.trim() || rejectionReason;
    updateDocumentStatus(student.id, rejectModalDoc.id, 'Re-upload Required', finalReason);

    // Also log in student timeline
    addStudentNote(student.id, `Document Flagged: ${rejectModalDoc.name} requires re-upload. Reason: ${finalReason}`);

    setRejectModalDoc(null);
    setCustomRejectionText('');
    showNotification(`Re-upload request dispatched for ${rejectModalDoc.name}`);
  };

  // Open upload modal for a specific document row or new document
  const openUploadModal = (doc?: DocumentItem) => {
    if (doc) {
      setUploadTargetDoc(doc);
      setUploadForm({
        docName: doc.name,
        customDocName: '',
        category: doc.category,
        fileName: `${doc.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
        fileSize: '1.8 MB',
        uploader: 'Priya Singh (Doc Officer)',
        notes: 'Official high-resolution scan',
        autoApprove: false,
      });
    } else {
      setUploadTargetDoc(null);
      setUploadForm({
        docName: 'Passport (All 36 Pages)',
        customDocName: '',
        category: 'Mandatory',
        fileName: 'passport_scan_hd.pdf',
        fileSize: '2.4 MB',
        uploader: 'Priya Singh (Doc Officer)',
        notes: 'Verified scan submitted by candidate',
        autoApprove: false,
      });
    }
    setShowUploadModal(true);
  };

  // Process Document Upload & Save
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = uploadForm.docName === 'Custom Document...' ? uploadForm.customDocName.trim() || 'Additional Document' : uploadForm.docName;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    let updatedDocs = [...(student.documents || [])];

    if (uploadTargetDoc) {
      // Replacing existing document
      updatedDocs = updatedDocs.map((d) => {
        if (d.id === uploadTargetDoc.id) {
          return {
            ...d,
            name: finalName,
            category: uploadForm.category,
            status: uploadForm.autoApprove ? 'Approved' : 'Under Review',
            submittedOn: todayStr,
            verifiedBy: uploadForm.uploader,
            rejectionReason: undefined,
            fileUrl: uploadForm.fileName,
          };
        }
        return d;
      });
    } else {
      // Adding new document or updating existing with same name
      const existingIdx = updatedDocs.findIndex((d) => d.name.toLowerCase() === finalName.toLowerCase());
      if (existingIdx >= 0) {
        updatedDocs[existingIdx] = {
          ...updatedDocs[existingIdx],
          status: uploadForm.autoApprove ? 'Approved' : 'Under Review',
          submittedOn: todayStr,
          verifiedBy: uploadForm.uploader,
          rejectionReason: undefined,
          fileUrl: uploadForm.fileName,
        };
      } else {
        const newDoc: DocumentItem = {
          id: `doc-${Date.now()}`,
          name: finalName,
          category: uploadForm.category,
          status: uploadForm.autoApprove ? 'Approved' : 'Under Review',
          submittedOn: todayStr,
          verifiedBy: uploadForm.uploader,
          fileUrl: uploadForm.fileName,
        };
        updatedDocs.push(newDoc);
      }
    }

    updateStudent(student.id, {
      documents: updatedDocs,
      lastActivity: todayStr,
    });

    addStudentNote(
      student.id,
      `Document Uploaded: ${finalName} (${uploadForm.fileName}, ${uploadForm.fileSize}) marked as ${
        uploadForm.autoApprove ? 'Approved' : 'Under Review'
      }`
    );

    setShowUploadModal(false);
    showNotification(`${finalName} uploaded successfully!`);
  };

  // Helper notification toast
  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Standard preset documents
  const documentPresets = [
    { name: 'Passport (All 36 Pages)', category: 'Mandatory' },
    { name: '10th Marksheet & Certificate', category: 'Academic' },
    { name: '12th Marksheet & Certificate', category: 'Academic' },
    { name: 'Graduation Degree / Provisional', category: 'Academic' },
    { name: 'Semester Marksheets (Sem 1 to 8)', category: 'Academic' },
    { name: 'Official IELTS / PTE / TOEFL Scorecard', category: 'Academic' },
    { name: 'Statement of Purpose (SOP)', category: 'Application' },
    { name: 'Letters of Recommendation (2 LORs)', category: 'Application' },
    { name: 'Curriculum Vitae (CV / Resume)', category: 'Application' },
    { name: 'Bank Solvency Statement (28-day holding)', category: 'Financial' },
    { name: 'Medium of Instruction (MOI) Certificate', category: 'Academic' },
    { name: 'Work Experience / Relieving Letter', category: 'Application' },
    { name: 'Income Certificate / Family ITR (DSU Grant)', category: 'Financial' },
    { name: 'Custom Document...', category: 'Mandatory' },
  ];

  return (
    <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto select-none font-sans text-[#101d37]">
      {/* ── Top Header & Active Dossier Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-0.5">
            <span>Home</span>
            <span>&gt;</span>
            <span>Documentation Verification</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">{student.name}</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#087cf5]" />
            <span>Document Verification &amp; Dossier Management</span>
          </h2>
        </div>

        {/* Dossier Switcher & Global Upload Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500">Active Dossier:</label>
            <select
              value={student.id}
              onChange={(e) => {
                const found = students.find((s) => s.id === e.target.value);
                if (found) setSelectedStudent(found);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.countryInterest}) &bull; {s.documents.filter((d) => d.status === 'Approved').length}/{s.documents.length} Docs
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => openUploadModal()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── 5 Metric KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div
          onClick={() => setStatusFilter('All')}
          className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{receivedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Documents Received</div>
            <div className="text-[10px] font-bold text-blue-600 truncate">Total Uploaded</div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('Under Review')}
          className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-amber-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{pendingVerificationCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Pending Verification</div>
            <div className="text-[10px] font-bold text-amber-600 truncate">Action Required</div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('Approved')}
          className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-emerald-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">{approvedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Approved Documents</div>
            <div className="text-[10px] font-bold text-emerald-600 truncate">Verified Clean ✓</div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('Pending')}
          className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-rose-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-rose-700 leading-tight">{missingCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Pending from Student</div>
            <div className="text-[10px] font-bold text-rose-600 truncate">Missing / Re-upload</div>
          </div>
        </div>

        <div
          onClick={() => navigate('shortlisting', student.id)}
          className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-purple-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-slate-900 leading-tight">
              {student.shortlistedUniversities?.length || 0}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 truncate">Target Universities</div>
            <div className="text-[10px] font-bold text-purple-600 truncate">Requirements Synced</div>
          </div>
        </div>
      </div>

      {/* ── Student Header Banner with Progress Bar ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-2xs shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 truncate">{student.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                {student.statusText}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 mt-1">
              <span>Lead ID: <strong className="text-slate-800">{student.leadId}</strong></span>
              <span>Country: <strong className="text-slate-800">{student.countryInterest}</strong></span>
              <span>Course: <strong className="text-slate-800 truncate max-w-[170px]">{student.courseInterest}</strong></span>
              <span>Intake: <strong className="text-slate-800">{student.intake}</strong></span>
            </div>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="w-full md:w-72 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Dossier Health</span>
            <span className="text-[#087cf5]">
              {approvedCount} of {totalDocs} Approved ({completionPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#087cf5] to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Layout: Checklist Table on Left (8 cols) + Info & Promotion Actions on Right (4 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column (8 cols ~ 66%) */}
        <div className="lg:col-span-8 space-y-3 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            {/* Sub-tabs header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'documents'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Document Checklist ({student.documents?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('requirements')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'requirements'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  University Requirements Match
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'notes'
                      ? 'bg-[#087cf5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Verification Notes
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openUploadModal()}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Document Checklist Table */}
            {activeTab === 'documents' && (
              <div className="space-y-2.5">
                {/* Search & Category Filter Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(['All', 'Mandatory', 'Academic', 'Financial', 'Application'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          categoryFilter === cat
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search document name..."
                      value={searchDocQuery}
                      onChange={(e) => setSearchDocQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-2.5 px-2 w-8 text-center">#</th>
                        <th className="py-2.5 px-3">Document Name</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Submitted On</th>
                        <th className="py-2.5 px-3">Verified By</th>
                        <th className="py-2.5 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredDocuments.map((doc, idx) => (
                        <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-2 text-center text-slate-400 text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[200px]" title={doc.name}>
                                {doc.name}
                              </span>
                            </div>
                            {doc.rejectionReason && (
                              <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                                Re-upload Note: {doc.rejectionReason}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[10.5px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {doc.category}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
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
                          <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                            {doc.submittedOn || '—'}
                          </td>
                          <td className="py-3 px-3 text-slate-600 text-[11px] whitespace-nowrap">
                            {doc.verifiedBy || '—'}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* View Preview Button */}
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                title="View preview & details"
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </button>

                              {/* Upload / Re-upload Button */}
                              <button
                                onClick={() => openUploadModal(doc)}
                                title="Upload or Replace file"
                                className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-[#087cf5] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Upload className="w-3 h-3" />
                                <span>Upload</span>
                              </button>

                              {/* Verify / Approve Action */}
                              {doc.status !== 'Approved' && (
                                <button
                                  onClick={() => handleApprove(doc)}
                                  title="Mark as Verified & Approved"
                                  className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Verify</span>
                                </button>
                              )}

                              {/* Request / Flag Re-upload */}
                              {doc.status !== 'Approved' && (
                                <button
                                  onClick={() => {
                                    setRejectModalDoc(doc);
                                    setRejectionReason('Scan is blurry or edges are cropped');
                                  }}
                                  title="Request Re-upload"
                                  className="px-2 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
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
              </div>
            )}

            {/* Sub-tab 2: University Requirements Match */}
            {activeTab === 'requirements' && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">Target European Institution Document Matrix</h4>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Verify candidate files against destination entry rules before promoting to Applications.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('shortlisting', student.id)}
                    className="text-xs font-bold text-[#087cf5] hover:underline flex items-center gap-1"
                  >
                    <span>Manage Universities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      uni: 'University of Padova (Italy 🇮🇹)',
                      course: 'MSc Computer Science / Materials Engineering',
                      reqs: [
                        { name: 'Bachelor Degree Certificate', met: true },
                        { name: 'Official Consolidated Transcripts (Sem 1-8)', met: true },
                        { name: 'IELTS min 6.5 or Duolingo min 110', met: true },
                        { name: 'Curriculum Vitae (Europass Format)', met: true },
                        { name: 'Declaration of Value (DoV) or CIMEA', met: false, note: 'Post-admission requirement' },
                      ],
                    },
                    {
                      uni: 'Politecnico di Torino (Italy 🇮🇹)',
                      course: 'MSc Computer Engineering',
                      reqs: [
                        { name: 'Valid Passport (min 18 months validity)', met: true },
                        { name: 'Course-by-Course Degree Syllabus Description', met: true },
                        { name: 'Medium of Instruction (MOI) Certificate', met: false, note: 'Upload required' },
                        { name: 'Bank Solvency Guarantee (min €6,000)', met: true },
                      ],
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <div>
                          <span className="font-bold text-slate-900 text-xs">{item.uni}</span>
                          <span className="text-[11px] text-slate-500 block">{item.course}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Active Choice
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {item.reqs.map((r, rIdx) => (
                          <div
                            key={rIdx}
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              r.met ? 'bg-emerald-50/70 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
                            }`}
                          >
                            <span className="font-medium text-slate-800">{r.name}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                r.met ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                              }`}
                            >
                              {r.met ? 'Met ✓' : 'Action Needed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Verification Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div className="font-bold text-slate-900 mb-1">Official Dossier Verification History</div>
                  <p className="whitespace-pre-line text-slate-700">{student.internalNotes || 'No notes logged yet.'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter document verification comment or flag..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#087cf5]"
                  />
                  <button
                    onClick={() => {
                      if (newNote.trim()) {
                        addStudentNote(student.id, `Doc Officer Note: ${newNote.trim()}`);
                        setNewNote('');
                        showNotification('Verification note logged in audit trail.');
                      }
                    }}
                    className="px-4 py-2 bg-[#087cf5] hover:bg-[#006ee6] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Post Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Profile Summary & Promotion Actions (4 cols ~ 34%) */}
        <div className="lg:col-span-4 space-y-3 min-w-0">
          {/* Student Profile Snapshot Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Dossier Information
              </span>
              <button
                onClick={() => navigate('students', student.id)}
                className="text-[#087cf5] font-semibold text-[11px] flex items-center gap-0.5 hover:underline"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Profile</span>
              </button>
            </div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-bold text-slate-800">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mobile:</span>
                <span className="font-semibold text-slate-800">{student.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Country:</span>
                <span className="font-bold text-slate-800">{student.countryInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Program:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[170px]">{student.courseInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">English Test:</span>
                <span className="font-bold text-emerald-700">{student.testType} Band {student.overallBand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Undergrad CGPA:</span>
                <span className="font-bold text-blue-700">{student.graduationScore}</span>
              </div>
            </div>
          </div>

          {/* Missing Documents Alert Card */}
          {missingCount > 0 && (
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Pending from Student ({missingCount})</span>
                </div>
                <button
                  onClick={() => {
                    requestMissingDocs(student.id);
                    showNotification(`Automated WhatsApp & Email checklist dispatched to ${student.name}!`);
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                >
                  Request All
                </button>
              </div>

              <div className="space-y-1.5">
                {student.documents
                  .filter((d) => d.status === 'Pending' || d.status === 'Re-upload Required')
                  .slice(0, 4)
                  .map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-rose-100"
                    >
                      <span className="font-semibold text-slate-800 truncate max-w-[160px]">{d.name}</span>
                      <button
                        onClick={() => openUploadModal(d)}
                        className="text-[10.5px] font-bold text-[#087cf5] hover:underline shrink-0"
                      >
                        Upload Now &rarr;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Assigned Documentation Officer */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <img
                src="/avatars/priya.png"
                alt="Priya Singh"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Documentation Officer
                </span>
                <span className="font-bold text-slate-900">{student.assignedDocExecutive || 'Priya Singh'}</span>
                <span className="text-[11px] text-slate-500 block">Senior Verification Specialist</span>
              </div>
            </div>
          </div>

          {/* ── Key Interlinked Pipeline Action: Promote to University Shortlisting ── */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-300 shrink-0" />
              <div>
                <h4 className="text-xs font-bold">Step 3: University Shortlisting</h4>
                <p className="text-[10px] text-purple-200">Promote verified dossier to matching</p>
              </div>
            </div>

            <p className="text-xs text-purple-100 leading-snug">
              When documents are verified, transfer the dossier directly to the University Shortlisting module to match against European partner universities.
            </p>

            <button
              onClick={() => {
                advanceToShortlisting(student.id);
                navigate('shortlisting', student.id);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Promote to University Shortlisting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal: Comprehensive Upload Document with Full Details ── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#087cf5]" />
                <h3 className="font-bold text-sm text-slate-900">
                  {uploadTargetDoc ? `Upload / Replace: ${uploadTargetDoc.name}` : 'Upload Student Document'}
                </h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Type / Title</label>
                <select
                  value={uploadForm.docName}
                  onChange={(e) => {
                    const preset = documentPresets.find((p) => p.name === e.target.value);
                    setUploadForm({
                      ...uploadForm,
                      docName: e.target.value,
                      category: (preset?.category as any) || uploadForm.category,
                    });
                  }}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                >
                  {documentPresets.map((preset) => (
                    <option key={preset.name} value={preset.name}>
                      {preset.name} ({preset.category})
                    </option>
                  ))}
                </select>
              </div>

              {uploadForm.docName === 'Custom Document...' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Custom Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Italian Language A2 Certificate"
                    value={uploadForm.customDocName}
                    onChange={(e) => setUploadForm({ ...uploadForm, customDocName: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Mandatory">Mandatory</option>
                    <option value="Academic">Academic</option>
                    <option value="Financial">Financial</option>
                    <option value="Application">Application</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Uploading Officer</label>
                  <input
                    type="text"
                    value={uploadForm.uploader}
                    onChange={(e) => setUploadForm({ ...uploadForm, uploader: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              {/* Drag and Drop Upload Box */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select File / Attachment</label>
                <div className="p-4 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50/70 transition-colors text-center cursor-pointer">
                  <FileText className="w-8 h-8 text-[#087cf5] mx-auto mb-1" />
                  <p className="font-bold text-slate-800 text-xs">
                    {uploadForm.fileName} ({uploadForm.fileSize})
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Click to browse or drag PDF, JPG, PNG (Max: 25 MB)
                  </p>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification / File Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Scanned from original marksheet with university stamp"
                  value={uploadForm.notes}
                  onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="autoApproveCheck"
                  checked={uploadForm.autoApprove}
                  onChange={(e) => setUploadForm({ ...uploadForm, autoApprove: e.target.checked })}
                  className="rounded text-[#087cf5] focus:ring-blue-400 cursor-pointer"
                />
                <label htmlFor="autoApproveCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mark immediately as Approved &amp; Verified (Admin Override)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#087cf5] hover:bg-[#006ee6] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Upload &amp; Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Document Preview Modal ── */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{previewDoc.name}</h3>
                <span className="text-xs text-slate-500">Student: {student.name} &bull; {previewDoc.category}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-60 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 p-4 text-center">
              <FileCheck2 className="w-12 h-12 text-[#087cf5] mb-2" />
              <p className="text-xs font-bold text-slate-800">Secure Cloud Document Viewer</p>
              <p className="text-[11px] text-slate-500 mt-1">
                {previewDoc.fileUrl || `${previewDoc.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`}
              </p>
              <span
                className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  previewDoc.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Status: {previewDoc.status}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                onClick={() => alert(`Downloading verified ${previewDoc.name} PDF...`)}
                className="flex items-center gap-1 text-xs font-bold text-[#087cf5] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
                {previewDoc.status !== 'Approved' && (
                  <button
                    onClick={() => {
                      handleApprove(previewDoc);
                      setPreviewDoc(null);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Verify &amp; Approve</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Document Rejection/Request Modal ── */}
      {rejectModalDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-3.5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Request Re-upload / Correction</h3>
              <button onClick={() => setRejectModalDoc(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select or specify why <strong>{rejectModalDoc.name}</strong> requires correction:
            </p>

            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white"
            >
              <option value="Scan is blurry or edges are cropped">Scan is blurry or edges are cropped</option>
              <option value="Name mismatch with secondary school records">Name mismatch with secondary school records</option>
              <option value="Bank statement must show 28-day holding balance">Bank statement must show 28-day holding balance</option>
              <option value="Official university seal / signature missing">Official university seal / signature missing</option>
              <option value="Apostille translation required">Apostille translation required</option>
              <option value="Custom explanation below">Custom explanation below...</option>
            </select>

            <textarea
              rows={3}
              placeholder="Additional explanation for candidate..."
              value={customRejectionText}
              onChange={(e) => setCustomRejectionText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-red-400 focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setRejectModalDoc(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
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
