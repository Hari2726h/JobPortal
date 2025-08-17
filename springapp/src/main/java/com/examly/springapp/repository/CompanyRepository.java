package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Company;
import com.examly.springapp.model.User;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    Company findByEmployer(User employeer);
        List<Company> findByNameContainingIgnoreCase(String name);
        }
        