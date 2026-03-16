package org.example.backendcinema.mapper;

import org.example.backendcinema.dto.response.UserResponse;
import org.example.backendcinema.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    UserResponse toResponse(User user);
}
