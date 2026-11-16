import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  TaskItem,
  UniversityOption,
  DocumentItem,
  ApplicationRecord,
  PipelineStage,
  OfferLetterItem,
  FinalUniversityData,
  ScholarshipData,
  PreEnrolmentData,
  DovCimeaData,
  VisaProcessData,
  PreDepartureData,
} from '../types/crm';
import { INITIAL_STUDENTS, INITIAL_TASKS, DEFAULT_UNIVERSITIES } from '../data/initialData';

interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
  portal: string;
}

interface UpGradContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;

  // Navigation
  currentRoute: string;
  navigate: (route: string, studentId?: string) => void;

  // Data
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  tasks: TaskItem[];
  availableUniversities: UniversityOption[];

  // Workflow Actions
  registerStudent: (data: Partial<Student>) => Student;
  updateStudent: (studentId: string, updates: Partial<Student>) => void;
  
  // Interlinked step transitions
  advanceToCounselling: (studentId: string) => void;
  advanceToEnrolled: (studentId: string) => void; // Moves to Documentation
  updateDocumentStatus: (studentId: string, docId: string, status: DocumentItem['status'], reason?: string) => void;
  requestMissingDocs: (studentId: string) => void;
  advanceToShortlisting: (studentId: string) => void; // Moves to University Shortlisting
  toggleUniversityShortlist: (studentId: string, uni: UniversityOption) => void;
  sendToStudentApproval: (studentId: string) => void; // Moves to Student Approval
  recordStudentApproval: (studentId: string, approvedUniIds: string[]) => void; // Transfers to Application Team
  advanceApplicationStep: (studentId: string, appId: string, step: 1 | 2 | 3 | 4 | 5 | 6) => void;
  issueOfferLetter: (studentId: string, appId: string) => void;

  // Interlinked lifecycle stage promotions & dossier updates
  advanceToStage: (studentId: string, stage: PipelineStage, note?: string) => void;
  addOfferLetter: (studentId: string, offer: Partial<OfferLetterItem>) => void;
  updateOfferLetter: (studentId: string, offerId: string, updates: Partial<OfferLetterItem>) => void;
  confirmFinalUniversity: (studentId: string, data: Partial<FinalUniversityData>) => void;
  updateScholarshipDossier: (studentId: string, data: Partial<ScholarshipData>) => void;
  updatePreEnrolmentDossier: (studentId: string, data: Partial<PreEnrolmentData>) => void;
  updateDovCimeaDossier: (studentId: string, data: Partial<DovCimeaData>) => void;
  updateVisaProcessDossier: (studentId: string, data: Partial<VisaProcessData>) => void;
  updatePreDepartureDossier: (studentId: string, data: Partial<PreDepartureData>) => void;

  // Task & general actions
  toggleTask: (taskId: string) => void;
  addStudentNote: (studentId: string, note: string) => void;
  resetDemoData: () => void;

  // Live Stats
  stats: {
    totalLeads: number;
    contacted: number;
    counselling: number;
    enrolled: number;
    transferredDocs: number;
    inApplication: number;
    offerReceived: number;
  };
}

const STORAGE_KEY = 'upgrad_crm_standalone_data_v1';
const AUTH_KEY = 'upgrad_crm_standalone_auth_v1';

const UpGradWorkflowContext = createContext<UpGradContextType | undefined>(undefined);

export const UpGradWorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : {
        name: 'Pooja Verma',
        email: 'lead@crm.com',
        role: 'CRM Lead',
        avatar: '/avatars/priya.png',
        portal: 'CRM Workspace',
      };
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(AUTH_KEY));
  });

  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');

  // Students state
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not parse stored UpGrad data', e);
    }
    return INITIAL_STUDENTS;
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    return students[0]?.id || 'stu-rahul';
  });

  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [availableUniversities] = useState<UniversityOption[]>(DEFAULT_UNIVERSITIES);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to sync students to local storage', e);
    }
  }, [students]);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0] || null;

  const setSelectedStudent = (student: Student | null) => {
    if (student) {
      setSelectedStudentId(student.id);
    }
  };

  const navigate = (route: string, studentId?: string) => {
    setCurrentRoute(route);
    if (studentId) {
      setSelectedStudentId(studentId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth functions
  const login = (email: string, pass: string) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    // Only the CRM lead account can sign in
    const isLeadAccount =
      (cleanEmail === 'lead@crm.com' && (cleanPass === 'crm123' || cleanPass === 'admin123')) ||
      (cleanEmail === 'upgrad@crm.com' && (cleanPass === 'upgrad123' || cleanPass === 'admin123'));

    if (isLeadAccount) {
      const user: AuthUser = {
        name: 'Pooja Verma',
        email: cleanEmail,
        role: 'CRM Lead',
        avatar: '/avatars/priya.png',
        portal: 'CRM Workspace',
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password. Please try again.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  // Register new student (Step 1)
  const registerStudent = (data: Partial<Student>): Student => {
    const newId = `stu-${Date.now()}`;
    const newLeadId = `L${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`;

    const newStudent: Student = {
      id: newId,
      leadId: newLeadId,
      name: data.name || 'New Student',
      avatar: data.avatar || '/avatars/rahul.png',
      email: data.email || 'student@example.com',
      mobile: data.mobile || '+91 98000 00000',
      dob: data.dob || '01 Jan 2002',
      gender: data.gender || 'Male',
      address: data.address || 'India',
      nationality: 'Indian',
      passportStatus: data.passportStatus || 'Available',
      stage: 'registered',
      statusText: 'New Lead Registered',
      leadSource: data.leadSource || 'upGrad Channel',
      lastActivity: 'Just Now',
      nextFollowUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      nextFollowUpTime: '11:00 AM',
      nextFollowUpNote: 'Initial counselling and course fitment review',
      countryInterest: data.countryInterest || 'Germany',
      courseInterest: data.courseInterest || 'MSc Data Science & AI',
      intake: data.intake || 'Sept 2026',
      budget: data.budget || '€ 10,000 – 15,000',
      universityType: data.universityType || 'Blended Pathway',
      preferredCity: data.preferredCity || 'Berlin / Rome',
      scholarshipInterest: true,
      tenthPercentage: data.tenthPercentage || '80%',
      tenthBoard: data.tenthBoard || 'CBSE',
      twelfthPercentage: data.twelfthPercentage || '80%',
      twelfthStream: data.twelfthStream || 'Science',
      graduationDegree: data.graduationDegree || "Bachelor's Degree",
      graduationUniversity: data.graduationUniversity || 'Recognized University',
      graduationScore: data.graduationScore || '7.5 CGPA',
      graduationYear: data.graduationYear || '2024',
      backlogs: 'No',
      educationGap: 'No',
      testType: data.testType || 'IELTS',
      overallBand: data.overallBand || '6.5',
      listening: '6.5',
      reading: '6.5',
      writing: '6.0',
      speaking: '6.5',
      trfNumber: '25TRF' + Math.floor(10000 + Math.random() * 90000),
      testDate: '15 Jan 2025',
      testStatus: 'Valid',
      counsellingNotes: 'Student registered via upGrad portal. Ready for profile verification.',
      assignedCounsellor: currentUser?.name || 'Neha Sharma',
      assignedDocExecutive: 'Priya Singh',
      documents: [
        { id: `doc-1-${newId}`, name: 'Passport (All Pages)', category: 'Mandatory', status: 'Pending' },
        { id: `doc-2-${newId}`, name: '10th Marksheet & Certificate', category: 'Academic', status: 'Pending' },
        { id: `doc-3-${newId}`, name: '12th Marksheet & Certificate', category: 'Academic', status: 'Pending' },
        { id: `doc-4-${newId}`, name: 'Graduation Degree & Transcripts', category: 'Academic', status: 'Pending' },
        { id: `doc-5-${newId}`, name: 'IELTS / PTE Official Score Card', category: 'Academic', status: 'Pending' },
        { id: `doc-6-${newId}`, name: 'Statement of Purpose (SOP)', category: 'Application', status: 'Pending' },
        { id: `doc-7-${newId}`, name: 'Curriculum Vitae (CV)', category: 'Application', status: 'Pending' },
      ],
      shortlistedUniversities: [],
      approvedUniversities: [],
      studentApprovalStatus: 'Pending Review',
      applications: [],
      internalNotes: 'Newly registered lead in upGrad Global Degree pipeline.',
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: 'Today',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'Student registered in upGrad CRM portal',
          user: currentUser?.name || 'Counsellor',
          type: 'counsellor',
        },
      ],
    };

    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudentId(newStudent.id);
    return newStudent;
  };

  // Update student profile
  const updateStudent = (studentId: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updates } : s))
    );
  };

  // Step 2 Transition: Counselling done
  const advanceToCounselling = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          stage: 'counselling',
          statusText: 'Counselling Done',
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: 'Counselling session completed and course fitment verified',
              user: currentUser?.name || 'Neha Sharma',
              type: 'counsellor',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 3 Transition: Enroll & Transfer to Documentation
  const advanceToEnrolled = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          stage: 'documentation',
          statusText: 'Documentation In Progress',
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: 'Student Enrolled! File automatically transferred to Documentation Team',
              user: currentUser?.name || 'Neha Sharma',
              type: 'system',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 4: Documentation verification
  const updateDocumentStatus = (
    studentId: string,
    docId: string,
    status: DocumentItem['status'],
    reason?: string
  ) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const updatedDocs = s.documents.map((d) =>
          d.id === docId
            ? {
                ...d,
                status,
                submittedOn: status !== 'Pending' ? d.submittedOn || 'Today' : undefined,
                verifiedBy: status === 'Approved' ? currentUser?.name || 'Priya Singh' : d.verifiedBy,
                rejectionReason: reason || d.rejectionReason,
              }
            : d
        );

        const docName = s.documents.find((d) => d.id === docId)?.name || 'Document';

        return {
          ...s,
          documents: updatedDocs,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: `${docName} status updated to: ${status}${reason ? ` (${reason})` : ''}`,
              user: currentUser?.name || 'Priya Singh',
              type: 'docs',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  const requestMissingDocs = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: 'Automated WhatsApp & Email checklist sent to student for missing documents',
              user: currentUser?.name || 'Documentation Executive',
              type: 'docs',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 5 Transition: Advance to University Shortlisting
  const advanceToShortlisting = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;

        // Auto-suggest upGrad partner universities if none exist
        const initialShortlist = s.shortlistedUniversities.length > 0
          ? s.shortlistedUniversities
          : [DEFAULT_UNIVERSITIES[0], DEFAULT_UNIVERSITIES[1]];

        return {
          ...s,
          stage: 'shortlisting',
          statusText: 'University Shortlisting',
          shortlistedUniversities: initialShortlist,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: 'Documents verified! Student promoted to University Shortlisting Module',
              user: currentUser?.name || 'Priya Singh',
              type: 'docs',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Toggle university in student shortlist
  const toggleUniversityShortlist = (studentId: string, uni: UniversityOption) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const exists = s.shortlistedUniversities.some((u) => u.id === uni.id);
        const updatedList = exists
          ? s.shortlistedUniversities.filter((u) => u.id !== uni.id)
          : [...s.shortlistedUniversities, { ...uni, status: 'Shortlisted' as const }];

        return {
          ...s,
          shortlistedUniversities: updatedList,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: exists
                ? `Removed ${uni.name} from shortlisted options`
                : `Shortlisted ${uni.name} (${uni.course})`,
              user: currentUser?.name || 'Counsellor',
              type: 'counsellor',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 6 Transition: Send to Student Approval
  const sendToStudentApproval = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          stage: 'student_approval',
          statusText: 'Awaiting Student Approval',
          studentApprovalStatus: 'Pending Review',
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: `Sent ${s.shortlistedUniversities.length} university options to student for selection & approval`,
              user: currentUser?.name || 'Priya Singh',
              type: 'approval',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 7 Transition: Record Student Approval & Transfer to Application Team
  const recordStudentApproval = (studentId: string, approvedUniIds: string[]) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;

        // Build Application records for approved universities
        const approvedUnis = s.shortlistedUniversities.filter((u) => approvedUniIds.includes(u.id));
        const newApplications: ApplicationRecord[] = approvedUnis.map((uni, idx) => ({
          id: `app-${uni.id}-${Date.now()}-${idx}`,
          universityId: uni.id,
          universityName: uni.name,
          course: uni.course,
          country: uni.country,
          deadline: uni.deadline,
          applicationFee: uni.applicationFee,
          assignedExecutive: 'Rohan Shetty',
          lastUpdated: 'Just now',
          currentStep: 1, // 1: Draft
          status: 'Draft',
          applicationNumber: `UG-${uni.country.slice(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        }));

        return {
          ...s,
          stage: 'application',
          statusText: 'Ready for Application',
          approvedUniversities: approvedUniIds,
          studentApprovalStatus: 'Approved',
          studentApprovalDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          applications: newApplications.length > 0 ? newApplications : s.applications,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: `Student approved ${approvedUniIds.length} university choices! File promoted to Application Team`,
              user: `${s.name} (Student Confirmation)`,
              type: 'approval',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Step 8: Application Lifecycle Progression
  const advanceApplicationStep = (studentId: string, appId: string, step: 1 | 2 | 3 | 4 | 5 | 6) => {
    const stepStatusMap: Record<number, ApplicationRecord['status']> = {
      1: 'Draft',
      2: 'Form Completed',
      3: 'Docs Uploaded',
      4: 'Submitted',
      5: 'Under Review',
      6: 'Offer Received',
    };

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const updatedApps = s.applications.map((app) => {
          if (app.id !== appId) return app;
          return {
            ...app,
            currentStep: step,
            status: stepStatusMap[step],
            lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          };
        });

        const appName = s.applications.find((a) => a.id === appId)?.universityName || 'Application';

        return {
          ...s,
          stage: step === 6 ? 'offer_received' : 'application',
          statusText: step === 6 ? 'Offer Letter Received 🎉' : `Application: ${stepStatusMap[step]}`,
          applications: updatedApps,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: `${appName} moved to stage: ${stepStatusMap[step]}`,
              user: currentUser?.name || 'Application Team',
              type: 'application',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  // Direct offer issuance
  const issueOfferLetter = (studentId: string, appId: string) => {
    advanceApplicationStep(studentId, appId, 6);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addStudentNote = (studentId: string, noteText: string) => {
    if (!noteText.trim()) return;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          internalNotes: `${noteText}\n---\n${s.internalNotes || ''}`,
          timeline: [
            {
              id: `tl-${Date.now()}`,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              action: `Note Added: "${noteText.slice(0, 40)}..."`,
              user: currentUser?.name || 'Staff',
              type: 'counsellor',
            },
            ...s.timeline,
          ],
        };
      })
    );
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStudents(INITIAL_STUDENTS);
    setSelectedStudentId(INITIAL_STUDENTS[0].id);
    setTasks(INITIAL_TASKS);
  };

  // Live KPI statistics
  const stats = {
    totalLeads: students.length,
    contacted: students.filter((s) => ['registered', 'counselling', 'enrolled', 'documentation', 'shortlisting', 'student_approval', 'application', 'offer_received'].includes(s.stage)).length,
    counselling: students.filter((s) => ['counselling', 'enrolled', 'documentation', 'shortlisting', 'student_approval', 'application', 'offer_received'].includes(s.stage)).length,
    enrolled: students.filter((s) => ['enrolled', 'documentation', 'shortlisting', 'student_approval', 'application', 'offer_received'].includes(s.stage)).length,
    transferredDocs: students.filter((s) => ['documentation', 'shortlisting', 'student_approval', 'application', 'offer_received'].includes(s.stage)).length,
    inApplication: students.filter((s) => s.stage === 'application').length,
    offerReceived: students.filter((s) => s.stage === 'offer_received').length,
  };

  return (
    <UpGradWorkflowContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        currentRoute,
        navigate,
        students,
        selectedStudent,
        setSelectedStudent,
        tasks,
        availableUniversities,
        registerStudent,
        updateStudent,
        advanceToCounselling,
        advanceToEnrolled,
        updateDocumentStatus,
        requestMissingDocs,
        advanceToShortlisting,
        toggleUniversityShortlist,
        sendToStudentApproval,
        recordStudentApproval,
        advanceApplicationStep,
        issueOfferLetter,
        toggleTask,
        addStudentNote,
        resetDemoData,
        stats,
      }}
    >
      {children}
    </UpGradWorkflowContext.Provider>
  );
};

export const useUpGradWorkflow = () => {
  const context = useContext(UpGradWorkflowContext);
  if (!context) {
    throw new Error('useUpGradWorkflow must be used within an UpGradWorkflowProvider');
  }
  return context;
};
