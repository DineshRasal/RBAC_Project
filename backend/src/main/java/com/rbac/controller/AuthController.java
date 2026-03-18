package com.rbac.controller;

import com.rbac.dto.AuthResponse;
import com.rbac.dto.LoginRequest;
import com.rbac.dto.RegisterRequest;
import com.rbac.service.AuthService;
import io.swagger.v3.oas.annotations.Operation; //Used to generate API documentation UI (Swagger)
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;                //email not empty
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; //Main annotations for creating APIs

@RestController
@RequestMapping("/api/auth")  //THis path for All endpoints in class will start with /api/auth
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Register and Login endpoints") //Group API for Authentication in swagger
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")  //@Valid (like not null, email format
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Login and get JWT token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
