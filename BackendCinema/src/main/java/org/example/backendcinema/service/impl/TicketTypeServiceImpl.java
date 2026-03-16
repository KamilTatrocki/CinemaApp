package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.TicketTypeResponse;
import org.example.backendcinema.repository.TicketTypeRepository;
import org.example.backendcinema.service.TicketTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketTypeServiceImpl implements TicketTypeService {

    private final TicketTypeRepository ticketTypeRepository;

    @Override
    public List<TicketTypeResponse> getAll() {
        return ticketTypeRepository.findAll().stream()
                .map(t -> TicketTypeResponse.builder()
                        .id(t.getId())
                        .name(t.getName())
                        .discountPercentage(t.getDiscountPercentage())
                        .build())
                .toList();
    }
}
