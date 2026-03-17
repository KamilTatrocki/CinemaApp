package org.example.backendcinema.service;

import org.example.backendcinema.dto.request.LoginRequest;
import org.example.backendcinema.dto.request.RegisterRequest;
import org.example.backendcinema.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
