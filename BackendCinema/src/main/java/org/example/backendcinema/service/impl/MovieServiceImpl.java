package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.MovieDetailResponse;
import org.example.backendcinema.dto.response.MovieResponse;
import org.example.backendcinema.exception.ResourceNotFoundException;
import org.example.backendcinema.mapper.MovieMapper;
import org.example.backendcinema.repository.MovieRepository;
import org.example.backendcinema.service.MovieService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    @Override
    public List<MovieResponse> getAll(String status) {
        if (status != null && !status.isBlank()) {
            return movieRepository.findByStatus(status).stream()
                    .map(movieMapper::toResponse)
                    .toList();
        }
        return movieRepository.findAll().stream()
                .map(movieMapper::toResponse)
                .toList();
    }

    @Override
    public MovieDetailResponse getById(Long id) {
        return movieRepository.findById(id)
                .map(movieMapper::toDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", id));
    }

    @Override
    public List<MovieResponse> search(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(movieMapper::toResponse)
                .toList();
    }
}
