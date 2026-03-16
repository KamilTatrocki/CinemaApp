package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.ScreeningResponse;
import org.example.backendcinema.exception.ResourceNotFoundException;
import org.example.backendcinema.mapper.ScreeningMapper;
import org.example.backendcinema.repository.ScreeningRepository;
import org.example.backendcinema.service.ScreeningService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScreeningServiceImpl implements ScreeningService {

    private final ScreeningRepository screeningRepository;
    private final ScreeningMapper screeningMapper;

    @Override
    public List<ScreeningResponse> getByMovieId(Long movieId, Long cinemaId) {
        if (cinemaId != null) {
            return screeningRepository.findByMovieIdAndHallCinemaId(movieId, cinemaId).stream()
                    .map(screeningMapper::toResponse)
                    .toList();
        }
        return screeningRepository.findByMovieId(movieId).stream()
                .map(screeningMapper::toResponse)
                .toList();
    }

    @Override
    public ScreeningResponse getById(Long id) {
        return screeningRepository.findById(id)
                .map(screeningMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Screening", id));
    }
}
