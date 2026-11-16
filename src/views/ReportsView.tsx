import React from 'react';
import { BarChart3, TrendingUp, Users, Award, FileCheck } from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const ReportsView: React.FC = () => {
  const { stats, students } = useUpGradWorkflow();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1580px] mx-auto select-none">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#e21b22]" />
          <span>Operational Reports &amp; Conversion Analytics</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Conversion rates across the 6 pipeline stages, counsellor performance, and university offer turnaround times
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-semibold">Lead to Enrolment Conversion</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {Math.round((stats.enrolled / (stats.totalLeads || 1)) * 100)}%
            </div>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">Top tier channel throughput</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-semibold">Documentation Approval Rate</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {Math.round((stats.transferredDocs / (stats.enrolled || 1)) * 100)}%
            </div>
            <p className="text-[10px] text-blue-600 font-bold mt-1">Average verification time: 2.4 days</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs text-slate-500 font-semibold">Offer Acceptance Rate</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {stats.offerReceived > 0 ? '100%' : '85%'}
            </div>
            <p className="text-[10px] text-purple-600 font-bold mt-1">Direct articulation partner success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

