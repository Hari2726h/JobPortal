
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

package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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

    public List<User> searchUsers(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return userRepository.findAll();
        }
        return userRepository.findByNameOrEmailContainingIgnoreCase(keyword);
    }

    public Page<User> getUsers(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findAll(pageable);
    }

    public Page<User> searchUsers(String keyword, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword, pageable);
    }
}