import React from 'react';
import { CheckSquare, Clock, Plus, CheckCircle2 } from 'lucide-react';
import { useUpGradWorkflow } from '../context/UpGradWorkflowContext';

export const TasksView: React.FC = () => {
  const { tasks, toggleTask } = useUpGradWorkflow();

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1580px] mx-auto select-none">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-[#e21b22]" />
          <span>Tasks &amp; Operational Follow-ups</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Daily SLA-driven reminders for counsellor follow-ups, document verifications, and application deadlines
        </p>

        <div className="mt-5 space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="rounded text-[#e21b22] focus:ring-red-400"
                />
                <div>
                  <div className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Student: {task.studentName} • Scheduled: {task.time}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  task.tag === 'Due Now'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {task.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

