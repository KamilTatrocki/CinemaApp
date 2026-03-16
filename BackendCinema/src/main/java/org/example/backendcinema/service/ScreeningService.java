package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.ScreeningResponse;

import java.util.List;

public interface ScreeningService {
    List<ScreeningResponse> getByMovieId(Long movieId, Long cinemaId);
    ScreeningResponse getById(Long id);
}
