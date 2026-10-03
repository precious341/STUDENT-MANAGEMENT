# EduRecords — Student Management System

EduRecords is a modern, academic Student Management System designed for registrars, faculties, and academic institutions. It features an intuitive **JSX frontend** matching the official EduRecords dashboard and an enterprise **Java 21 Spring Boot + MySQL backend**.

## Architecture & Technology Stack

- **Frontend**: Plain React JSX (`.jsx`), Vanilla CSS/Tailwind, Lucide icons, native JavaScript DOM & Fetch API. No TypeScript/TSX.
- **Backend**: Java 21, Spring Boot 3.2, Spring Data JPA / Hibernate, REST API endpoints.
- **Database**: MySQL / MariaDB (Database: `student_management`).
- **Date & Calendar Synchronization**: Accurately tracks the current academic date (e.g. `SATURDAY, 3 OCTOBER 2026`) with a live digital clock.

## Key Features

1. **Dashboard Overview**:
   - Live date display: `SATURDAY, 3 OCTOBER 2026`
   - Real-time greeting: `Good afternoon, Admin`
   - Real-time seconds counter (e.g., `2:21:40 PM`)
   - 4 Main Metric Cards: Total Students, Registered this Term, Results Recorded, Average Performance
   - Recent Student Registrations list & Faculty enrollment distribution.
2. **Student Registration**:
   - Centered, clean JavaFX-inspired registration form.
   - Form fields: Full Name, Age, Department, Level, Email Address, Phone Number.
   - Field validations (Name required, Age 10-90, valid email, department selection).
   - Clear success banner: `✓ Student registered successfully! Registered: [Name], Age: [Age]`.
3. **Registered Students Directory**:
   - Real-time search across student names, matriculation IDs, departments, and emails.
   - Filtering by department and study level.
   - View Student Profile modal, Edit details modal, Delete with confirmation.
   - One-click CSV export of the enrolled student roster.
4. **Academic Results & Grading**:
   - Continuous assessment and semester exam recording.
   - Automatic letter grading (A, B, C, D, F) based on numerical scores (0-100).
   - Semester GPA and average score tracking.
5. **System Settings**:
   - Configurable academic terms and sessions (e.g., 2026/2027 Harmattan Term).
   - Registrar profile configuration.
   - One-click demo data reset & JSON state backup.

## Running the Application

### 1. In Browser / Dev Server
```bash
npm run dev
```
Open the development URL (default port 3000) to access the complete EduRecords dashboard.

### 2. Running the Java Spring Boot Backend Locally
```bash
# Configure MySQL credentials in src/main/resources/application.properties if needed
mvn clean install
mvn spring-boot:run
```
The Java REST API will start on `http://localhost:8080/api/students`.
