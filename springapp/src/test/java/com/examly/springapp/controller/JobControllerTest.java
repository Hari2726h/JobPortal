package com.examly.springapp.controller;

import com.examly.springapp.model.Job;
import com.examly.springapp.service.JobService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JobController.class)
class JobControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @Test
    void testcontrollerGetAllJobs() throws Exception {
        Job job = new Job(1L, "Frontend Developer", "Tech Solutions Inc.", "New York, NY", "Full-time",
                LocalDate.of(2023, 10, 15), "desc", Arrays.asList("React", "HTML"), "$80,000-$100,000", LocalDate.of(2023, 11, 15));
        when(jobService.getAllJobs()).thenReturn(Collections.singletonList(job));
        mockMvc.perform(get("/api/jobs").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("Frontend Developer")));
    }

    @Test
    void testcontrollerGetJobById_Found() throws Exception {
        Job job = new Job(2L, "Backend Developer", "Cloud Apex", "Remote", "Part-time",
                LocalDate.of(2023, 11, 2), "desc", Arrays.asList("Java", "Spring Boot"), "$70,000-$90,000", LocalDate.of(2023, 12, 1));
        when(jobService.getJobById(2L)).thenReturn(job);
        mockMvc.perform(get("/api/jobs/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(2)))
                .andExpect(jsonPath("$.title", is("Backend Developer")));
    }

    @Test
    void testcontrollerGetJobById_NotFound() throws Exception {
        when(jobService.getJobById(77L)).thenThrow(new RuntimeException("Job not found with id: 77"));
        mockMvc.perform(get("/api/jobs/77").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", is("Job not found with id: 77")));
    }

    @Test
    void testcontrollerSearchJobsByKeyword() throws Exception {
        Job job = new Job(3L, "Java Engineer", "Acme Corp", "Boston", "Full-time",
                LocalDate.of(2023, 9, 1), "desc", Arrays.asList("Java", "Spring"), "$70k-$90k", LocalDate.of(2023, 10, 1));
        when(jobService.searchJobsByKeyword("Java")).thenReturn(Collections.singletonList(job));
        mockMvc.perform(get("/api/jobs/search?keyword=Java").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("Java Engineer")));
    }

    @Test
    void testcontrollerSearchJobsByKeyword_NoResults() throws Exception {
        when(jobService.searchJobsByKeyword("Python")).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/jobs/search?keyword=Python").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
}
