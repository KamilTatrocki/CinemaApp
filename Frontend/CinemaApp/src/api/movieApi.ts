import { Movie } from '../models/Movie';

export const fetchMovies = async (status?: string): Promise<Movie[]> => {
  try {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';
    const url = status ? `${baseUrl}/movies?status=${status}` : `${baseUrl}/movies`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
