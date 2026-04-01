import { HomeData } from '../models/HomeData';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

export const fetchHomeData = async (): Promise<HomeData> => {
  const response = await fetch(`${API_URL}/home`);

  if (!response.ok) {
    throw new Error('Failed to fetch home data');
  }

  return response.json();
};
