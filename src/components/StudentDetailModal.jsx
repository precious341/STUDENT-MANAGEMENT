import React from 'react';
import { X, Mail, Phone, Calendar, BookOpen, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { formatShortDate } from '../utils/date';

export const StudentDetailModal = ({
  student,
  results,
  onClose,
  onEdit,
}) => {
  if (!student) return null;

  const studentResults = results.filter(r => r.studentId === student.id);
  const avgGrade = studentResults.length > 0
    ? (studentResults.reduce((a, b) => a + b.score, 0) / studentResults.length).toFixed(1)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg font-extrabold shadow-sm">
              {student.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-white/20 text-white">
                {student.id}
              </span>
              <h2 className="text-xl font-bold mt-1 leading-snug">{student.fullName}</h2>
              <p className="text-xs text-blue-100 font-medium">{student.department}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-medium uppercase text-[10px] block">Age & Level</span>
              <p className="font-bold text-slate-800 mt-0.5">{student.age} years old · {student.level.split(' ')[0]}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-medium uppercase text-[10px] block">Academic Status</span>
              <p className="font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{student.status}</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-medium uppercase text-[10px] block">Email</span>
              <p className="font-medium text-slate-800 mt-0.5 truncate">{student.email}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-slate-400 font-medium uppercase text-[10px] block">Admission Date</span>
              <p className="font-medium text-slate-800 mt-0.5">{formatShortDate(student.registrationDate)}</p>
            </div>
          </div>

          {/* Academic Course Results */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Recorded Course Results ({studentResults.length})
              </h4>
              {avgGrade && (
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Avg: {avgGrade}%
                </span>
              )}
            </div>

            {studentResults.length === 0 ? (
              <div className="p-4 text-center border border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
                No academic grades recorded for this student yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                {studentResults.map(res => (
                  <div key={res.id} className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div>
                      <span className="font-mono font-bold text-blue-600 mr-2">{res.courseCode}</span>
                      <span className="text-slate-700 font-medium">{res.courseTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800">{res.score}%</span>
                      <span className="w-5 h-5 rounded font-bold text-[10px] flex items-center justify-center bg-blue-100 text-blue-800">
                        {res.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Edit Details
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
