package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.CompanyNotFoundException;
import com.examly.springapp.model.Application;
import com.examly.springapp.model.Job;
import com.examly.springapp.repository.ApplicationRepository;
import com.examly.springapp.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.CompanyNotFoundException;
import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepository;
import java.util.*;

@Service
public class ApplicationService {
     @Autowired
     private ApplicationRepository applicationRepository;
     @Autowired
     private JobRepository jobRepository;

     public Application createApplication(Application application) {
          Long userId = application.getUser().getId();
          Long jobId = application.getJob().getId();

          if (applicationRepository.existsByUserIdAndJobId(userId, jobId)) {
               throw new RuntimeException("You have already applied to this job.");
          }

          return applicationRepository.save(application);
     }

    
     public List<Application> getApplicationsByCompanyId(Long companyId) {
          return applicationRepository.findByJobCompanyyId(companyId);
     }

     public List<Application> getAllApplications() {
          return applicationRepository.findAll();
     }

     public Application getApplicationById(Long id) {
          return applicationRepository.findById(id)
                    .orElseThrow(() -> new CompanyNotFoundException("Application Not found"));
     }

     public Application updateApplication(Application application, Long id) {
          Application old = applicationRepository.findById(id)
                    .orElseThrow(() -> new CompanyNotFoundException("Application Not found"));

          old.setResumeUrl(application.getResumeUrl());
          old.setStatus(application.getStatus());

          if ("Reviewed".equalsIgnoreCase(application.getStatus())) {
               if (old.getJob() != null) {
                    Job job = old.getJob();
                    job.setStatus("Has Reviewed Applications");
                    jobRepository.save(job);
               }
          }

          return applicationRepository.save(old);
     }

     public List<Application> getApplicationsByUserId(Long userId) {
          return applicationRepository.findByUserId(userId);
     }

     public void deleteApplicationById(Long id) {
          applicationRepository.deleteById(id);
     }

     public List<Application> searchApplications(String keyword) {
          return applicationRepository.searchByApplicantName(keyword);
     }

}
