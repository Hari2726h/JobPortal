package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.JobNotfoundException;
import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;
    
    public Job createJob(Job job){
        return jobRepository.save(job);
    }
    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }
    public Job getJobById(Long id){
        return jobRepository.findById(id).orElseThrow(()-> new JobNotfoundException("Job not found with id: "+id));
    }
    public List<Job> searchJobsByKeyword(String key){
        return jobRepository.findByTitleContainingIgnoreCase(key);
    }
    public Job updateJob(Job job,Long id){
        Job oldJob=jobRepository.findById(id)
                   .orElseThrow(()-> new JobNotfoundException("Job not found "));
        oldJob.setTitle(job.getTitle());
        oldJob.setDescription(job.getDescription());
        oldJob.setLocation(job.getLocation());
        oldJob.setCompanyy(job.getCompanyy());
        return jobRepository.save(oldJob);
    }
    public void deleteJobById(Long id){
        jobRepository.deleteById(id);
    }
}
