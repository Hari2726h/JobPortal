package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    // @PostMapping
    // public String registerUser(@RequestBody User user){
    //     System.out.print(user);
    //     userService.createUser(user);
    //     return "User Registered Succesfully";
    // }
    
    // @PostMapping("/login")
    // public String LoginUser(@RequestBody User user){
    //     return userService.loginUser(user);
    //     // return "User Login Succesfully";
    // }


    // @GetMapping
    // public List<User> getAllUsers(){
    //     return userService.getAllUser();
    // }
    
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id){
         userService.deleteUserById(id);
    }


    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }
    
    @PutMapping("/{id}")
    public User updatedUser(@RequestBody User user,@PathVariable Long id){
        return userService.updateUser(id, user);
    }
    
}
