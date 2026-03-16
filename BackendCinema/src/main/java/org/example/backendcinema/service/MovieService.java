package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.MovieDetailResponse;
import org.example.backendcinema.dto.response.MovieResponse;

import java.util.List;

public interface MovieService {
    List<MovieResponse> getAll(String status);
    MovieDetailResponse getById(Long id);
    List<MovieResponse> search(String title);
}
