package org.example.backendcinema.service;

import org.example.backendcinema.dto.request.BookingRequest;
import org.example.backendcinema.dto.response.ReservationResponse;
import org.example.backendcinema.dto.response.TicketResponse;
import org.example.backendcinema.entity.User;

import java.util.List;

public interface BookingService {
    ReservationResponse createBooking(BookingRequest request, User user);
    ReservationResponse confirmPayment(Long reservationId, User user);
    void cancelBooking(Long reservationId, User user);
    List<TicketResponse> getUserTickets(User user);
}
