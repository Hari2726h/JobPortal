package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.examly.springapp.service.CompanyService;

import org.springframework.web.bind.annotation.RequestBody;
import com.examly.springapp.model.Company;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @PostMapping("/create/{userId}")
public Company createCompany(@PathVariable Long userId,@RequestBody Company company){
        return companyService.createCompany(company, userId);
    }
    @GetMapping
    public List<Company> getAllCompanies(){
        return companyService.getAllCompanies();
    }
    @GetMapping("/{companyId}")
    public Company getCompany(@PathVariable Long companyId){
       return companyService.getCompanyById(companyId);
    }

    @DeleteMapping("/{id}")
    public void deleteCompanyById(@PathVariable Long id){
        companyService.deleteCompanyById(id);
    }

    @PutMapping("/{id}")
    public Company updateCompanyDetails(@RequestBody Company company,@PathVariable Long id){
        return companyService.updateCompany(company,id);
    }


}
