import React from 'react';
import { Settings, Shield, User, Bell, Database } from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const SettingsView: React.FC = () => {
  const { currentUser, resetDemoData } = useUpGradWorkflow();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1580px] mx-auto select-none">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#e21b22]" />
            <span>Portal Settings &amp; Partner Configuration</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage channel partner credentials, notification webhooks, and default intake schedules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <span>Current Account</span>
            </div>
            <div className="text-slate-600">
              <div>Name: <strong className="text-slate-800">{currentUser?.name}</strong></div>
              <div>Email: <strong className="text-slate-800">{currentUser?.email}</strong></div>
              <div>Role: <span className="font-semibold text-[#e21b22]">{currentUser?.role}</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              <span>Data &amp; Demo Sandbox</span>
            </div>
            <p className="text-slate-500">
              Reset the local state back to initial seeded students (Rahul Sharma, Priya Singh, etc.).
            </p>
            <button
              onClick={() => {
                resetDemoData();
                alert('Demo data reset successfully!');
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700"
            >
              Reset All Pipeline Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

