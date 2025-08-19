package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Application;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
        List<Application> findByUserId(Long userId);

        List<Application> findByJobCompanyyId(Long companyId);

        @Query("SELECT a FROM Application a WHERE LOWER(a.user.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
        List<Application> searchByApplicantName(@Param("keyword") String keyword);

        List<Application> findByNameContainingIgnoreCase(String name);
        boolean existsByUserIdAndJobId(Long userId, Long jobId);

}