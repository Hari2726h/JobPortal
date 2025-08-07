package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
            return ResponseEntity.ok(applicationService.createApplication(application));
        } else {
            return ResponseEntity.status(403).body("Only users can create applications");
        }
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<?> deleteApplicationById(@PathVariable Long id, @PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.USER) {
            applicationService.deleteApplicationById(id);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Only USER or ADMIN can delete applications.");
    }

    @PutMapping("/{id}/{userId}")
    public ResponseEntity<?> updateApplication(@PathVariable Long id, @PathVariable Long userId,
            @RequestBody Application application) {
        User user = userService.getUserById(userId);
        if (user.getRole() == Role.USER) {
            return ResponseEntity.ok(applicationService.updateApplication(application, id));
        }
        return ResponseEntity.status(403).body("Only USERs can update applications.");
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }
}
