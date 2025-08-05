package com.examly.springapp.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

class JobTest {
    @Test
    void testJobEntityFields() {
        Job job = new Job(
                1L,
                "Frontend Developer",
                "Tech Solutions Inc.",
                "New York, NY",
                "Full-time",
                LocalDate.of(2023, 10, 15),
                "We are looking for a skilled Frontend Developer to join our team...",
                Arrays.asList("React", "JavaScript", "HTML", "CSS"),
                "$80,000 - $100,000",
                LocalDate.of(2023, 11, 15)
        );
        assertEquals(1L, job.getId());
        assertEquals("Frontend Developer", job.getTitle());
        assertEquals("Tech Solutions Inc.", job.getCompany());
        assertEquals("New York, NY", job.getLocation());
        assertEquals("Full-time", job.getType());
        assertEquals(LocalDate.of(2023, 10, 15), job.getPostedDate());
        assertEquals("We are looking for a skilled Frontend Developer to join our team...", job.getDescription());
        assertEquals(4, job.getSkills().size());
        assertTrue(job.getSkills().contains("React"));
        assertEquals("$80,000 - $100,000", job.getSalaryRange());
        assertEquals(LocalDate.of(2023, 11, 15), job.getApplicationDeadline());
    }
}
