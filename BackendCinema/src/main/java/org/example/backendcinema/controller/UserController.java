package org.example.backendcinema.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.request.UpdateUserRequest;
import org.example.backendcinema.dto.response.TicketResponse;
import org.example.backendcinema.dto.response.UserResponse;
import org.example.backendcinema.entity.User;
import org.example.backendcinema.service.BookingService;
import org.example.backendcinema.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final BookingService bookingService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getMe(user));
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateMe(
            @Valid @RequestBody UpdateUserRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.updateMe(request, user));
    }

    @GetMapping("/me/tickets")
    public ResponseEntity<List<TicketResponse>> getMyTickets(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getUserTickets(user));
    }
}
