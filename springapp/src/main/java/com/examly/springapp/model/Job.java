package com.examly.springapp.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String type;
    private LocalDate postedDate;
    private String description;
    // @ElementCollection
    private List<String> skills;
    private String salaryRange;
    private LocalDate applicationDeadline;

    public Job(String title,String company ,String location , String type , LocalDate postedDate, String description, List<String> skills, String salaryRange, LocalDate applicationDeadline){
        this.title= title;
        this.company=company;
        this.location= location;
        this.type= type;
        this.postedDate=postedDate;
        this.description=description;
        this.skills= skills;
        this.salaryRange= salaryRange;
        this.applicationDeadline= applicationDeadline;
    }
    public Job(Long id ,String title,String company ,String location , String type , LocalDate postedDate, String description, List<String> skills, String salaryRange, LocalDate applicationDeadline){
        this.id=id;
        this.title= title;
        this.company=company;
        this.location= location;
        this.type= type;
        this.postedDate=postedDate;
        this.description=description;
        this.skills= skills;
        this.salaryRange= salaryRange;
        this.applicationDeadline= applicationDeadline;
    }


    
@ManyToOne
@JoinColumn(name="company_id")
@JsonIgnore
private Company companyy;
@OneToMany(mappedBy="job",cascade=CascadeType.ALL)
@JsonIgnore
private List<Application> applications;
    public void setCompanyy(Company companyy){
        this.companyy=companyy;
        if(companyy!=null){
            this.company=companyy.getName();
        }
    }
}
