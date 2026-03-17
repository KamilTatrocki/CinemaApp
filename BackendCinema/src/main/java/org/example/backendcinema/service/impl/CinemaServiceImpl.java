package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.CinemaResponse;
import org.example.backendcinema.mapper.CinemaMapper;
import org.example.backendcinema.repository.CinemaRepository;
import org.example.backendcinema.service.CinemaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CinemaServiceImpl implements CinemaService {

    private final CinemaRepository cinemaRepository;
    private final CinemaMapper cinemaMapper;

    @Override
    public List<CinemaResponse> getAll() {
        return cinemaRepository.findAll().stream()
                .map(cinemaMapper::toResponse)
                .toList();
    }
}
