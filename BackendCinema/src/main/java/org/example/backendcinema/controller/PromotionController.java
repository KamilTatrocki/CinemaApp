package org.example.backendcinema.controller;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.response.PromotionResponse;
import org.example.backendcinema.service.PromotionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping
    public ResponseEntity<List<PromotionResponse>> getAll() {
        return ResponseEntity.ok(promotionService.getAll());
    }
}
