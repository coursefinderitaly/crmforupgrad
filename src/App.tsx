import React, { useState } from 'react';
import { UpGradWorkflowProvider, useUpGradWorkflow } from './context/UpGradWorkflowContext';
import { UpGradLoginView } from './views/UpGradLoginView';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './views/DashboardView';
import { MyStudentsView } from './views/MyStudentsView';
import { DocumentationView } from './views/DocumentationView';
import { UniversityShortlistingView } from './views/UniversityShortlistingView';
import { StudentApprovalView } from './views/StudentApprovalView';
import { ApplicationsView } from './views/ApplicationsView';
import { CommunicationView } from './views/CommunicationView';
import { TasksView } from './views/TasksView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import {
  OfferLettersView,
  FinalUniversityView,
  ScholarshipView,
  PreEnrolmentView,
  DovCimeaView,
  VisaProcessView,
  PreDepartureView,
  FinanceView,
  HRView,
} from './views/WorkflowStageViews';
import { RegisterStudentModal } from './components/modals/RegisterStudentModal';

const AppContent: React.FC = () => {
  const { isAuthenticated, currentRoute } = useUpGradWorkflow();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Dedicated UpGrad Login Window if not authenticated
  if (!isAuthenticated) {
    return <UpGradLoginView />;
  }

  return (
    <div className="min-h-screen bg-[#f4f8fc] flex font-sans antialiased text-[#101d37]">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar onOpenRegisterModal={() => setShowRegisterModal(true)} />

      {/* 2. Main Workstation Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header onOpenRegisterModal={() => setShowRegisterModal(true)} />

        {/* Dynamic Route View */}
        <main className="flex-1 pb-12 overflow-y-auto">
          {currentRoute === 'dashboard' && <DashboardView />}
          {currentRoute === 'students' && (
            <MyStudentsView onOpenRegisterModal={() => setShowRegisterModal(true)} />
          )}
          {currentRoute === 'documentation' && <DocumentationView />}
          {currentRoute === 'shortlisting' && <UniversityShortlistingView />}
          {currentRoute === 'student-approval' && <StudentApprovalView />}
          {currentRoute === 'applications' && <ApplicationsView />}
          {currentRoute === 'offer-letters' && <OfferLettersView />}
          {currentRoute === 'final-university' && <FinalUniversityView />}
          {currentRoute === 'scholarship' && <ScholarshipView />}
          {currentRoute === 'pre-enrolment' && <PreEnrolmentView />}
          {currentRoute === 'dov-cimea' && <DovCimeaView />}
          {currentRoute === 'visa-process' && <VisaProcessView />}
          {currentRoute === 'pre-departure' && <PreDepartureView />}
          {currentRoute === 'tasks' && <TasksView />}
          {currentRoute === 'communication' && <CommunicationView />}
          {currentRoute === 'reports' && <ReportsView />}
          {currentRoute === 'finance' && <FinanceView />}
          {currentRoute === 'hr' && <HRView />}
          {currentRoute === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Register New Student Modal */}
      <RegisterStudentModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <UpGradWorkflowProvider>
      <AppContent />
    </UpGradWorkflowProvider>
  );
};

export default App;
