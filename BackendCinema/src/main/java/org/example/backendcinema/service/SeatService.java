package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.SeatStatusResponse;

import java.util.List;

public interface SeatService {
    List<SeatStatusResponse> getSeatsByScreening(Long screeningId);
}
