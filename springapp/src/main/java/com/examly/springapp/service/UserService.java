
package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import com.examly.springapp.config.JWTUtil;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
// import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    // public void createUser(User user){
    // . user.setPassword(passwordEncoder.encode(user.getPassword()));
    // . userRepository.save(user);
    // }

    // public String loginUser(User loginRequest){
    // . Optional<User>
    // optionalUser=userRepository.findByEmail(loginRequest.getEmail());
    // . if(optionalUser.isEmpty()){
    // . throw new UserNotFoundException("Invalid email");
    // . }
    // . User user=optionalUser.get();
    // .
    // if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
    // . throw new UserNotFoundException("Invalid password");
    // . }
    // . return JWTUtil.generateToken(user.getEmail());

    // }
    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        return userRepository.save(user);
    }

    public User loginUser(User loginRequest) {
        User oldUser = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Invalid email"));
        if (!oldUser.getPassword().equals(loginRequest.getPassword())) {
            throw new UserNotFoundException("Invalid password");
        }
        return oldUser;

    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User updateUser(Long userId, User user) {
        User oldUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        oldUser.setEmail(user.getEmail());
        oldUser.setName(user.getName());
        return userRepository.save(oldUser);

    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

}