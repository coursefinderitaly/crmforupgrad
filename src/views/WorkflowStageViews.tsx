import React from 'react';
import { CreditCard, Users } from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

// Export dedicated, fully developed views
export { OfferLettersView } from './OfferLettersView';
export { FinalUniversityView } from './FinalUniversityView';
export { ScholarshipView } from './ScholarshipView';
export { PreEnrolmentView } from './PreEnrolmentView';
export { DovCimeaView } from './DovCimeaView';
export { VisaProcessView } from './VisaProcessView';
export { PreDepartureView } from './PreDepartureView';

// ── Finance & Payments View ──
export const FinanceView: React.FC = () => {
  const { navigate, students } = useUpGradWorkflow();
  return (
    <div className="p-4 sm:p-5 space-y-4 max-w-[1600px] mx-auto text-[#101d37] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#087cf5]" />
            <span>Finance &amp; Fee Payments Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Service package fee installments, university application fee vouchers &amp; enrollment deposits
          </p>
        </div>
        <button
          onClick={() => navigate('students')}
          className="text-xs font-bold text-[#087cf5] hover:underline"
        >
          &larr; Back to Students Roster
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Pipeline Invoiced</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹ 2,80,000</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Across {students.length} active leads</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Total Collections</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">₹ 1,00,000</h3>
          <p className="text-[11px] text-emerald-700 mt-0.5">Verified in company bank treasury</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">Pending Balances</p>
          <h3 className="text-2xl font-black text-amber-600 mt-1">₹ 1,80,000</h3>
          <p className="text-[11px] text-amber-700 mt-0.5">Due on pre-enrolment &amp; visa milestones</p>
        </div>
      </div>
    </div>
  );
};

// ── HR View ──
export const HRView: React.FC = () => {
  const { navigate } = useUpGradWorkflow();
  return (
    <div className="p-4 sm:p-5 space-y-4 max-w-[1600px] mx-auto text-[#101d37] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold flex items-center gap-2">
            <Users className="w-5 h-5 text-[#087cf5]" />
            <span>HR &amp; Team Directory</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Counsellors, documentation executives, admissions officers &amp; channel managers
          </p>
        </div>
        <button
          onClick={() => navigate('students')}
          className="text-xs font-bold text-[#087cf5] hover:underline"
        >
          &larr; Back to Students Roster
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <h4 className="font-extrabold text-sm text-slate-900">Active Operational Staff</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-extrabold text-slate-900 text-sm">Neha Jain</p>
            <p className="text-slate-500 font-medium">Senior Study Abroad Counsellor &bull; Europe Specialist</p>
            <p className="text-slate-600 font-semibold mt-1">Assigned Students: 12 Active</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-extrabold text-slate-900 text-sm">Priya Singh</p>
            <p className="text-slate-500 font-medium">Senior Documentation Executive &bull; CIMEA &amp; Universitaly Officer</p>
            <p className="text-slate-600 font-semibold mt-1">Active Dossiers: 18 Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};
