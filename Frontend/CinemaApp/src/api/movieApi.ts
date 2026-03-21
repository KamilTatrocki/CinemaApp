import { Movie } from '../models/Movie';

const BASE_URL = 'http://localhost:8081'; // Standard Android emulator localhost; change if needed

export const fetchMovies = async (status?: string): Promise<Movie[]> => {
  try {
    const url = status ? `${BASE_URL}/movies?status=${status}` : `${BASE_URL}/movies`;
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
