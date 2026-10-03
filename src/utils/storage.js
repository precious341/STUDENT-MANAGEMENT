const STUDENTS_STORAGE_KEY = 'edurecords_students_v1';
const RESULTS_STORAGE_KEY = 'edurecords_results_v1';

export const INITIAL_STUDENTS = [
  {
    id: 'EDU/2026/001',
    fullName: 'Ifeanyichukwu Precious',
    age: 22,
    department: 'Computer Science',
    level: '300 Level (Junior)',
    email: 'preciousifeanyichukwu64@gmail.com',
    phone: '+234 814 559 8210',
    registrationDate: '2026-10-01',
    status: 'Active',
    gender: 'Male',
    cgpa: 3.85,
  },
  {
    id: 'EDU/2026/002',
    fullName: 'Amara Okonkwo',
    age: 20,
    department: 'Software Engineering',
    level: '200 Level (Sophomore)',
    email: 'amara.okonkwo@university.edu',
    phone: '+234 802 334 1198',
    registrationDate: '2026-10-02',
    status: 'Active',
    gender: 'Female',
    cgpa: 3.92,
  },
  {
    id: 'EDU/2026/003',
    fullName: 'David Chukwuma Vance',
    age: 23,
    department: 'Electrical & Electronics',
    level: '400 Level (Senior)',
    email: 'david.vance@university.edu',
    phone: '+234 703 992 4412',
    registrationDate: '2026-09-28',
    status: 'Active',
    gender: 'Male',
    cgpa: 3.64,
  },
  {
    id: 'EDU/2026/004',
    fullName: 'Fatima Zahra Al-Mansoor',
    age: 19,
    department: 'Economics & Statistics',
    level: '100 Level (Freshman)',
    email: 'fatima.almansoor@university.edu',
    phone: '+234 809 112 5589',
    registrationDate: '2026-10-03',
    status: 'Active',
    gender: 'Female',
    cgpa: 3.75,
  },
  {
    id: 'EDU/2026/005',
    fullName: 'Michael Babatunde Cole',
    age: 21,
    department: 'Cybersecurity',
    level: '300 Level (Junior)',
    email: 'm.cole@university.edu',
    phone: '+234 816 772 3301',
    registrationDate: '2026-09-25',
    status: 'Active',
    gender: 'Male',
    cgpa: 3.48,
  }
];

export const INITIAL_RESULTS = [
  {
    id: 'RES/2026/101',
    studentId: 'EDU/2026/001',
    studentName: 'Ifeanyichukwu Precious',
    courseCode: 'CSC 301',
    courseTitle: 'Data Structures & Algorithms in Java',
    creditUnits: 3,
    score: 89,
    grade: 'A',
    semester: 'Harmattan Term 2026',
    recordedDate: '2026-09-30'
  },
  {
    id: 'RES/2026/102',
    studentId: 'EDU/2026/001',
    studentName: 'Ifeanyichukwu Precious',
    courseCode: 'CSC 305',
    courseTitle: 'Database Management Systems & SQL',
    creditUnits: 3,
    score: 92,
    grade: 'A',
    semester: 'Harmattan Term 2026',
    recordedDate: '2026-10-01'
  },
  {
    id: 'RES/2026/103',
    studentId: 'EDU/2026/002',
    studentName: 'Amara Okonkwo',
    courseCode: 'SWE 202',
    courseTitle: 'Object Oriented Programming Principles',
    creditUnits: 4,
    score: 95,
    grade: 'A',
    semester: 'Harmattan Term 2026',
    recordedDate: '2026-10-02'
  },
  {
    id: 'RES/2026/104',
    studentId: 'EDU/2026/003',
    studentName: 'David Chukwuma Vance',
    courseCode: 'EEE 401',
    courseTitle: 'Digital Signal Processing',
    creditUnits: 3,
    score: 78,
    grade: 'B',
    semester: 'Harmattan Term 2026',
    recordedDate: '2026-09-29'
  }
];

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading students from storage:', e);
    return INITIAL_STUDENTS;
  }
}

export function saveStudents(students) {
  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students to storage:', e);
  }
}

export function loadResults() {
  try {
    const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(INITIAL_RESULTS));
      return INITIAL_RESULTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading results from storage:', e);
    return INITIAL_RESULTS;
  }
}

export function saveResults(results) {
  try {
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
  } catch (e) {
    console.error('Error saving results to storage:', e);
  }
}

export function resetDemoData() {
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(INITIAL_RESULTS));
}

export function generateStudentId(students) {
  const currentYear = new Date().getFullYear();
  const nextNum = students.length + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `EDU/${currentYear}/${padded}`;
}

export const DEPARTMENTS = [
  'Computer Science',
  'Software Engineering',
  'Cybersecurity',
  'Information Technology',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Economics & Statistics',
  'Business Administration',
  'Accounting & Finance',
  'Medicine & Surgery',
  'Pharmacy',
  'Law & Jurisprudence',
  'Biochemistry',
  'Mass Communication'
];
