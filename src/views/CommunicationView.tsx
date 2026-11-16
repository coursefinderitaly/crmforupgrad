import React from 'react';
import { MessageSquare, MessageCircle, Mail, PhoneCall, Clock } from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const CommunicationView: React.FC = () => {
  const { students } = useUpGradWorkflow();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1580px] mx-auto select-none">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#e21b22]" />
          <span>Communications &amp; Student Outreach History</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Complete unified log of WhatsApp messages, system emails, follow-up calls, and document dispatch notes
        </p>

        <div className="mt-5 space-y-3">
          {students.map((s) => (
            <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                  <div className="text-[11px] text-slate-500">{s.mobile} • {s.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Starting WhatsApp chat with ${s.name}`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => alert(`Composing email to ${s.email}`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 border border-blue-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

