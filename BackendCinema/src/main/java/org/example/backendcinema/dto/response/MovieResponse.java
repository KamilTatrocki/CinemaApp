package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MovieResponse {
    private Long id;
    private String title;
    private Integer durationMinutes;
    private Integer releaseYear;
    private BigDecimal rating;
    private String imageUrl;
    private String mediaUrl;
    private String status;
}
