export interface Ticket {
  id: number;
  reservationId: number;
  movieTitle: string;
  cinemaName: string;
  screeningTime: string; // ISO 8601 string
  rowLabel: string;
  seatNumber: number;
  seatType: string;
  ticketTypeName: string;
  price: number;
  qrCodeToken: string;
  reservationStatus: string;
}
