import styles from './MovieCard.module.css';
import { tmdbAPI } from '../services/tmdbAPI';

const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, release_date, vote_average } = movie;
  const posterUrl = tmdbAPI.getImageUrl(poster_path);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className={styles['movie-card']} onClick={() => onClick(movie.id)}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          className={styles['movie-card__poster']}
          loading="lazy"
        />
      ) : (
        <div className={styles['movie-card__no-poster']}>
          🎬
        </div>
      )}
      <div className={styles['movie-card__content']}>
        <h3 className={styles['movie-card__title']}>{title}</h3>
        <div className={styles['movie-card__info']}>
          <span className={styles['movie-card__date']}>{releaseYear}</span>
          <span className={styles['movie-card__rating']}>
            <span className={styles['movie-card__rating-star']}>★</span>
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
