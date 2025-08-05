package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    
    public User createUser(User user){
        return userRepository.save(user);
    }
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    
}
