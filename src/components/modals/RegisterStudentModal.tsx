import React, { useState } from 'react';
import {
  X,
  UserPlus,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useUpGradWorkflow } from '../../context/UpGradWorkflowContext';
import { Student } from '../../types/crm';

interface RegisterStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterStudentModal: React.FC<RegisterStudentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { registerStudent, navigate } = useUpGradWorkflow();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryInterest, setCountryInterest] = useState('Germany');
  const [courseInterest, setCourseInterest] = useState('MSc Data Science & AI');
  const [intake, setIntake] = useState('Sept 2026');
  const [budget, setBudget] = useState('€ 10,000 – 15,000');
  const [leadSource, setLeadSource] = useState<Student['leadSource']>('upGrad Channel');
  const [graduationDegree, setGraduationDegree] = useState('B.Tech in Computer Science');
  const [graduationScore, setGraduationScore] = useState('7.8 CGPA');
  const [overallBand, setOverallBand] = useState('7.0');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent = registerStudent({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      mobile: mobile.trim() || '+91 98765 00000',
      countryInterest,
      courseInterest,
      intake,
      budget,
      leadSource,
      graduationDegree,
      graduationScore,
      overallBand,
      avatar: '/avatars/priya.png',
    });

    onClose();
    navigate('students', newStudent.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e21b22] flex items-center justify-center">
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Register New Student
              </h3>
              <p className="text-xs text-slate-500">
                Step 1 in the upGrad Unified Study Abroad Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Candidate Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Malhotra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Mobile Number *
              </label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="vikram@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Lead Source
              </label>
              <select
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none bg-white"
              >
                <option value="upGrad Channel">upGrad Channel Partner</option>
                <option value="Google Ads">Google Ads Campaign</option>
                <option value="Website">Direct Website Form</option>
                <option value="Instagram">Instagram Meta Lead</option>
                <option value="Referral">Student Referral</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Target Country
              </label>
              <select
                value={countryInterest}
                onChange={(e) => setCountryInterest(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none bg-white"
              >
                <option value="Germany">Germany 🇩🇪</option>
                <option value="Italy">Italy 🇮🇹</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Canada">Canada 🇨🇦</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Target Course / Degree
              </label>
              <input
                type="text"
                placeholder="e.g. MSc Data Science & AI"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Graduation Degree &amp; Score
              </label>
              <input
                type="text"
                placeholder="B.Tech (7.8 CGPA)"
                value={graduationScore}
                onChange={(e) => setGraduationScore(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                IELTS / Language Band
              </label>
              <input
                type="text"
                placeholder="Overall Band (e.g. 7.0)"
                value={overallBand}
                onChange={(e) => setOverallBand(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-[#e21b22]/20 focus:border-[#e21b22] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e21b22] to-rose-600 hover:from-[#c4151b] hover:to-rose-700 text-white font-extrabold shadow-md shadow-red-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Register &amp; Launch Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

