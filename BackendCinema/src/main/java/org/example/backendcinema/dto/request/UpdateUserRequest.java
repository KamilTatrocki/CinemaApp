package org.example.backendcinema.dto.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String fullName;
    private String password; // optional
}
