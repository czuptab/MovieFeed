import { useEffect, useState } from 'react';
import { tmdbAPI } from '../services/tmdbAPI';
import styles from './MovieDetailModal.module.css';

const MovieDetailModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbAPI.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className={styles.modal} onClick={handleBackdropClick}>
        <div className={styles.modal__content}>
          <div className={styles.modal__loading}>Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={styles.modal} onClick={handleBackdropClick}>
        <div className={styles.modal__content}>
          <button className={styles.modal__close} onClick={onClose}>
            ×
          </button>
          <div className={styles.modal__error}>{error || 'Movie not found'}</div>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdbAPI.getImageUrl(movie.backdrop_path, 'w1280');
  const posterUrl = tmdbAPI.getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.modal__content}>
        <button className={styles.modal__close} onClick={onClose}>
          ×
        </button>
        
        {backdropUrl && (
          <div className={styles.modal__backdrop}>
            <img
              src={backdropUrl}
              alt={movie.title}
              className={styles['modal__backdrop-img']}
            />
          </div>
        )}

        <div className={styles.modal__body}>
          <div className={styles.modal__header}>
            {posterUrl && (
              <div className={styles.modal__poster}>
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className={styles['modal__poster-img']}
                />
              </div>
            )}
            
            <div className={styles.modal__info}>
              <h2 className={styles.modal__title}>{movie.title}</h2>
              
              {movie.tagline && (
                <p className={styles.modal__tagline}>"{movie.tagline}"</p>
              )}

              <div className={styles.modal__meta}>
                <div className={styles['modal__meta-item']}>
                  <span>⭐</span>
                  <span className={styles.modal__rating}>
                    {movie.vote_average?.toFixed(1)} / 10
                  </span>
                </div>
                <div className={styles['modal__meta-item']}>
                  <span>📅</span>
                  <span>{releaseYear}</span>
                </div>
                <div className={styles['modal__meta-item']}>
                  <span>⏱️</span>
                  <span>{runtime}</span>
                </div>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className={styles.modal__genres}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={styles.modal__genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {movie.overview && (
            <div>
              <h3 className={styles['modal__section-title']}>Overview</h3>
              <p className={styles.modal__overview}>{movie.overview}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
