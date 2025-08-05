package com.examly.springapp.config;

import java.time.LocalDate;
import java.util.Arrays;

import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;

import jakarta.annotation.PostConstruct;

public class DataInitializer {
    private final JobRepository jobRepository;
    public DataInitializer(JobRepository jobRepository){
        this.jobRepository=jobRepository;
    }
    @PostConstruct
    public void init(){
      if(jobRepository.count()==0){
        jobRepository.saveAll(Arrays.asList(
            new Job(null,"Frontend Developer","TechSoft","Bangalore","Full-time",LocalDate.now().minusDays(1),"Build Modern UIs With React",Arrays.asList("React","CSS"),"6-9LPA",LocalDate.now().plusWeeks(3)),
            new Job(null,"Backend Developer","TechSoft","Bangalore","Full-time",LocalDate.now().minusDays(1),"Build Modern UIs With React",Arrays.asList("React","CSS"),"6-9LPA",LocalDate.now().plusWeeks(3)),
            new Job(null,"FullStack Developer","TechSoft","Bangalore","Full-time",LocalDate.now().minusDays(1),"Build Modern UIs With React",Arrays.asList("React","CSS"),"6-9LPA",LocalDate.now().plusWeeks(3)),
            new Job(null,"Data Developer","TechSoft","Bangalore","Full-time",LocalDate.now().minusDays(1),"Build Modern UIs With React",Arrays.asList("React","CSS"),"6-9LPA",LocalDate.now().plusWeeks(3)),
            new Job(null,"Game Developer","TechSoft","Bangalore","Full-time",LocalDate.now().minusDays(1),"Build Modern UIs With React",Arrays.asList("React","CSS"),"6-9LPA",LocalDate.now().plusWeeks(3))
        ));
      }
    }
}
