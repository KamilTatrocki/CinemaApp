package org.example.backendcinema.controller;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.request.LoginRequest;
import org.example.backendcinema.dto.request.RegisterRequest;
import org.example.backendcinema.dto.response.AuthResponse;
import org.example.backendcinema.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
