package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @OneToMany(mappedBy="user",cascade=CascadeType.ALL)
    private List<Application> applications;

    @OneToMany(mappedBy="employer", cascade=CascadeType.ALL)
    private List<Company> companies;

}
