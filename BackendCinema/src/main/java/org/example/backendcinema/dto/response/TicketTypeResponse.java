package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketTypeResponse {
    private Long id;
    private String name;
    private Integer discountPercentage;
}
