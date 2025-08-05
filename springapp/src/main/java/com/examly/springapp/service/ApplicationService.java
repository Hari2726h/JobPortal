package com.examly.springapp.service;

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
     
     public Application createApplication(Application application){
        return applicationRepository.save(application);
     }

     public List<Application> getAllApplications(){
      return applicationRepository.findAll();
     }

     public Application getApplicationById(Long id){
      return applicationRepository.findById(id)
      .orElseThrow(()-> new CompanyNotFoundException("Application Not found"));
     }

     public Application updateApplication(Application application,Long id){
      Application old=applicationRepository.findById(id)
                     .orElseThrow(()-> new CompanyNotFoundException("Application Not found"));
      old.setResumeUrl(application.getResumeUrl());
      old.setStatus(application.getStatus());
      return applicationRepository.save(old);
     }

     public void deleteApplicationById(Long id){
      applicationRepository.deleteById(id);
     }
}
