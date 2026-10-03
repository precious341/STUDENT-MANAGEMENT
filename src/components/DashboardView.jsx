import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileCheck2, 
  BookOpen, 
  BarChart3, 
  Plus, 
  ArrowUpRight, 
  Eye, 
  Award
} from 'lucide-react';
import { formatDashboardDate, formatTimeWithSeconds, getGreeting } from '../utils/date';

export const DashboardView = ({
  students,
  results,
  setActiveTab,
  onViewStudent,
  onEditStudent,
}) => {
  // Live clock state
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute metrics
  const totalStudents = students.length;
  const registeredThisTerm = students.filter(s => s.status === 'Active').length;
  const resultsRecorded = results.length;
  
  // Calculate average performance
  const averagePerformance = results.length > 0 
    ? (results.reduce((acc, curr) => acc + curr.score, 0) / results.length).toFixed(1) + '%'
    : '—';

  // Department distribution
  const departmentCounts = {};
  students.forEach(s => {
    departmentCounts[s.department] = (departmentCounts[s.department] || 0) + 1;
  });

  const sortedDepts = Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-slate-400 tracking-wide">
          Workspace <span className="text-slate-300">/</span> <span className="text-slate-600 font-semibold">Dashboard</span>
        </div>
      </div>

      {/* Hero Welcome Header */}
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          {formatDashboardDate(currentDate)}
        </p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {getGreeting(currentDate)}, Admin
        </h1>

        <p className="text-sm sm:text-base text-slate-600 flex items-center gap-1.5 flex-wrap">
          <span>Here's what's happening across your student records today.</span>
          <span className="font-mono text-slate-700 font-semibold tabular-nums px-1.5 py-0.5 rounded bg-slate-200/70 text-xs">
            {formatTimeWithSeconds(currentDate)}
          </span>
        </p>
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={() => setActiveTab('registration')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-semibold shadow-sm transition-all shadow-blue-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Register student</span>
        </button>
      </div>

      {/* 4 Stat Cards Matching the Uploaded Photo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
            <Users className="w-5 h-5 stroke-[2]" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Total students</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 font-mono tabular-nums tracking-tight">
            {totalStudents}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">All enrolled records</p>
        </div>

        {/* Card 2: Registered This Term */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
            <FileCheck2 className="w-5 h-5 stroke-[2]" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Registered this term</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 font-mono tabular-nums tracking-tight">
            {registeredThisTerm}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Active registrations</p>
        </div>

        {/* Card 3: Results Recorded */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
            <BookOpen className="w-5 h-5 stroke-[2]" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Results recorded</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 font-mono tabular-nums tracking-tight">
            {resultsRecorded}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Academic submissions</p>
        </div>

        {/* Card 4: Average Performance */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4">
            <BarChart3 className="w-5 h-5 stroke-[2]" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Average performance</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 font-mono tabular-nums tracking-tight">
            {averagePerformance}
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Across all results</p>
        </div>
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Recent Registrations Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Registrations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest enrolled students across faculties</p>
            </div>
            <button
              onClick={() => setActiveTab('students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View all students</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 rounded-lg">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No student records yet</p>
              <p className="text-xs text-slate-400 mt-1">Get started by registering your first student record</p>
              <button
                onClick={() => setActiveTab('registration')}
                className="mt-3 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold hover:bg-blue-100 cursor-pointer"
              >
                + Register First Student
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Student</th>
                    <th className="pb-3 font-semibold">Department</th>
                    <th className="pb-3 font-semibold">Level</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.slice(0, 5).map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                            {student.fullName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-tight">{student.fullName}</p>
                            <p className="text-[11px] font-mono text-slate-400 tabular-nums">{student.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600 font-medium">{student.department}</td>
                      <td className="py-3 text-slate-500">{student.level.split(' ')[0]} Lvl</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                          student.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewStudent(student)}
                            className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors cursor-pointer"
                            title="View student profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Side Panel: Department Distribution & Quick Actions (1 Col) */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('registration')}
                className="p-3 text-left bg-blue-50/60 hover:bg-blue-50 border border-blue-100 rounded-lg transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center mb-2">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-xs font-semibold text-slate-900">New Registration</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Enroll new student</p>
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className="p-3 text-left bg-purple-50/60 hover:bg-purple-50 border border-purple-100 rounded-lg transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-purple-600 text-white flex items-center justify-center mb-2">
                  <Award className="w-4 h-4 stroke-[2]" />
                </div>
                <p className="text-xs font-semibold text-slate-900">Enter Results</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Submit exam scores</p>
              </button>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Department Enrollment</h3>
            <p className="text-xs text-slate-500 mb-4">Breakdown of students by department</p>

            {sortedDepts.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No department data yet.</p>
            ) : (
              <div className="space-y-3.5">
                {sortedDepts.map(([dept, count]) => {
                  const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700 truncate max-w-[170px]">{dept}</span>
                        <span className="font-mono text-slate-500 tabular-nums">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
