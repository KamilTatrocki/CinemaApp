package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MovieDetailResponse {
    private Long id;
    private String title;
    private String description;
    private Integer durationMinutes;
    private Integer releaseYear;
    private BigDecimal rating;
    private String status;
}
