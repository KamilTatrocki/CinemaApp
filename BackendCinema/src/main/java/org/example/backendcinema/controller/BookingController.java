package org.example.backendcinema.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.request.BookingRequest;
import org.example.backendcinema.dto.response.ReservationResponse;
import org.example.backendcinema.dto.response.TicketResponse;
import org.example.backendcinema.entity.User;
import org.example.backendcinema.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ReservationResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(request, user));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<ReservationResponse> pay(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.confirmPayment(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        bookingService.cancelBooking(id, user);
        return ResponseEntity.noContent().build();
    }
}
