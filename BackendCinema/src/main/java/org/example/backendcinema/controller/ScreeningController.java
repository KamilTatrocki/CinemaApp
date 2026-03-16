package org.example.backendcinema.controller;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.ScreeningResponse;
import org.example.backendcinema.dto.response.SeatStatusResponse;
import org.example.backendcinema.service.ScreeningService;
import org.example.backendcinema.service.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScreeningController {

    private final ScreeningService screeningService;
    private final SeatService seatService;

    @GetMapping("/movies/{movieId}/screenings")
    public ResponseEntity<List<ScreeningResponse>> getScreeningsByMovie(
            @PathVariable Long movieId,
            @RequestParam(required = false) Long cinemaId) {
        return ResponseEntity.ok(screeningService.getByMovieId(movieId, cinemaId));
    }

    @GetMapping("/screenings/{id}/seats")
    public ResponseEntity<List<SeatStatusResponse>> getSeatsByScreening(@PathVariable Long id) {
        return ResponseEntity.ok(seatService.getSeatsByScreening(id));
    }
}
