package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.SeatStatusResponse;
import org.example.backendcinema.entity.Screening;
import org.example.backendcinema.exception.ResourceNotFoundException;
import org.example.backendcinema.repository.ScreeningRepository;
import org.example.backendcinema.repository.SeatRepository;
import org.example.backendcinema.repository.TicketRepository;
import org.example.backendcinema.service.SeatService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final TicketRepository ticketRepository;

    @Override
    public List<SeatStatusResponse> getSeatsByScreening(Long screeningId) {
        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new ResourceNotFoundException("Screening", screeningId));

        Long hallId = screening.getHall().getId();

        return seatRepository.findByHallId(hallId).stream()
                .map(seat -> SeatStatusResponse.builder()
                        .id(seat.getId())
                        .rowLabel(seat.getRowLabel())
                        .seatNumber(seat.getSeatNumber())
                        .type(seat.getType())
                        .occupied(ticketRepository.existsBySeatIdAndReservationScreeningId(seat.getId(), screeningId))
                        .build())
                .toList();
    }
}
