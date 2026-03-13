import css from "./App.module.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(query);
        if (data.length === 0) {
          toast.error("No movies found for your request.");
          setMovies([]);
          return;
        }
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div className={css.app}>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
