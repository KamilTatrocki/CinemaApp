package org.example.backendcinema.repository;

import org.example.backendcinema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByStatus(String status);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
