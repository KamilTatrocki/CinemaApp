export interface ScreeningResponse {
  id: number;
  movieId: number;
  movieTitle: string;
  hallId: number;
  hallName: string;
  cinemaId: number;
  cinemaName: string;
  startTime: string; // ISO 8601
  basePrice: number;
}

export interface SeatStatusResponse {
  id: number;
  rowLabel: string;
  seatNumber: number;
  type: string; // e.g., REGULAR, VIP
  occupied: boolean;
}

export interface TicketTypeResponse {
  id: number;
  name: string; // e.g., Normal, Student, Senior
  discountPercentage: number;
}

export interface BookingRequestItem {
  seatId: number;
  ticketTypeId: number;
}

export interface BookingRequest {
  screeningId: number;
  tickets: BookingRequestItem[];
}

export interface ReservationResponse {
  id: number;
  screeningId: number;
  movieTitle: string;
  screeningTime: string; // ISO 8601
  totalPrice: number;
  status: string; // e.g., PENDING, PAID, CANCELLED
  createdAt: string; // ISO 8601
}
