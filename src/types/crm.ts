export type PipelineStage =
  | 'registered'
  | 'counselling'
  | 'enrolled'
  | 'documentation'
  | 'shortlisting'
  | 'student_approval'
  | 'application'
  | 'offer_received'
  | 'final_university'
  | 'scholarship'
  | 'pre_enrolment'
  | 'dov_cimea'
  | 'visa_process'
  | 'pre_departure'
  | 'completed';

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

export interface OfferLetterItem {
  id: string;
  universityId?: string;
  universityName: string;
  course: string;
  country: string;
  intake: string;
  type: 'Unconditional' | 'Conditional';
  status: 'Received' | 'Accepted' | 'Declined' | 'Under Verification';
  conditions?: string;
  issuedDate: string;
  deadline: string;
  depositAmount: string;
  depositPaid?: boolean;
  scholarshipAwarded?: string;
  portalLink?: string;
  fileUrl?: string;
}

export interface FinalUniversityData {
  universityId: string;
  universityName: string;
  course: string;
  country: string;
  city: string;
  intake: string;
  tuitionFee: string;
  depositAmount: string;
  depositStatus: 'Paid' | 'Pending' | 'Waived';
  depositReceiptRef?: string;
  depositDate?: string;
  studentAgreementSigned: boolean;
  signedDate?: string;
  acceptanceLetterReceived: boolean;
  portalCredentialsCreated: boolean;
  notes?: string;
}

export interface ScholarshipData {
  schemeName: string;
  country: string;
  status: 'Eligible' | 'Applied' | 'Dossier Under Review' | 'Awarded' | 'Rejected';
  grantAmount: string;
  iseeParificatoScore?: string;
  cafSubmissionDate?: string;
  apostilledIncomeDoc: boolean;
  familyPropertyCertificate: boolean;
  bankSolvencySubmitted: boolean;
  deadline: string;
  dossierNotes?: string;
}

export interface PreEnrolmentData {
  portal: 'Universitaly' | 'Uni-Assist' | 'UCAS' | 'Direct';
  applicationRef: string;
  targetEmbassy: string;
  submissionDate?: string;
  status: 'Draft' | 'Submitted' | 'Under Faculty Validation' | 'Summary Approved (Riepilogo Issued)' | 'Revision Needed';
  riepilogoSummaryIssued: boolean;
  riepilogoDate?: string;
  riepilogoDocUrl?: string;
  facultyValidatorName?: string;
  notes?: string;
}

export interface DovCimeaData {
  preferredRoute: 'CIMEA DiploMe' | 'Embassy DoV' | 'Both';
  diploMeRef?: string;
  comparabilityStatus: 'Not Started' | 'Dossier Uploaded' | 'Payment Complete' | 'Under Verification' | 'Certificate Issued';
  verificationStatus: 'Pending' | 'Completed';
  apostilledDegree: boolean;
  apostilledTranscripts: boolean;
  certifiedItalianTranslation: boolean;
  certificateIssueDate?: string;
  notes?: string;
}

export interface VisaChecklistItem {
  id: string;
  label: string;
  category: 'Mandatory' | 'Financial' | 'Academic' | 'Travel';
  checked: boolean;
  notes?: string;
}

export interface VisaProcessData {
  visaType: string;
  vfsCenter: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentStatus: 'Pending Booking' | 'Confirmed' | 'Biometrics Completed';
  status: 'File Preparation' | 'VFS Appointment Booked' | 'Submitted to Embassy' | 'Under Processing' | 'Visa Approved & Stamped' | 'Refused';
  trackingNumber?: string;
  solvencyAmountDemonstrated: string;
  accommodationProofType: string;
  insurancePolicyNumber: string;
  checklist: VisaChecklistItem[];
  stampedDate?: string;
  visaValidUntil?: string;
  embassyInterviewNotes?: string;
}

export interface PreDepartureData {
  flightBooked: boolean;
  airline?: string;
  flightNo?: string;
  departureDate?: string;
  departureCity?: string;
  arrivalAirport?: string;
  arrivalDate?: string;
  airportPickupScheduled: boolean;
  pickupDriverContact?: string;
  codiceFiscaleStatus: 'Pending' | 'Generated & Verified';
  codiceFiscaleNumber?: string;
  forexCardIssued: boolean;
  forexCardNumber?: string;
  eSimActivated: boolean;
  italianSimNumber?: string;
  permessoKitReady: boolean;
  accommodationAddress?: string;
  orientationAttended: boolean;
  orientationDate?: string;
  lifecycleStatus: 'Pre-Departure Briefing' | 'In Transit' | 'Landed & Registered' | 'Enrolled Abroad 🎉';
  notes?: string;
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
  courseLevel?: string;
  preferredCourse?: string;
  alternativeCourses?: string[];
  targetUniversity?: string;
  intake: string;
  intakeDeadline?: string;
  budget: string;
  universityType: 'Public' | 'Private' | 'Blended Pathway';
  preferredCity: string;
  scholarshipInterest: boolean;

  // Academics
  highestQualification?: string;
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
  workExperience?: string;

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

  // Workflow sections data & Payment
  enrollmentDate?: string;
  servicePackage?: string;
  agreementStatus?: 'Signed' | 'Pending' | 'Draft';
  totalFee?: string;
  amountPaid?: string;
  balance?: string;
  paymentSchedule?: { id: string; milestone: string; amount: string; status?: string }[];

  counsellingNotes: string;
  assignedCounsellor: string;
  assignedDocExecutive: string;
  documents: DocumentItem[];
  shortlistedUniversities: UniversityOption[];
  approvedUniversities: string[]; // university IDs approved by student
  studentApprovalStatus: 'Pending Review' | 'Approved' | 'Revision Requested';
  studentApprovalDate?: string;
  applications: ApplicationRecord[];
  
  // Downstream lifecycle stage data
  offerLetters?: OfferLetterItem[];
  finalUniversityChoice?: FinalUniversityData;
  scholarshipDossier?: ScholarshipData;
  preEnrolmentDossier?: PreEnrolmentData;
  dovCimeaDossier?: DovCimeaData;
  visaProcessDossier?: VisaProcessData;
  preDepartureDossier?: PreDepartureData;
  
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
