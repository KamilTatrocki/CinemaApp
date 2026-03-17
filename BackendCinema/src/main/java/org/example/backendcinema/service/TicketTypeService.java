package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.TicketTypeResponse;

import java.util.List;

public interface TicketTypeService {
    List<TicketTypeResponse> getAll();
}
