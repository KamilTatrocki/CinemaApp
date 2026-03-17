package org.example.backendcinema.mapper;

import org.example.backendcinema.dto.response.ScreeningResponse;
import org.example.backendcinema.entity.Screening;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ScreeningMapper {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "movie.title", target = "movieTitle")
    @Mapping(source = "hall.id", target = "hallId")
    @Mapping(source = "hall.name", target = "hallName")
    @Mapping(source = "hall.cinema.id", target = "cinemaId")
    @Mapping(source = "hall.cinema.name", target = "cinemaName")
    ScreeningResponse toResponse(Screening screening);
}
