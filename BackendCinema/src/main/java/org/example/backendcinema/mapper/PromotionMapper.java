package org.example.backendcinema.mapper;

import org.example.backendcinema.dto.response.PromotionResponse;
import org.example.backendcinema.entity.Promotion;
import org.mapstruct.Mapper;

@Mapper
public interface PromotionMapper {
    PromotionResponse toResponse(Promotion promotion);
}
