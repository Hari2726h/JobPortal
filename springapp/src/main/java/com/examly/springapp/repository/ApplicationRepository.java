package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Application;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    
}
