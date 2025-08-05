package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    public List<Job> getAllJobs(){
        return jobService.getAllJobs();
    }
    @GetMapping("/search")
    public List<Job> searchJobsByKeyword(@RequestParam String keyword){
        return jobService.searchJobsByKeyword(keyword);
    }
}
