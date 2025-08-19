package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.service.ApplicationService;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> createApplication(@PathVariable("userId") Long id, @RequestBody Application application) {
        User user = userService.getUserById(id);
        if (user.getRole() == Role.USER) {
            application.setUser(user);
            try {
                return ResponseEntity.ok(applicationService.createApplication(application));
            } catch (RuntimeException e) {
                return ResponseEntity.status(409).body(e.getMessage());
            }
        } else {
            return ResponseEntity.status(403).body("Only users can create applications");
        }
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchApplications(
            @RequestParam(required = false) String keyword) {

        List<Application> apps;
        if (keyword == null || keyword.isBlank()) {
            apps = applicationService.getAllApplications();
        } else {
            apps = applicationService.searchApplications(keyword);
        }

        List<Map<String, Object>> results = apps.stream().map(app -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", app.getId());
            map.put("applicantName", app.getUser() != null ? app.getUser().getName() : "");
            map.put("email", app.getUser() != null ? app.getUser().getEmail() : "");
            map.put("jobTitle", app.getJob() != null ? app.getJob().getTitle() : "Job missing");
            map.put("status", app.getStatus() != null ? app.getStatus() : "Pending");
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }
@GetMapping("/user/{userId}")
public ResponseEntity<?> getApplicationsByUser(@PathVariable Long userId) {
    User user = userService.getUserById(userId);

        if (user.getRole() == Role.USER || user.getRole() == Role.ADMIN) {
                return ResponseEntity.ok(applicationService.getApplicationsByUserId(userId));
                    }
                        return ResponseEntity.status(403).body("Only USER or ADMIN can view applications.");
                        }
                        
    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getApplicationsByCompany(@PathVariable Long companyId) {
        List<Application> applications = applicationService.getApplicationsByCompanyId(companyId);
        return ResponseEntity.ok(applications);
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<?> deleteApplicationById(@PathVariable Long id, @PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.USER || user.getRole() == Role.EMPLOYER) {
            applicationService.deleteApplicationById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Only USER or ADMIN can delete applications.");
    }

    @PutMapping("/{id}/{userId}")
    public ResponseEntity<?> updateApplication(@PathVariable Long id, @PathVariable Long userId,
            @RequestBody Application application) {
        User user = userService.getUserById(userId);

        if (user.getRole() == Role.USER || user.getRole() == Role.EMPLOYER || user.getRole() == Role.ADMIN) {
            return ResponseEntity.ok(applicationService.updateApplication(application, id));
        }
        return ResponseEntity.status(403).body("Only USER, EMPLOYER, or ADMIN can update applications.");
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }
}