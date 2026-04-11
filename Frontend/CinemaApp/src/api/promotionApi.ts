import { Promotion } from '../models/Promotion';

export const fetchPromotions = async (): Promise<Promotion[]> => {
  try {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.2:8080';
    const url = `${baseUrl}/promotions`;
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
