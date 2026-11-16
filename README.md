# upGrad Global Degree Portal — Study Abroad CRM

A dedicated, standalone Study Abroad CRM portal built specifically for **upGrad Global Degrees**, channel partners, and operations teams.

---

## 🚀 Quick Start

From the terminal:
```bash
# If you are in /home/raagneet/Desktop/Presume
cd upgrad

# Or if you are in /home/raagneet/Desktop/Presume/CRM-Final_Design
cd upgrad

# Start the Vite development server (Port 5174)
npm run dev

# Or build for production
npm run build
```

The application runs at **`http://localhost:5174/`**.

---

## 🔐 CRM Login

The portal uses a single, centered CRM login:

- **Email:** `lead@crm.com`
- **Password:** `crm123`
- **Log out:** Accessible from the top header user dropdown at any time.

---

## 🔄 Complete Interlinked 6-Step Workflow Process

Each stage in the pipeline seamlessly hands over the candidate to the next team without manual WhatsApp or Excel intervention:

```
[ Step 1: Registration / My Students ]
           │
           ▼
[ Step 2: Student Profile Fulfillment ] ────► "Enrol & Transfer to Documentation"
           │
           ▼
[ Step 3: Documentation Module ] ────────────► "Verify Documents & Promote to Shortlisting"
           │
           ▼
[ Step 4: University Shortlisting ] ────────► "Recommend Programs & Send for Student Approval"
           │
           ▼
[ Step 5: Student Approval ] ────────────────► "Record Candidate Consent & Transfer to Application Team"
           │
           ▼
[ Step 6: Application Team Dashboard ] ─────► "Draft → Form → Docs → Submitted → Under Review → Offer Received!"
```

### 1. Registration & My Students (`MyStudentsView.tsx`)
- Register new students with personal, academic, test score, and study abroad preferences.
- 8-step visual journey stepper: Lead → Counselling → Enrolled → Documentation → Shortlisting → Approval → Application → Offer.
- Complete profile tabs: Overview, Personal Information, Academic Details, Language Test Scores, Study Preference, Activity Timeline.
- **Interlinked Action:** When counselling and profile data are fulfilled, click **"Enrol & Transfer to Documentation Team"**.

### 2. Documentation Module (`DocumentationView.tsx`)
- Exact visual reproduction of `documentation.jpeg`.
- **Top 5 KPI Counters:** Documents Received, Pending Verification, Approved Documents, Pending from Student, University Options Added.
- **Document Checklist Table:** Passport, 10th & 12th Marksheets, Graduation Certificate, Semester Transcripts, IELTS/PTE Score, SOP, LOR, CV, Bank Statement.
- Actions to **View Digital Preview**, **Verify & Approve**, or **Request Missing / Corrected Documents** (with rejection reason).
- Missing documents alert card with automated WhatsApp reminders.
- **Interlinked Action:** Click **"Promote to University Shortlisting"** to handover the verified dossier.

### 3. University Shortlisting Module (`UniversityShortlistingView.tsx`)
- Exact visual reproduction of `university shortlisting.jpeg`.
- **4 Top KPI Cards:** Universities Shortlisted, Recommended for Student, In Active Comparison, Student Approved.
- Focus on **upGrad 1+1 Pathway & Partner Universities**:
  - *IU International University of Applied Sciences* (Germany 🇩🇪) — 1 Year Online India + 1 Year in Berlin
  - *Liverpool John Moores University* (UK 🇬🇧) — Global MBA Blended Pathway
  - *Rome Business School / UniMi Partner* (Italy 🇮🇹) — Dual Degree Pathway
  - *University of Padova* (Italy 🇮🇹) — MSc Computer Science
  - *Politecnico di Torino* (Italy 🇮🇹) — MSc Computer Engineering
  - *University of Bologna* (Italy 🇮🇹) — MSc Artificial Intelligence
  - *Sapienza University of Rome* (Italy 🇮🇹) — MSc Data Science
- Search, filter by country/degree, side-by-side comparison drawer.
- University inspection drawer with campus photographs, ranking, ECTS credits, tuition fees, and admission requirements.
- **Interlinked Action:** Click **"Send Shortlist for Student Approval"**.

### 4. Student Approval Module (`StudentApprovalView.tsx`)
- Candidates review the recommended options and formally confirm their choices.
- Interactive checkboxes to record candidate selection (e.g. Student selects University A + University B).
- Student agreement terms & sign-off confirmation.
- **Interlinked Action:** Click **"Confirm & Transfer to Application Team"** to automatically generate active application records.

### 5. Application Team Dashboard (`ApplicationsView.tsx`)
- Exact visual reproduction of `applications.jpeg`.
- **4 Top KPI Cards:** Ready for Application, In Draft, Submitted to Portals, Under Review.
- Tracks university-wise applications with unique reference IDs.
- **6-Stage Application Stepper:**
  1. *Draft* → 2. *Form Completed* → 3. *Docs Uploaded* → 4. *Submitted* → 5. *Under Review* → 6. *Offer Received!*
- Quick actions: "+ Start Applications", "Upload Documents", "Submit Application", and "Issue Offer Letter 🎉".

### 6. Operations Dashboard (`DashboardView.tsx`)
- Exact visual reproduction of `Dashboard.jpeg`.
- **7 Top Metric Cards:** Total Leads, Contacted, Counselling Done, Enrolled, Transferred to Documentation, Application in Process, Offer Received.
- Stage tabs filter (All Leads, Counselling, Enrolled, Documentation, Shortlisting, Approval, Applications).
- Table View / Kanban View switcher.
- Right drawer displaying student profile tabs, visual pipeline stepper, and direct stage advancement actions.
- **Bottom Analytics Row:** Today's Tasks, Counselling Summary (Bar Chart), Lead Source Breakdown (Donut Chart), Country Interest Progress Bars.

---

## 📂 Project Architecture

```
/home/raagneet/Desktop/Presume/upgrad/
├── index.html
├── package.json
├── vite.config.ts          # Configured for Port 5174
├── tailwind.config.js      # Custom upGrad crimson & CRM palette
├── tsconfig.json
├── public/
│   ├── avatars/            # Realistic student photos
│   ├── universities/       # Crests & campus photos
│   └── login/              # Brand artwork
└── src/
    ├── main.tsx
    ├── App.tsx             # Root orchestrator with auth check
    ├── index.css           # Tailwind base styles
    ├── types/
    │   └── crm.ts          # Strict data contracts for students, docs, unis, apps
    ├── data/
    │   └── initialData.ts  # Pre-seeded students (Rahul Sharma, Priya Singh, etc.)
    ├── context/
    │   └── UpGradWorkflowContext.tsx  # Central reactive pipeline state
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx  # Global search, profile, new student button
    │   │   └── Sidebar.tsx # 6-stage navigation with live count badges
    │   └── modals/
    │       └── RegisterStudentModal.tsx # Step 1 lead registration modal
    └── views/
        ├── LoginView.tsx                     # Centered CRM login screen
        ├── DashboardView.tsx                # Matches Dashboard.jpeg
        ├── MyStudentsView.tsx               # Matches students.jpeg
        ├── DocumentationView.tsx            # Matches documentation.jpeg
        ├── UniversityShortlistingView.tsx   # Matches university shortlisting.jpeg
        ├── StudentApprovalView.tsx          # Direct candidate consent & selection
        ├── ApplicationsView.tsx             # Matches applications.jpeg
        ├── CommunicationView.tsx
        ├── TasksView.tsx
        ├── ReportsView.tsx
        └── SettingsView.tsx
```

