package org.example.backendcinema.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.backendcinema.dto.request.BookingRequest;
import org.example.backendcinema.dto.response.ReservationResponse;
import org.example.backendcinema.dto.response.TicketResponse;
import org.example.backendcinema.entity.*;
import org.example.backendcinema.exception.BadRequestException;
import org.example.backendcinema.exception.ResourceNotFoundException;
import org.example.backendcinema.exception.UnauthorizedException;
import org.example.backendcinema.repository.*;
import org.example.backendcinema.service.BookingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final ReservationRepository reservationRepository;
    private final TicketRepository ticketRepository;
    private final ScreeningRepository screeningRepository;
    private final SeatRepository seatRepository;
    private final TicketTypeRepository ticketTypeRepository;

    @Override
    @Transactional
    public ReservationResponse createBooking(BookingRequest request, User user) {
        Screening screening = screeningRepository.findById(request.getScreeningId())
                .orElseThrow(() -> new ResourceNotFoundException("Screening", request.getScreeningId()));

        // Check for already taken seats
        for (BookingRequest.TicketItem item : request.getTickets()) {
            if (ticketRepository.existsBySeatIdAndReservationScreeningId(item.getSeatId(), screening.getId())) {
                throw new BadRequestException("Seat " + item.getSeatId() + " is already taken for this screening");
            }
        }

        // Calculate total price
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<Ticket> tickets = new ArrayList<>();

        Reservation reservation = Reservation.builder()
                .user(user)
                .screening(screening)
                .totalPrice(BigDecimal.ZERO)
                .status("PENDING")
                .build();
        reservationRepository.save(reservation);

        for (BookingRequest.TicketItem item : request.getTickets()) {
            Seat seat = seatRepository.findById(item.getSeatId())
                    .orElseThrow(() -> new ResourceNotFoundException("Seat", item.getSeatId()));
            TicketType ticketType = ticketTypeRepository.findById(item.getTicketTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("TicketType", item.getTicketTypeId()));

            BigDecimal discount = BigDecimal.valueOf(ticketType.getDiscountPercentage()).divide(BigDecimal.valueOf(100));
            BigDecimal ticketPrice = screening.getBasePrice()
                    .multiply(BigDecimal.ONE.subtract(discount))
                    .setScale(2, RoundingMode.HALF_UP);

            totalPrice = totalPrice.add(ticketPrice);

            Ticket ticket = Ticket.builder()
                    .reservation(reservation)
                    .seat(seat)
                    .ticketType(ticketType)
                    .build();
            tickets.add(ticket);
        }

        ticketRepository.saveAll(tickets);
        reservation.setTotalPrice(totalPrice);
        reservationRepository.save(reservation);

        return toReservationResponse(reservation);
    }

    @Override
    @Transactional
    public ReservationResponse confirmPayment(Long reservationId, User user) {
        Reservation reservation = getReservationForUser(reservationId, user);
        if ("CANCELLED".equals(reservation.getStatus())) {
            throw new BadRequestException("Cannot pay for a cancelled reservation");
        }
        reservation.setStatus("PAID");
        reservationRepository.save(reservation);
        return toReservationResponse(reservation);
    }

    @Override
    @Transactional
    public void cancelBooking(Long reservationId, User user) {
        Reservation reservation = getReservationForUser(reservationId, user);
        if ("PAID".equals(reservation.getStatus())) {
            throw new BadRequestException("Cannot cancel a paid reservation");
        }
        reservation.setStatus("CANCELLED");
        reservationRepository.save(reservation);
    }

    @Override
    public List<TicketResponse> getUserTickets(User user) {
        return ticketRepository.findByReservationUserId(user.getId()).stream()
                .map(ticket -> TicketResponse.builder()
                        .id(ticket.getId())
                        .reservationId(ticket.getReservation().getId())
                        .movieTitle(ticket.getReservation().getScreening().getMovie().getTitle())
                        .cinemaName(ticket.getReservation().getScreening().getHall().getCinema().getName())
                        .screeningTime(ticket.getReservation().getScreening().getStartTime())
                        .rowLabel(ticket.getSeat().getRowLabel())
                        .seatNumber(ticket.getSeat().getSeatNumber())
                        .seatType(ticket.getSeat().getType())
                        .ticketTypeName(ticket.getTicketType().getName())
                        .qrCodeToken(ticket.getQrCodeToken())
                        .reservationStatus(ticket.getReservation().getStatus())
                        .build())
                .toList();
    }

    private Reservation getReservationForUser(Long reservationId, User user) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", reservationId));
        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to modify this reservation");
        }
        return reservation;
    }

    private ReservationResponse toReservationResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .screeningId(reservation.getScreening().getId())
                .movieTitle(reservation.getScreening().getMovie().getTitle())
                .screeningTime(reservation.getScreening().getStartTime())
                .totalPrice(reservation.getTotalPrice())
                .status(reservation.getStatus())
                .createdAt(reservation.getCreatedAt())
                .build();
    }
}
