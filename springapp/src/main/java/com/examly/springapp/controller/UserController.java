package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController@RequestMapping("/api/users")
public class UserController {

        @Autowired
            private UserService userService;

                @GetMapping
               public List<User> getAllUsers() {
                            return userService.getAllUser();
                }
                    @PostMapping("/register")
                        public User registerUser(@RequestBody User user){
                                   return userService.createUser(user);
                        }

                            @PostMapping("/login")
                                public User loginUser(@RequestBody User user){
                                           return userService.loginUser(user);
                                }
                                    @DeleteMapping("/{id}/{adminId}")
                                        public ResponseEntity<?> deleteUserById(@PathVariable Long id, @PathVariable Long adminId) {
                                                    User admin = userService.getUserById(adminId);
                                                            if (admin.getRole() == Role.ADMIN) {
                                                                            userService.deleteUserById(id);
                                                                                        return ResponseEntity.ok("User deleted");
                                                            }
                                                                    return ResponseEntity.status(403).body("Only ADMINs can delete users.");
                                                        }

                                                            @GetMapping("/{id}")
                                                                public User getUserById(@PathVariable Long id) {
                                                                            return userService.getUserById(id);
                                                                }
                                                                    
                                                                    @PutMapping("/{id}/{adminId}")
                                                                        public ResponseEntity<?> updatedUser(@RequestBody User user, @PathVariable Long id, @PathVariable Long adminId) {
                                                                                    User admin = userService.getUserById(adminId);
                                                                                            if (admin.getRole() == Role.ADMIN) {
                                                                                                            return ResponseEntity.ok(userService.updateUser(id, user));
                                                                                            }
                                                                                                    return ResponseEntity.status(403).body("Only ADMINs can update user data.");
                                                                                        }

                                                                                            // @PostMapping
                                                                                                // public String registerUser(@RequestBody User user){
                                                                                                        //.    userService.createUser(user);
                                                                                                            //.    return "User Registered Succesfully";
                                                                                                                // }

                                                                                                                    // @PostMapping("/login")
                                                                                                                        // public ResponseEntity<?> login(@RequestBody User user){
                                                                                                                                //.    try{
                                                                                                                                        //.        String token=userService.loginUser(user);
                                                                                                                                            //.        return ResponseEntity.ok(token);
                                                                                                                                                //.    }catch(UserNotFoundException e){
                                                                                                                                                        //.        return ResponseEntity.status(401).body(e.getMessage());
                                                                                                                                                            //.    }
                                                                                                                                                                // }
                                                                                                                                                }