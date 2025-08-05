package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.exception.CompanyNotFoundException;
import com.examly.springapp.model.Company;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CompanyRepository;
import com.examly.springapp.repository.UserRepository;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private UserRepository userRepository;

    public Company createCompany(Company company,Long userId){
        User user=userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User (Employeer) Not Found with id: "+userId));
        company.setEmployer(user);
        return companyRepository.save(company);
    }

    public List<Company> getAllCompanies(){
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long companyId){
        return companyRepository.findById(companyId)
                                .orElseThrow(()-> new CompanyNotFoundException("Company Not found with id: "+companyId));
    }

    public void deleteCompanyById(Long id){
        companyRepository.deleteById(id);
    }
    public Company updateCompany(Company company,Long id){
        Company oldCompany=companyRepository.findById(id)
                        .orElseThrow(()-> new CompanyNotFoundException("Company not found"));
        oldCompany.setDescription(company.getDescription());
        oldCompany.setName(company.getName());
        oldCompany.setLocation(company.getLocation());
        oldCompany.setIndustry(company.getIndustry());
        oldCompany.setWebsite(company.getWebsite());
        return companyRepository.save(oldCompany);

    }
    
}
