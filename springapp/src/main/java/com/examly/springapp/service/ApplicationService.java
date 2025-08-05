package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
