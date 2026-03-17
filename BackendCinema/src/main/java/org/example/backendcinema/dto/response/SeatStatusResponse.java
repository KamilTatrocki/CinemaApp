package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatStatusResponse {
    private Long id;
    private String rowLabel;
    private Integer seatNumber;
    private String type;
    private boolean occupied;
}
