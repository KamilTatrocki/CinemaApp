package org.example.backendcinema.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PromotionResponse {
    private Long id;
    private String title;
    private String description;
}
