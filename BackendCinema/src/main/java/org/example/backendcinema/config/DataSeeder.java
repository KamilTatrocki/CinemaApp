package org.example.backendcinema.config;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.entity.*;
import org.example.backendcinema.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final HallRepository hallRepository;
    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final PromotionRepository promotionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedMovies();
        seedCinemasAndHalls();
        seedTicketTypes();
        seedScreenings();
        seedPromotions();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("a@op.pl")
                    .fullName("Admin User")
                    .passwordHash(passwordEncoder.encode("a"))
                    .role("ROLE_ADMIN")
                    .build();

            User user = User.builder()
                    .email("user@example.com")
                    .fullName("John Doe")
                    .passwordHash(passwordEncoder.encode("user123"))
                    .role("ROLE_USER")
                    .build();

            userRepository.saveAll(List.of(admin, user));
        }
    }

    private void seedMovies() {
        if (movieRepository.count() == 0) {
            Movie movie1 = Movie.builder()
                    .title("Inception")
                    .description("A thief who steals corporate secrets through the use of dream-sharing technology.")
                    .durationMinutes(148)
                    .releaseYear(2010)
                    .rating(new BigDecimal("8.8"))
                    .status("now-playing")
                    .build();

            Movie movie2 = Movie.builder()
                    .title("Interstellar")
                    .description("A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.")
                    .durationMinutes(169)
                    .releaseYear(2014)
                    .rating(new BigDecimal("8.7"))
                    .status("now-playing")
                    .build();

            Movie movie3 = Movie.builder()
                    .title("Dune: Part Two")
                    .description("Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.")
                    .durationMinutes(166)
                    .releaseYear(2024)
                    .rating(new BigDecimal("9.0"))
                    .status("upcoming")
                    .build();

            movieRepository.saveAll(List.of(movie1, movie2, movie3));
        }
    }

    private void seedCinemasAndHalls() {
        if (cinemaRepository.count() == 0) {
            Cinema cinema1 = Cinema.builder()
                    .name("Grand Cinema")
                    .city("Warsaw")
                    .address("Marszałkowska 1")
                    .build();

            Cinema cinema2 = Cinema.builder()
                    .name("City Center Cinema")
                    .city("Krakow")
                    .address("Rynek Główny 5")
                    .build();

            cinemaRepository.saveAll(List.of(cinema1, cinema2));

            seedHalls(cinema1, 3);
            seedHalls(cinema2, 2);
        }
    }

    private void seedHalls(Cinema cinema, int hallCount) {
        for (int i = 1; i <= hallCount; i++) {
            Hall hall = Hall.builder()
                    .cinema(cinema)
                    .name("Hall " + i)
                    .build();
            hallRepository.save(hall);
            seedSeats(hall);
        }
    }

    private void seedSeats(Hall hall) {
        List<Seat> seats = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E"};
        for (String row : rows) {
            for (int number = 1; number <= 10; number++) {
                seats.add(Seat.builder()
                        .hall(hall)
                        .rowLabel(row)
                        .seatNumber(number)
                        .type(row.equals("E") ? "VIP" : "Normal")
                        .build());
            }
        }
        seatRepository.saveAll(seats);
    }

    private void seedTicketTypes() {
        if (ticketTypeRepository.count() == 0) {
            TicketType adult = TicketType.builder().name("Adult").discountPercentage(0).build();
            TicketType student = TicketType.builder().name("Student").discountPercentage(20).build();
            TicketType senior = TicketType.builder().name("Senior").discountPercentage(30).build();
            ticketTypeRepository.saveAll(List.of(adult, student, senior));
        }
    }

    private void seedScreenings() {
        if (screeningRepository.count() == 0) {
            List<Movie> movies = movieRepository.findAll();
            List<Hall> halls = hallRepository.findAll();

            if (movies.isEmpty() || halls.isEmpty()) return;

            LocalDateTime startTime = LocalDateTime.now().plusDays(1).withHour(18).withMinute(0);
            
            List<Screening> screenings = new ArrayList<>();
            for (int i = 0; i < Math.min(movies.size(), halls.size()); i++) {
                screenings.add(Screening.builder()
                        .movie(movies.get(i))
                        .hall(halls.get(i))
                        .startTime(startTime.plusHours(i * 3))
                        .basePrice(new BigDecimal("25.00"))
                        .build());
            }
            screeningRepository.saveAll(screenings);
        }
    }

    private void seedPromotions() {
        if (promotionRepository.count() == 0) {
            Promotion p1 = Promotion.builder()
                    .title("Popcorn Tuesday")
                    .description("Get a free small popcorn with every ticket purchased on Tuesdays.")
                    .build();
            Promotion p2 = Promotion.builder()
                    .title("Student Discount")
                    .description("20% off for all students with a valid ID.")
                    .build();
            promotionRepository.saveAll(List.of(p1, p2));
        }
    }
}
