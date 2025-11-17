import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';
import { tmdbAPI } from '../services/tmdbAPI';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbAPI.getPopularMovies(1);
        setMovies(data.results || []);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className={styles['movie-list__loading']}>Loading movies...</div>;
  }

  if (error) {
    return <div className={styles['movie-list__error']}>{error}</div>;
  }

  if (movies.length === 0) {
    return <div className={styles['movie-list__empty']}>No movies found.</div>;
  }

  return (
    <div className={styles['movie-list']}>
      <div className={styles['movie-list__header']}>
        <h1 className={styles['movie-list__title']}>Popular Movies</h1>
        <p className={styles['movie-list__subtitle']}>
          Discover the most popular movies right now
        </p>
      </div>
      <div className={styles['movie-list__grid']}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
