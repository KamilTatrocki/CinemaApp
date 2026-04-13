import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
import { API_URL } from './config';

export const fetchUserProfile = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const fetchUserTickets = async (token: string): Promise<Ticket[]> => {
  const response = await fetch(`${API_URL}/users/me/tickets`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user tickets');
  }

  return response.json();
};
