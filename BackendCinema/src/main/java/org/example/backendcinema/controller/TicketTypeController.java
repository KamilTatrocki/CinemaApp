package org.example.backendcinema.controller;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.TicketTypeResponse;
import org.example.backendcinema.service.TicketTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket-types")
@RequiredArgsConstructor
public class TicketTypeController {

    private final TicketTypeService ticketTypeService;

    @GetMapping
    public ResponseEntity<List<TicketTypeResponse>> getAll() {
        return ResponseEntity.ok(ticketTypeService.getAll());
    }
}
