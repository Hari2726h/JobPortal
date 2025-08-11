package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Job;
import com.examly.springapp.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    
    
    @PostMapping
    public Job createJob(@RequestBody Job job){
        return jobService.createJob(job);
    }
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id){
        return jobService.getJobById(id);    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(){
        return ResponseEntity.ok(jobService.getAllJobs());
    }
    @GetMapping("/search")
    public List<Job> searchJobsByKeyword(@RequestParam String keyword){
        return jobService.searchJobsByKeyword(keyword);
    }
    @PutMapping("/{id}")
    public Job updatedJob(@RequestBody Job job,@PathVariable Long id){
        return jobService.updateJob(job,id);
    }
    
    @DeleteMapping("/delete/{did}")
    public void deleteJobById(@PathVariable Long did){
         jobService.deleteJobById(did);
    }
}
