package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ReservationResponse {
    private Long id;
    private Long screeningId;
    private String movieTitle;
    private LocalDateTime screeningTime;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdAt;
}
