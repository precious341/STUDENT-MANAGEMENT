import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Download, 
  Users 
} from 'lucide-react';
import { DEPARTMENTS } from '../utils/storage';

export const StudentsView = ({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  setActiveTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Filter students based on search and dropdowns
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = 
        selectedDepartment === 'All' || student.department === selectedDepartment;

      const matchesLevel = 
        selectedLevel === 'All' || student.level.includes(selectedLevel);

      return matchesSearch && matchesDept && matchesLevel;
    });
  }, [students, searchQuery, selectedDepartment, selectedLevel]);

  // Export CSV handler
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = ['Student ID', 'Full Name', 'Age', 'Department', 'Level', 'Email', 'Phone', 'Registration Date', 'Status'];
    const rows = students.map(s => [
      `"${s.id}"`,
      `"${s.fullName}"`,
      s.age,
      `"${s.department}"`,
      `"${s.level}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      `"${s.registrationDate}"`,
      `"${s.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduRecords_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-slate-400 tracking-wide mb-1">
            Workspace <span className="text-slate-300">/</span> <span className="text-slate-600 font-semibold">Students</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Registered Students Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View, search, edit, and manage all enrolled students in the database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('registration')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, ID, email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Department Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {(searchQuery || selectedDepartment !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('All');
                setSelectedLevel('All');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 whitespace-nowrap cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No students found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery || selectedDepartment !== 'All' || selectedLevel !== 'All'
                ? 'Try adjusting your search criteria or clearing your current filters.'
                : 'There are no students currently enrolled in the system. Register your first student to begin.'}
            </p>
            <button
              onClick={() => setActiveTab('registration')}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Student Now</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-3">Age</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-3">Level</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 px-4 font-mono font-medium text-slate-600 tabular-nums">
                      {student.id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100/70 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {student.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {student.fullName}
                          </p>
                          {student.phone && (
                            <p className="text-[10px] text-slate-400 font-mono">{student.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono font-semibold text-slate-700 tabular-nums">
                      {student.age}
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800">
                      {student.department}
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      <span className="font-medium">{student.level.split(' ')[0]}</span>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-500">
                      <a href={`mailto:${student.email}`} className="hover:text-blue-600 hover:underline">
                        {student.email}
                      </a>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                        student.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          title="View student profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                          title="Edit student"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteStudent(student.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Delete student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info bar */}
        <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="font-semibold text-slate-800">{filteredStudents.length}</strong> of {students.length} students</span>
          <span className="font-mono text-[11px]">Academic Year 2026/2027</span>
        </div>
      </div>
    </div>
  );
};
