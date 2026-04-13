import { Movie } from '../models/Movie';
import { API_URL } from './config';

export const fetchMovies = async (status?: string): Promise<Movie[]> => {
  try {
    const url = status ? `${API_URL}/movies?status=${status}` : `${API_URL}/movies`;
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

export const fetchMovieById = async (id: number): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
