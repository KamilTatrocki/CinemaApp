package org.example.backendcinema.service;

import org.example.backendcinema.dto.response.PromotionResponse;

import java.util.List;

public interface PromotionService {
    List<PromotionResponse> getAll();
}
