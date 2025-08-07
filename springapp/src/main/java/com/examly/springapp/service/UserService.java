package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;
    // public void createUser(User user){
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //      userRepository.save(user);
    // }
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    public User updateUser(Long userId,User user){
        User oldUser=userRepository.findById(userId)
                     .orElseThrow(()-> new UserNotFoundException("User not found"));
        
        oldUser.setEmail(user.getEmail());
        oldUser.setName(user.getName());
        return userRepository.save(oldUser);

    }
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
    }
    public void deleteUserById(Long id){
    userRepository.deleteById(id);
    }
    
     
}
