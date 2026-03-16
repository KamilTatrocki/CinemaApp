package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.CinemaResponse;

import java.util.List;

public interface CinemaService {
    List<CinemaResponse> getAll();
}
