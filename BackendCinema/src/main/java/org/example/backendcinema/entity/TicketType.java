package org.example.backendcinema.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ticket_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // "Adult", "Student", "Senior" //in future refactor to enum

    @Column(name = "discount_percentage", nullable = false)
    private Integer discountPercentage; // 0, 20, 50
}
