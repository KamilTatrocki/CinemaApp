package org.example.backendcinema.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(precision = 3, scale = 1)
    private BigDecimal rating;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "media_url")
    private String mediaUrl;

    @Column(length = 50)
    private String status; // e.g. "now-playing", "upcoming"
}
