package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.request.UpdateUserRequest;
import org.example.backendcinema.dto.response.UserResponse;
import org.example.backendcinema.entity.User;
import org.example.backendcinema.mapper.UserMapper;
import org.example.backendcinema.repository.UserRepository;
import org.example.backendcinema.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserResponse getMe(User user) {
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse updateMe(UpdateUserRequest request, User user) {
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(user);
        return userMapper.toResponse(user);
    }
}
