import React, { useState } from 'react';
import { 
  Settings, 
  RotateCcw, 
  Download, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { resetDemoData } from '../utils/storage';

export const SettingsView = ({ onResetData }) => {
  const [session, setSession] = useState('2026/2027 Academic Session');
  const [semester, setSemester] = useState('Harmattan (First) Semester');
  const [registrarName, setRegistrarName] = useState('Admin User');
  const [registrarEmail, setRegistrarEmail] = useState('registrar@edurecords.edu');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDataClick = () => {
    if (confirm('Are you sure you want to reset all records to the original demo data?')) {
      resetDemoData();
      onResetData();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl">
      {/* Breadcrumb & Header */}
      <div>
        <div className="text-xs font-medium text-slate-400 tracking-wide mb-1">
          Workspace <span className="text-slate-300">/</span> <span className="text-slate-600 font-semibold">About & Settings</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          System Configuration & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage academic sessions, registrar profile parameters, and database state
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Academic Term Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>Academic Calendar Configuration</span>
        </h2>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Active Academic Session</label>
              <input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Academic Term</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Harmattan (First) Semester">Harmattan (First) Semester</option>
                <option value="Rain (Second) Semester">Rain (Second) Semester</option>
                <option value="Summer / Special Term">Summer / Special Term</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Registrar Name</label>
              <input
                type="text"
                value={registrarName}
                onChange={(e) => setRegistrarName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Registrar Email</label>
              <input
                type="email"
                value={registrarEmail}
                onChange={(e) => setRegistrarEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* System Information & Maintenance */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>System Information & Database State</span>
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          EduRecords Student Management Platform v2.4 (October 2026 Release).
        </p>

        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Reset Demo Student Records</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Restore the initial cohort of registered students and academic grades.
            </p>
          </div>
          <button
            onClick={handleResetDataClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
