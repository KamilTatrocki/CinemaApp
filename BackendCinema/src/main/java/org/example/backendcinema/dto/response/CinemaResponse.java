package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CinemaResponse {
    private Long id;
    private String name;
    private String city;
    private String address;
}
