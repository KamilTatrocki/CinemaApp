package org.example.backendcinema.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {

    @NotNull(message = "Screening ID is required")
    private Long screeningId;

    @NotEmpty(message = "At least one seat must be selected")
    private List<TicketItem> tickets;

    @Data
    public static class TicketItem {
        @NotNull
        private Long seatId;

        @NotNull
        private Long ticketTypeId;
    }
}
