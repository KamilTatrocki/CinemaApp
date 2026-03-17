package org.example.backendcinema.controller;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.MovieDetailResponse;
import org.example.backendcinema.dto.response.MovieResponse;
import org.example.backendcinema.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieResponse>> getAll(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(movieService.getAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MovieResponse>> search(@RequestParam String title) {
        return ResponseEntity.ok(movieService.search(title));
    }
}
