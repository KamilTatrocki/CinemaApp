package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.config.JwtService;
import org.example.backendcinema.dto.request.LoginRequest;
import org.example.backendcinema.dto.request.RegisterRequest;
import org.example.backendcinema.dto.response.AuthResponse;
import org.example.backendcinema.dto.response.UserResponse;
import org.example.backendcinema.entity.User;
import org.example.backendcinema.exception.BadRequestException;
import org.example.backendcinema.exception.UnauthorizedException;
import org.example.backendcinema.mapper.UserMapper;
import org.example.backendcinema.repository.UserRepository;
import org.example.backendcinema.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered: " + request.getEmail());
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role("ROLE_USER")
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(userMapper.toResponse(user))
                .build();
    }
}
