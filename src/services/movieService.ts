import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMovieResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number,
): Promise<FetchMovieResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  console.log(token);
  const response = await axios.get<FetchMovieResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
