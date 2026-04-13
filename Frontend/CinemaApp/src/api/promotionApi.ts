import { Promotion } from '../models/Promotion';
import { API_URL } from './config';

export const fetchPromotions = async (): Promise<Promotion[]> => {
  try {
    const url = `${API_URL}/promotions`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch promotions: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    throw error;
  }
};
