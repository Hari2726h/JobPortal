package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Company;
import com.examly.springapp.model.User;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    Company findByEmployer(User employeer);
}
