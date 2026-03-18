package com.rbac.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse { //This is response sent after login"
    private String token; //JWT token for authentication
    private String role;
    private String name;
    private String email;
}
