import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { DEPARTMENTS, generateStudentId } from '../utils/storage';

export const RegistrationView = ({
  onRegisterStudent,
  existingStudents,
  setActiveTab,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('100 Level (Freshman)');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Status and notification
  const [successInfo, setSuccessInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const levels = [
    '100 Level (Freshman)',
    '200 Level (Sophomore)',
    '300 Level (Junior)',
    '400 Level (Senior)',
    'Graduate / Masters'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMessage('Full Name is required and cannot be empty.');
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 10 || parsedAge > 90) {
      setErrorMessage('Please enter a valid age (between 10 and 90 years).');
      return;
    }

    if (!department) {
      setErrorMessage('Please select a department.');
      return;
    }

    if (!level) {
      setErrorMessage('Please select a level of study.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Check duplicate email
    const exists = existingStudents.some(
      s => s.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      setErrorMessage(`A student with email ${email.trim()} is already registered.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = generateStudentId(existingStudents);
      const newStudent = {
        id: generatedId,
        fullName: trimmedName,
        age: parsedAge,
        department,
        level,
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Active',
      };

      onRegisterStudent(newStudent);

      setSuccessInfo({
        message: `Student registered successfully! Registered: ${trimmedName}, Age: ${parsedAge}`,
        student: newStudent
      });

      // Clear form inputs
      setFullName('');
      setAge('');
      setDepartment('');
      setEmail('');
      setPhone('');
      setIsSubmitting(false);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const handleReset = () => {
    setFullName('');
    setAge('');
    setDepartment('');
    setEmail('');
    setPhone('');
    setErrorMessage(null);
    setSuccessInfo(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-slate-400 tracking-wide">
          Workspace <span className="text-slate-300">/</span> <span className="text-slate-600 font-semibold">Registration</span>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successInfo && (
        <div className="max-w-xl mx-auto p-4 bg-emerald-50 border border-emerald-200 rounded-xl shadow-xs transition-all animate-slideDown">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-emerald-900">
                ✓ {successInfo.message}
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                Student ID: <span className="font-mono font-bold">{successInfo.student.id}</span> · Department: {successInfo.student.department} · {successInfo.student.level}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('students')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                >
                  <span>View in student database</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-emerald-300">·</span>
                <button
                  onClick={() => setSuccessInfo(null)}
                  className="text-xs text-emerald-600 hover:text-emerald-800 cursor-pointer"
                >
                  Register another student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="max-w-xl mx-auto p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-xs transition-all animate-shake">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-rose-900">Validation Error</h4>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Centered Registration Card (Clean centered JavaFX-inspired form aesthetic) */}
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
            <h2 className="text-lg font-extrabold uppercase tracking-wider">
              Student Registration
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              Enter the student's personal and academic records below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ifeanyichukwu Precious"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                required
              />
            </div>

            {/* Age & Level Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div className="space-y-1.5">
                <label htmlFor="age" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  id="age"
                  type="number"
                  min="10"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 22"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium font-mono tabular-nums"
                  required
                />
              </div>

              {/* Level */}
              <div className="space-y-1.5">
                <label htmlFor="level" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Level <span className="text-rose-500">*</span>
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                  required
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label htmlFor="department" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                required
              >
                <option value="">-- Select Academic Department --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. preciousifeanyichukwu64@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                required
              />
            </div>

            {/* Optional Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Phone Number <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +234 814 559 8210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white rounded-lg text-sm font-bold tracking-wide uppercase transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
                <span>{isSubmitting ? 'Registering...' : 'REGISTER'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset fields"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Link to Student Roster below registration */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Currently managing <span className="font-semibold text-slate-800">{existingStudents.length}</span> enrolled students.
          </p>
          <button
            onClick={() => setActiveTab('students')}
            className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            Open Enrolled Student Directory →
          </button>
        </div>
      </div>
    </div>
  );
};
