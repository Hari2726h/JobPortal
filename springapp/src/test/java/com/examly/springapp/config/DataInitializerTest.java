package com.examly.springapp.config;

import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class DataInitializerTest {
    @Autowired
    private JobRepository jobRepository;

    @Test
    void testDataPopulationAtStartup() {
        // Check repo is empty
        assertEquals(0, jobRepository.count());
        // Simulate data population
        DataInitializer di = new DataInitializer(jobRepository);
        di.init();
        assertTrue(jobRepository.count() >= 5);
        List<Job> jobs = jobRepository.findAll();
        // The first seeded job should contain known title
        assertTrue(jobs.stream().anyMatch(j -> j.getTitle().equals("Frontend Developer")));
        // Check each job has non-null skills/fields
        for (Job job : jobs) {
            assertNotNull(job.getTitle());
            assertNotNull(job.getCompany());
            assertNotNull(job.getSkills());
        }
    }
}
