package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ScreeningResponse {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private Long hallId;
    private String hallName;
    private Long cinemaId;
    private String cinemaName;
    private LocalDateTime startTime;
    private BigDecimal basePrice;
}
