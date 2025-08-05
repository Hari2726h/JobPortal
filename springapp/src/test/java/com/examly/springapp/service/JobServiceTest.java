package com.examly.springapp.service;

import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JobServiceTest {
    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobService jobService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllJobs() {
        when(jobRepository.findAll()).thenReturn(Arrays.asList(new Job(), new Job()));
        List<Job> jobs = jobService.getAllJobs();
        assertEquals(2, jobs.size());
    }

    @Test
    void testGetJobById_Found() {
        Job job = new Job();
        job.setId(7L);
        when(jobRepository.findById(7L)).thenReturn(Optional.of(job));
        Job found = jobService.getJobById(7L);
        assertEquals(7L, found.getId());
    }

    @Test
    void testGetJobById_NotFound() {
        when(jobRepository.findById(77L)).thenReturn(Optional.empty());
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> jobService.getJobById(77L));
        assertEquals("Job not found with id: 77", thrown.getMessage());
    }

    @Test
    void testSearchJobsByKeyword() {
        when(jobRepository.findByTitleContainingIgnoreCase("java"))
                .thenReturn(Arrays.asList(new Job(), new Job()));
        List<Job> jobs = jobService.searchJobsByKeyword("java");
        assertEquals(2, jobs.size());
    }
}
