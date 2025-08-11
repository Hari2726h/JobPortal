package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Job;

public interface JobRepository extends JpaRepository<Job,Long>{
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByCompanyyId(Long companyId);
    
}

