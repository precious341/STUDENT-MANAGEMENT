import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  Search, 
  TrendingUp, 
  BookOpen, 
  Trash2
} from 'lucide-react';

export const ResultsView = ({
  results,
  students,
  onAddResult,
  onDeleteResult,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Result Form state
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [creditUnits, setCreditUnits] = useState(3);
  const [score, setScore] = useState('');
  const [semester, setSemester] = useState('Harmattan Term 2026');

  // Compute stats
  const totalResults = results.length;
  const avgScore = totalResults > 0 
    ? (results.reduce((a, b) => a + b.score, 0) / totalResults).toFixed(1)
    : '0';

  const highestScore = totalResults > 0
    ? Math.max(...results.map(r => r.score))
    : 0;

  const passedCount = results.filter(r => r.score >= 50).length;
  const passRate = totalResults > 0 
    ? Math.round((passedCount / totalResults) * 100)
    : 0;

  const calculateGrade = (scoreNum) => {
    if (scoreNum >= 70) return 'A';
    if (scoreNum >= 60) return 'B';
    if (scoreNum >= 50) return 'C';
    if (scoreNum >= 45) return 'D';
    return 'F';
  };

  const handleSubmitResult = (e) => {
    e.preventDefault();
    if (!selectedStudentId || !courseCode || !courseTitle || score === '') return;

    const studentObj = students.find(s => s.id === selectedStudentId);
    const studentName = studentObj ? studentObj.fullName : 'Unknown Student';
    const scoreNum = Number(score);

    const newResult = {
      id: `RES/2026/${Math.floor(100 + Math.random() * 900)}`,
      studentId: selectedStudentId,
      studentName,
      courseCode: courseCode.trim().toUpperCase(),
      courseTitle: courseTitle.trim(),
      creditUnits: Number(creditUnits),
      score: scoreNum,
      grade: calculateGrade(scoreNum),
      semester,
      recordedDate: new Date().toISOString().split('T')[0]
    };

    onAddResult(newResult);
    setShowAddModal(false);

    // Reset fields
    setSelectedStudentId('');
    setCourseCode('');
    setCourseTitle('');
    setScore('');
  };

  const filteredResults = results.filter(r => 
    r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-slate-400 tracking-wide mb-1">
            Workspace <span className="text-slate-300">/</span> <span className="text-slate-600 font-semibold">Results</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Results & Grading
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Record student semester grades, compute performance metrics, and manage academic submissions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Result</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Submissions</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 font-mono tabular-nums">{totalResults}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all courses</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 font-mono tabular-nums">{avgScore}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Mean grading scale</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pass Rate</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 font-mono tabular-nums">{passRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Highest: {highestScore}%</p>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search results by student or course..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No academic results recorded</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Start by entering exam grades and continuous assessment scores for registered students.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record First Grade</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-3 text-center">Units</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-3 text-center">Grade</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{result.studentName}</p>
                      <p className="text-[10px] font-mono text-slate-400 tabular-nums">{result.studentId}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                        {result.courseCode}
                      </span>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">{result.courseTitle}</p>
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-slate-600 tabular-nums">
                      {result.creditUnits}
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 tabular-nums">
                      {result.score}%
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs font-mono ${
                        result.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        result.grade === 'C' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {result.grade}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {result.semester}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onDeleteResult(result.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        title="Delete Result"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-scaleUp">
            <h3 className="text-base font-bold text-slate-900 mb-1">Record Course Result</h3>
            <p className="text-xs text-slate-500 mb-4">Submit exam or assessment grade for an enrolled student</p>

            <form onSubmit={handleSubmitResult} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Student *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                >
                  <option value="">-- Choose enrolled student --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.fullName} ({student.id}) - {student.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Code *</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. CSC 301"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Credit Units *</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={creditUnits}
                    onChange={(e) => setCreditUnits(parseInt(e.target.value) || 3)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Title *</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Data Structures & Algorithms"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Score (0 - 100) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="85"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grade (Auto)</label>
                  <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-extrabold text-slate-800">
                    {score !== '' ? calculateGrade(Number(score)) : '—'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Term / Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Harmattan Term 2026">Harmattan Term 2026</option>
                  <option value="Rain Term 2026">Rain Term 2026</option>
                  <option value="First Semester 2026/2027">First Semester 2026/2027</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
