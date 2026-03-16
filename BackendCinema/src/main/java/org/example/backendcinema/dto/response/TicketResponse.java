package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class TicketResponse {
    private Long id;
    private Long reservationId;
    private String movieTitle;
    private String cinemaName;
    private LocalDateTime screeningTime;
    private String rowLabel;
    private Integer seatNumber;
    private String seatType;
    private String ticketTypeName;
    private BigDecimal price;
    private String qrCodeToken;
    private String reservationStatus;
}
