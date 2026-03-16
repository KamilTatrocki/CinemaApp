package org.example.backendcinema.mapper;

import org.example.backendcinema.dto.response.CinemaResponse;
import org.example.backendcinema.entity.Cinema;
import org.mapstruct.Mapper;

@Mapper
public interface CinemaMapper {
    CinemaResponse toResponse(Cinema cinema);
}
