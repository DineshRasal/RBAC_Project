package com.rbac.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Content", description = "Role-based content endpoints")
public class ContentController {

    @GetMapping("/public")
    @Operation(summary = "Public endpoint - no auth needed")
    public ResponseEntity<Map<String, String>> publicContent() {
        return ResponseEntity.ok(Map.of("message", "This is public content. Anyone can see this!"));
    }

    @GetMapping("/user")
    @Operation(summary = "User endpoint - requires USER or ADMIN role")
    public ResponseEntity<Map<String, String>> userContent() {
        return ResponseEntity.ok(Map.of("message", "Welcome! You have USER access. Here is your personal dashboard content"));
    }

    @GetMapping("/admin")
    @Operation(summary = "Admin endpoint - requires ADMIN role only")
    public ResponseEntity<Map<String, String>> adminContent() {
        return ResponseEntity.ok(Map.of("message", "Admin panel: You have full system access."));
    }
}
