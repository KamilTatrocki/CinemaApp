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
                    .imageUrl("/uploads/inception.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie2 = Movie.builder()
                    .title("Interstellar")
                    .description("A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.")
                    .durationMinutes(169)
                    .releaseYear(2014)
                    .rating(new BigDecimal("8.7"))
                    .imageUrl("/uploads/interstellar.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .status("now-playing")
                    .build();

            Movie movie3 = Movie.builder()
                    .title("India")
                    .description("Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.")
                    .durationMinutes(166)
                    .releaseYear(2024)
                    .rating(new BigDecimal("9.0"))
                    .imageUrl("/uploads/india.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .status("upcoming")
                    .build();
            Movie movie4 = Movie.builder()
                    .title("The Dark Knight")
                    .description("When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.")
                    .durationMinutes(152)
                    .releaseYear(2008)
                    .rating(new BigDecimal("9.0"))
                    .status("now-playing")
                    .imageUrl("/uploads/01.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie5 = Movie.builder()
                    .title("Pulp Fiction")
                    .description("The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.")
                    .durationMinutes(154)
                    .releaseYear(1994)
                    .rating(new BigDecimal("8.9"))
                    .status("now-playing")
                    .imageUrl("/uploads/02.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie6 = Movie.builder()
                    .title("The Godfather")
                    .description("The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.")
                    .durationMinutes(175)
                    .releaseYear(1972)
                    .rating(new BigDecimal("9.2"))
                    .status("now-playing")
                    .imageUrl("/uploads/03.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie7 = Movie.builder()
                    .title("Forrest Gump")
                    .description("The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75.")
                    .durationMinutes(142)
                    .releaseYear(1994)
                    .rating(new BigDecimal("8.8"))
                    .status("now-playing")
                    .imageUrl("/uploads/04.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie8 = Movie.builder()
                    .title("The Matrix")
                    .description("A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.")
                    .durationMinutes(136)
                    .releaseYear(1999)
                    .rating(new BigDecimal("8.7"))
                    .status("now-playing")
                    .imageUrl("/uploads/05.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie9 = Movie.builder()
                    .title("Gladiator")
                    .description("A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.")
                    .durationMinutes(155)
                    .releaseYear(2000)
                    .rating(new BigDecimal("8.5"))
                    .status("now-playing")
                    .imageUrl("/uploads/06.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie10 = Movie.builder()
                    .title("Parasite")
                    .description("Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.")
                    .durationMinutes(132)
                    .releaseYear(2019)
                    .rating(new BigDecimal("8.5"))
                    .status("now-playing")
                    .imageUrl("/uploads/07.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie11 = Movie.builder()
                    .title("The Lion King")
                    .description("Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.")
                    .durationMinutes(88)
                    .releaseYear(1994)
                    .rating(new BigDecimal("8.5"))
                    .status("now-playing")
                    .imageUrl("/uploads/08.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie12 = Movie.builder()
                    .title("Joker")
                    .description("A mentally troubled comedian is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.")
                    .durationMinutes(122)
                    .releaseYear(2019)
                    .rating(new BigDecimal("8.4"))
                    .status("now-playing")
                    .imageUrl("/uploads/09.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie13 = Movie.builder()
                    .title("Spirited Away")
                    .description("During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.")
                    .durationMinutes(125)
                    .releaseYear(2001)
                    .rating(new BigDecimal("8.6"))
                    .status("now-playing")
                    .imageUrl("/uploads/10.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie14 = Movie.builder()
                    .title("Dune: Part Two")
                    .description("Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.")
                    .durationMinutes(166)
                    .releaseYear(2024)
                    .rating(new BigDecimal("8.8"))
                    .status("now-playing")
                    .imageUrl("/uploads/11.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie15 = Movie.builder()
                    .title("Oppenheimer")
                    .description("The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.")
                    .durationMinutes(180)
                    .releaseYear(2023)
                    .rating(new BigDecimal("8.4"))
                    .status("now-playing")
                    .imageUrl("/uploads/12.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie16 = Movie.builder()
                    .title("The Shawshank Redemption")
                    .description("Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.")
                    .durationMinutes(142)
                    .releaseYear(1994)
                    .rating(new BigDecimal("9.3"))
                    .status("now-playing")
                    .imageUrl("/uploads/13.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie17 = Movie.builder()
                    .title("Avengers: Endgame")
                    .description("After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.")
                    .durationMinutes(181)
                    .releaseYear(2019)
                    .rating(new BigDecimal("8.4"))
                    .status("now-playing")
                    .imageUrl("/uploads/14.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            Movie movie18 = Movie.builder()
                    .title("Spider-Man: Into the Spider-Verse")
                    .description("Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat.")
                    .durationMinutes(117)
                    .releaseYear(2018)
                    .rating(new BigDecimal("8.4"))
                    .status("now-playing")
                    .imageUrl("/uploads/15.jpg")
                    .mediaUrl("/uploads/avatar.mov")
                    .build();

            movieRepository.saveAll(List.of(
                    movie1, movie2, movie3, movie4, movie5, movie6,
                    movie7, movie8, movie9, movie10, movie11, movie12,
                    movie13, movie14, movie15, movie16, movie17, movie18
            ));
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
            for (int number = 1; number < 10; number++) {
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
