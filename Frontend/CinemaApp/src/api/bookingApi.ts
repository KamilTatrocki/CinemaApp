import {
  ScreeningResponse,
  SeatStatusResponse,
  TicketTypeResponse,
  BookingRequest,
  ReservationResponse,
} from '../models/BookingModels';
import { API_URL } from './config';

export const fetchScreenings = async (
  movieId: number,
  cinemaId?: number
): Promise<ScreeningResponse[]> => {
  try {
    let url = `${API_URL}/movies/${movieId}/screenings`;
    if (cinemaId) {
      url += `?cinemaId=${cinemaId}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch screenings: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching screenings:', error);
    throw error;
  }
};

export const fetchSeats = async (screeningId: number): Promise<SeatStatusResponse[]> => {
  try {
    const url = `${API_URL}/screenings/${screeningId}/seats`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch seats: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching seats:', error);
    throw error;
  }
};

export const fetchTicketTypes = async (): Promise<TicketTypeResponse[]> => {
  try {
    const url = `${API_URL}/ticket-types`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ticket types: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ticket types:', error);
    throw error;
  }
};

export const createBooking = async (
  request: BookingRequest,
  token: string
): Promise<ReservationResponse> => {
  try {
    const url = `${API_URL}/bookings`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errResponse = await response.json().catch(() => ({}));
      throw new Error(`Failed to create booking: ${errResponse.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const payBooking = async (
  reservationId: number,
  token: string
): Promise<ReservationResponse> => {
  try {
    const url = `${API_URL}/bookings/${reservationId}/pay`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errResponse = await response.json().catch(() => ({}));
      throw new Error(`Failed to pay for booking: ${errResponse.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error paying for booking:', error);
    throw error;
  }
};
