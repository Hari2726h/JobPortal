// package com.examly.springapp.config;

// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// public class SecurityConfig {
//     @Bean
//     public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception{
//         http
//         .csrf(csrf->csrf.disable())
//         .authorizeHttpRequests(auth -> auth
//         .requestMatchers("/auth/**","/api/users/**","/api/users").permitAll()
//         .anyRequest().authenticated());
//         // .formLogin(login ->  login.loginPage("/login").permitAll());
//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder(){
//         return new BCryptPasswordEncoder();
//     }

// //     // @Bean
// //     // public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception{
// //     //     return config.getAuthenticationManager();
// //     // }
// // }
// }