package com.studentmanagement.service;

import com.studentmanagement.exception.StudentNotFoundException;
import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final AtomicInteger totalRegistrations = new AtomicInteger(0);

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student registerStudent(Student student) {
        Student savedStudent = studentRepository.save(student);
        totalRegistrations.incrementAndGet();
        recordRegistrationActivity(savedStudent);
        return savedStudent;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + id));
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        student.setFullName(studentDetails.getFullName());
        student.setAge(studentDetails.getAge());
        student.setDepartment(studentDetails.getDepartment());
        student.setLevel(studentDetails.getLevel());
        student.setEmail(studentDetails.getEmail());
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public List<Student> searchStudents(String name) {
        return studentRepository.findByFullNameContainingIgnoreCase(name);
    }

    public int getTotalRegistrationsInSession() {
        return totalRegistrations.get();
    }

    @Async
    public void recordRegistrationActivity(Student student) {
        try {
            Thread.sleep(1000);
            System.out.println("Background Task [Thread: " + Thread.currentThread().getName() + 
                    "] - Recorded registration for: " + student.getFullName() + 
                    ". Total in-memory session registrations: " + totalRegistrations.get());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
