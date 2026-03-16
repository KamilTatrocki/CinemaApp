package org.example.backendcinema.service;

import org.example.backendcinema.dto.request.UpdateUserRequest;
import org.example.backendcinema.dto.response.UserResponse;
import org.example.backendcinema.entity.User;

public interface UserService {
    UserResponse getMe(User user);
    UserResponse updateMe(UpdateUserRequest request, User user);
}
