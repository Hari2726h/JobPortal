package com.examly.springapp.dto;
import java.util.*;

import com.examly.springapp.model.Role;

import lombok.*;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private List<Long> applicationIds;
    private List<Long> companyIds;
    
}
