export type PipelineStage =
  | 'registered'
  | 'counselling'
  | 'enrolled'
  | 'documentation'
  | 'shortlisting'
  | 'student_approval'
  | 'application'
  | 'offer_received';

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Mandatory' | 'Academic' | 'Financial' | 'Application';
  status: 'Pending' | 'Received' | 'Under Review' | 'Approved' | 'Rejected' | 'Re-upload Required';
  submittedOn?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  fileUrl?: string;
}

export interface UniversityOption {
  id: string;
  name: string;
  course: string;
  country: string;
  city: string;
  degreeType: string;
  model: string; // e.g. "1 Year Online + 1 Year On-Campus Berlin"
  tuitionFee: string;
  applicationFee: string;
  deadline: string;
  eligibility: string;
  credits: string;
  status: 'Shortlisted' | 'Recommended' | 'Comparing' | 'Student Selected' | 'Rejected';
  ranking?: string;
  language?: string;
  duration?: string;
  intake?: string;
  campusImage?: string;
  logo?: string;
  description?: string;
  isUpGradPartner?: boolean;
}

export interface ApplicationRecord {
  id: string;
  universityId: string;
  universityName: string;
  course: string;
  country: string;
  deadline: string;
  applicationFee: string;
  assignedExecutive: string;
  lastUpdated: string;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6; 
  // 1: Draft, 2: Form Completed, 3: Documents Uploaded, 4: Submitted, 5: Under Review, 6: Offer Received
  status: 'Draft' | 'Form Completed' | 'Docs Uploaded' | 'Submitted' | 'Under Review' | 'Offer Received';
  portalUrl?: string;
  applicationNumber?: string;
  notes?: string;
  offerLetterUrl?: string;
}

export interface Student {
  id: string;
  leadId: string;
  name: string;
  avatar: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  address: string;
  nationality: string;
  passportStatus: 'Available' | 'Applied' | 'Not Available';
  
  // Pipeline status
  stage: PipelineStage;
  statusText: string;
  leadSource: 'Google Ads' | 'Website' | 'Instagram' | 'Referral' | 'Justdial' | 'upGrad Channel';
  lastActivity: string;
  nextFollowUpDate: string;
  nextFollowUpTime: string;
  nextFollowUpNote: string;

  // Study preference
  countryInterest: string;
  courseInterest: string;
  intake: string;
  budget: string;
  universityType: 'Public' | 'Private' | 'Blended Pathway';
  preferredCity: string;
  scholarshipInterest: boolean;

  // Academics
  tenthPercentage: string;
  tenthBoard: string;
  twelfthPercentage: string;
  twelfthStream: string;
  graduationDegree: string;
  graduationUniversity: string;
  graduationScore: string;
  graduationYear: string;
  backlogs: string;
  educationGap: string;

  // Tests
  testType: 'IELTS' | 'PTE' | 'TOEFL' | 'Duolingo' | 'Pending';
  overallBand: string;
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  trfNumber: string;
  testDate: string;
  testStatus: 'Valid' | 'Accepted' | 'Under Review' | 'Pending';

  // Workflow sections data
  counsellingNotes: string;
  assignedCounsellor: string;
  assignedDocExecutive: string;
  documents: DocumentItem[];
  shortlistedUniversities: UniversityOption[];
  approvedUniversities: string[]; // university IDs approved by student
  studentApprovalStatus: 'Pending Review' | 'Approved' | 'Revision Requested';
  studentApprovalDate?: string;
  applications: ApplicationRecord[];
  
  // Internal notes & history
  internalNotes: string;
  timeline: {
    id: string;
    date: string;
    time: string;
    action: string;
    user: string;
    type: 'system' | 'counsellor' | 'docs' | 'approval' | 'application';
  }[];
}

export interface TaskItem {
  id: string;
  title: string;
  studentName: string;
  time: string;
  tag: 'Due Now' | 'Upcoming' | 'High Priority';
  completed: boolean;
}

