package com.examly.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Application;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
        List<Application> findByUserId(Long userId);
        List<Application> findByJobCompanyyId(Long companyId);
}