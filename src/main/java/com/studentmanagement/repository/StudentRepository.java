package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByFullNameContainingIgnoreCase(String name);
}
