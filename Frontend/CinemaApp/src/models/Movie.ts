export interface Movie {
  id: number;
  title: string;
  durationMinutes: number;
  releaseYear: number;
  rating: number;
  status: string;
  imageUrl?: string; // Optional for future use
}
