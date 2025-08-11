package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.examly.springapp.service.CompanyService;
import com.examly.springapp.service.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import com.examly.springapp.model.Company;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private UserService userService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createCompany(@PathVariable Long userId, @RequestBody Company company) {
        User user = userService.getUserById(userId);
        if (user.getRole() == Role.EMPLOYER) {
            return ResponseEntity.ok(companyService.createCompany(company, userId));
        }
        return ResponseEntity.status(403).body("Only EMPLOYERs can create companies.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCompany(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
            String password = loginData.get("password");
                Company company = companyService.loginCompany(email, password);
                    if (company == null) {
                            return ResponseEntity.status(401).body("Invalid credentials or not an EMPLOYER");
                                }
                                    return ResponseEntity.ok(company);
                                    }
                                    
    

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{companyId}")
    public Company getCompany(@PathVariable Long companyId) {
        return companyService.getCompanyById(companyId);
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<?> deleteCompanyById(@PathVariable Long id, @PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user.getRole() == Role.EMPLOYER) {
            companyService.deleteCompanyById(id);
            return ResponseEntity.ok("Company deleted successfully.");
        }
        return ResponseEntity.status(403).body("Only EMPLOYERs can delete companies.");
    }

}
