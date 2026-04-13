package org.example.backendcinema.service.impl;

import org.example.backendcinema.dto.request.BookingRequest;
import org.example.backendcinema.dto.response.ReservationResponse;
import org.example.backendcinema.dto.response.TicketResponse;
import org.example.backendcinema.entity.*;
import org.example.backendcinema.exception.BadRequestException;
import org.example.backendcinema.exception.ResourceNotFoundException;
import org.example.backendcinema.exception.UnauthorizedException;
import org.example.backendcinema.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {

    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private TicketRepository ticketRepository;
    @Mock
    private ScreeningRepository screeningRepository;
    @Mock
    private SeatRepository seatRepository;
    @Mock
    private TicketTypeRepository ticketTypeRepository;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private User user;
    private Cinema cinema;
    private Hall hall;
    private Movie movie;
    private Screening screening;
    private Seat seat;
    private TicketType adultType;
    private TicketType studentType;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .email("john@example.com")
                .passwordHash("hashed")
                .fullName("John Doe")
                .role("ROLE_USER")
                .build();

        cinema = Cinema.builder()
                .id(1L)
                .name("CinemaCity")
                .city("Warsaw")
                .address("ul. Main 1")
                .build();

        hall = Hall.builder()
                .id(1L)
                .cinema(cinema)
                .name("Hall 1")
                .build();

        movie = Movie.builder()
                .id(1L)
                .title("Inception")
                .durationMinutes(148)
                .build();

        screening = Screening.builder()
                .id(1L)
                .movie(movie)
                .hall(hall)
                .startTime(LocalDateTime.of(2026, 5, 1, 20, 0))
                .basePrice(new BigDecimal("30.00"))
                .build();

        seat = Seat.builder()
                .id(1L)
                .hall(hall)
                .rowLabel("A")
                .seatNumber(1)
                .type("Normal")
                .build();

        adultType = TicketType.builder()
                .id(1L)
                .name("Adult")
                .discountPercentage(0)
                .build();

        studentType = TicketType.builder()
                .id(2L)
                .name("Student")
                .discountPercentage(50)
                .build();
    }



    @Test
    @DisplayName("createBooking – successful booking returns PENDING reservation with correct total price")
    void createBooking_success() {
        // Arrange
        BookingRequest request = buildBookingRequest(screening.getId(),
                List.of(ticketItem(seat.getId(), adultType.getId())));

        when(screeningRepository.findById(screening.getId())).thenReturn(Optional.of(screening));
        when(ticketRepository.existsBySeatIdAndReservationScreeningId(seat.getId(), screening.getId()))
                .thenReturn(false);
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(inv -> {
                    Reservation r = inv.getArgument(0);
                    r.setId(100L);
                    r.setCreatedAt(LocalDateTime.now());
                    return r;
                });
        when(seatRepository.findById(seat.getId())).thenReturn(Optional.of(seat));
        when(ticketTypeRepository.findById(adultType.getId())).thenReturn(Optional.of(adultType));
        when(ticketRepository.saveAll(anyList())).thenAnswer(inv -> inv.getArgument(0));

        // Act
        ReservationResponse response = bookingService.createBooking(request, user);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(100L);
        assertThat(response.getStatus()).isEqualTo("PENDING");
        assertThat(response.getMovieTitle()).isEqualTo("Inception");
        assertThat(response.getTotalPrice()).isEqualByComparingTo(new BigDecimal("30.00"));

        verify(ticketRepository).saveAll(anyList());
    }

    @Test
    @DisplayName("createBooking – seat already taken throws BadRequestException")
    void createBooking_seatAlreadyTaken() {
        BookingRequest request = buildBookingRequest(screening.getId(),
                List.of(ticketItem(seat.getId(), adultType.getId())));

        when(screeningRepository.findById(screening.getId())).thenReturn(Optional.of(screening));
        when(ticketRepository.existsBySeatIdAndReservationScreeningId(seat.getId(), screening.getId()))
                .thenReturn(true);

        assertThatThrownBy(() -> bookingService.createBooking(request, user))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("already taken");
    }

    @Test
    @DisplayName("createBooking – screening not found throws ResourceNotFoundException")
    void createBooking_screeningNotFound() {
        BookingRequest request = buildBookingRequest(999L,
                List.of(ticketItem(seat.getId(), adultType.getId())));

        when(screeningRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.createBooking(request, user))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Screening");
    }

    @Test
    @DisplayName("createBooking – student discount (50%) is applied correctly to total price")
    void createBooking_studentDiscountApplied() {
        Seat seat2 = Seat.builder().id(2L).hall(hall).rowLabel("A").seatNumber(2).type("Normal").build();

        BookingRequest request = buildBookingRequest(screening.getId(), List.of(
                ticketItem(seat.getId(), adultType.getId()),     // full price: 30.00
                ticketItem(seat2.getId(), studentType.getId())   // 50% off:   15.00
        ));

        when(screeningRepository.findById(screening.getId())).thenReturn(Optional.of(screening));
        when(ticketRepository.existsBySeatIdAndReservationScreeningId(anyLong(), eq(screening.getId())))
                .thenReturn(false);
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(inv -> {
                    Reservation r = inv.getArgument(0);
                    r.setId(101L);
                    r.setCreatedAt(LocalDateTime.now());
                    return r;
                });
        when(seatRepository.findById(seat.getId())).thenReturn(Optional.of(seat));
        when(seatRepository.findById(seat2.getId())).thenReturn(Optional.of(seat2));
        when(ticketTypeRepository.findById(adultType.getId())).thenReturn(Optional.of(adultType));
        when(ticketTypeRepository.findById(studentType.getId())).thenReturn(Optional.of(studentType));
        when(ticketRepository.saveAll(anyList())).thenAnswer(inv -> inv.getArgument(0));

        ReservationResponse response = bookingService.createBooking(request, user);

        BigDecimal expected = new BigDecimal("30.00").add(
                new BigDecimal("30.00").multiply(BigDecimal.valueOf(0.50))
                        .setScale(2, RoundingMode.HALF_UP));    // 30 + 15 = 45
        assertThat(response.getTotalPrice()).isEqualByComparingTo(expected);
    }

    @Test
    @DisplayName("createBooking – seat not found throws ResourceNotFoundException")
    void createBooking_seatNotFound() {
        BookingRequest request = buildBookingRequest(screening.getId(),
                List.of(ticketItem(999L, adultType.getId())));

        when(screeningRepository.findById(screening.getId())).thenReturn(Optional.of(screening));
        when(ticketRepository.existsBySeatIdAndReservationScreeningId(999L, screening.getId()))
                .thenReturn(false);
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(inv -> {
                    Reservation r = inv.getArgument(0);
                    r.setId(102L);
                    return r;
                });
        when(seatRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.createBooking(request, user))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Seat");
    }



    @Test
    @DisplayName("confirmPayment – sets status to PAID for a PENDING reservation")
    void confirmPayment_success() {
        Reservation reservation = Reservation.builder()
                .id(1L).user(user).screening(screening)
                .totalPrice(new BigDecimal("30.00")).status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        ReservationResponse response = bookingService.confirmPayment(1L, user);

        assertThat(response.getStatus()).isEqualTo("PAID");
    }

    @Test
    @DisplayName("confirmPayment – paying for CANCELLED reservation throws BadRequestException")
    void confirmPayment_cancelledReservation() {
        Reservation reservation = Reservation.builder()
                .id(1L).user(user).screening(screening)
                .totalPrice(new BigDecimal("30.00")).status("CANCELLED")
                .createdAt(LocalDateTime.now())
                .build();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThatThrownBy(() -> bookingService.confirmPayment(1L, user))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("cancelled");
    }



    @Test
    @DisplayName("cancelBooking – cancels a PENDING reservation successfully")
    void cancelBooking_success() {
        Reservation reservation = Reservation.builder()
                .id(1L).user(user).screening(screening)
                .totalPrice(new BigDecimal("30.00")).status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        bookingService.cancelBooking(1L, user);

        ArgumentCaptor<Reservation> captor = ArgumentCaptor.forClass(Reservation.class);
        verify(reservationRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo("CANCELLED");
    }

    @Test
    @DisplayName("cancelBooking – cancelling a PAID reservation throws BadRequestException")
    void cancelBooking_paidReservation() {
        Reservation reservation = Reservation.builder()
                .id(1L).user(user).screening(screening)
                .totalPrice(new BigDecimal("30.00")).status("PAID")
                .createdAt(LocalDateTime.now())
                .build();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThatThrownBy(() -> bookingService.cancelBooking(1L, user))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("paid");
    }



    @Test
    @DisplayName("confirmPayment – another user's reservation throws UnauthorizedException")
    void confirmPayment_unauthorizedUser() {
        User otherUser = User.builder().id(2L).email("other@example.com")
                .passwordHash("x").fullName("Other").role("ROLE_USER").build();

        Reservation reservation = Reservation.builder()
                .id(1L).user(otherUser).screening(screening)
                .totalPrice(new BigDecimal("30.00")).status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThatThrownBy(() -> bookingService.confirmPayment(1L, user))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessageContaining("not authorized");
    }



    private BookingRequest buildBookingRequest(Long screeningId, List<BookingRequest.TicketItem> items) {
        BookingRequest request = new BookingRequest();
        request.setScreeningId(screeningId);
        request.setTickets(items);
        return request;
    }

    private BookingRequest.TicketItem ticketItem(Long seatId, Long ticketTypeId) {
        BookingRequest.TicketItem item = new BookingRequest.TicketItem();
        item.setSeatId(seatId);
        item.setTicketTypeId(ticketTypeId);
        return item;
    }
}
