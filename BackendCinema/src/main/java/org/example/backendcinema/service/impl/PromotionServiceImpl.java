package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.PromotionResponse;
import org.example.backendcinema.mapper.PromotionMapper;
import org.example.backendcinema.repository.PromotionRepository;
import org.example.backendcinema.service.PromotionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;

    @Override
    public List<PromotionResponse> getAll() {
        return promotionRepository.findAll().stream()
                .map(promotionMapper::toResponse)
                .toList();
    }
}
