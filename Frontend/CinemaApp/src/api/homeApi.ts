import { HomeData } from '../models/HomeData';
import { API_URL } from './config';

export const fetchHomeData = async (): Promise<HomeData> => {
  const response = await fetch(`${API_URL}/home`);

  if (!response.ok) {
    throw new Error('Failed to fetch home data');
  }

  return response.json();
};
