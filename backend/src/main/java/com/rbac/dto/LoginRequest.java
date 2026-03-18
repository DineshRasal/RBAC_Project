package com.rbac.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank; //These are validation rules to check user input before processing
import lombok.Data;

@Data
public class LoginRequest {

    @Email    // Email must not be empty and must be in valid format
    @NotBlank(message = "Email is required") //If invalid → error handled by GlobalExceptionHandler
    private String email;

    @NotBlank(message = "Password is required")
    private String password;  //Cannot Be empty
}
