package org.example.backendcinema.mapper;

import org.example.backendcinema.dto.response.MovieDetailResponse;
import org.example.backendcinema.dto.response.MovieResponse;
import org.example.backendcinema.entity.Movie;
import org.mapstruct.Mapper;

@Mapper
public interface MovieMapper {
    MovieResponse toResponse(Movie movie);
    MovieDetailResponse toDetailResponse(Movie movie);
}
