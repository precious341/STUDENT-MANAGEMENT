import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { RegistrationView } from './components/RegistrationView';
import { StudentsView } from './components/StudentsView';
import { ResultsView } from './components/ResultsView';
import { SettingsView } from './components/SettingsView';
import { StudentDetailModal } from './components/StudentDetailModal';
import { EditStudentModal } from './components/EditStudentModal';
import { 
  loadStudents, 
  saveStudents, 
  loadResults, 
  saveResults 
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState(() => loadStudents());
  const [results, setResults] = useState(() => loadResults());
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Modals state
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // Persist students
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  // Persist results
  useEffect(() => {
    saveResults(results);
  }, [results]);

  // Actions
  const handleRegisterStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id) => {
    if (confirm('Are you sure you want to delete this student record from EduRecords?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setResults(prev => prev.filter(r => r.studentId !== id));
    }
  };

  const handleAddResult = (newResult) => {
    setResults(prev => [newResult, ...prev]);
  };

  const handleDeleteResult = (id) => {
    if (confirm('Are you sure you want to delete this course result?')) {
      setResults(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleResetData = () => {
    setStudents(loadStudents());
    setResults(loadResults());
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentCount={students.length}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#1b43b6] text-white border-b border-blue-600/30 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsOpenMobile(true)}
              className="p-1.5 rounded-lg hover:bg-blue-600 text-white cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-base tracking-tight">EduRecords</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/50 font-mono tabular-nums">
              {students.length} Enrolled
            </span>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              students={students}
              results={results}
              setActiveTab={setActiveTab}
              onViewStudent={(s) => setViewingStudent(s)}
              onEditStudent={(s) => setEditingStudent(s)}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              onViewStudent={(s) => setViewingStudent(s)}
              onEditStudent={(s) => setEditingStudent(s)}
              onDeleteStudent={handleDeleteStudent}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'registration' && (
            <RegistrationView
              onRegisterStudent={handleRegisterStudent}
              existingStudents={students}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'results' && (
            <ResultsView
              results={results}
              students={students}
              onAddResult={handleAddResult}
              onDeleteResult={handleDeleteResult}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* View Student Profile Modal */}
      <StudentDetailModal
        student={viewingStudent}
        results={results}
        onClose={() => setViewingStudent(null)}
        onEdit={(student) => {
          setViewingStudent(null);
          setEditingStudent(student);
        }}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        student={editingStudent}
        isOpen={Boolean(editingStudent)}
        onClose={() => setEditingStudent(null)}
        onSave={handleUpdateStudent}
      />
    </div>
  );
}
