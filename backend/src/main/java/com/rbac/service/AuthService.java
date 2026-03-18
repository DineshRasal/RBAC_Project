package com.rbac.service;

import com.rbac.dto.AuthResponse;
import com.rbac.dto.LoginRequest;
import com.rbac.dto.RegisterRequest;
import com.rbac.entity.User;
import com.rbac.repository.UserRepository;
import com.rbac.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service  //Marking  this class as service layer (business logic layer)
@RequiredArgsConstructor
public class AuthService { //Main class handling authentication logic

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;    //Used to generate and validate JWT token
    private final AuthenticationManager authenticationManager;//Used for  Spring Security to authenticate user credentials

    //Register Flow 
    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder() //Creating new User object using builder pattern
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))//Encrypting password before saving
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return "registered successfully";
    }

    //Login Flow
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate( //Security verifies email + password
            //Creates authentication object using email & password
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail()) //If not found → throw error
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(user); //Generate JWT token using user details
        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getEmail());
       //Token is genrated using email + time + expiry
    }
}
