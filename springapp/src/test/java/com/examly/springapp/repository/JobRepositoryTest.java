package com.examly.springapp.repository;

import com.examly.springapp.model.Job;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;

    @BeforeEach
    void setUp() {
        jobRepository.deleteAll();
        Job job = new Job(null, "Java Engineer", "Acme Corp", "Boston", "Full-time",
                LocalDate.of(2023, 9, 1), "Java dev role", Arrays.asList("Java", "Spring"), "$70k-$90k", LocalDate.of(2023, 10, 1));
        jobRepository.save(job);
    }

    @Test
    void testFindByTitleContainingIgnoreCase_Found() {
        List<Job> jobs = jobRepository.findByTitleContainingIgnoreCase("java");
        assertEquals(1, jobs.size());
        assertEquals("Java Engineer", jobs.get(0).getTitle());
    }

    // @Test
    // void testFindByTitleContainingIgnoreCase_Found() {
    //     List<Job> jobs = jobRepository.findByTitleContainingIgnoreCase("python");
    //     assertTrue(jobs.isEmpty());
    // }

    @Test
    void testFindByTitleContainingIgnoreCase_CaseInsensitive() {
        List<Job> jobs = jobRepository.findByTitleContainingIgnoreCase("JAVA");
        assertEquals(1, jobs.size());
    }
}
