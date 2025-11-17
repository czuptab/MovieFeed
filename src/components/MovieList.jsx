import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import MovieDetailModal from './MovieDetailModal';
import styles from './MovieList.module.css';
import { tmdbAPI } from '../services/tmdbAPI';

const TABS = [
  { id: 'popular', label: 'Popular' },
  { id: 'trending', label: 'Trending' },
  { id: 'top_rated', label: 'Top Rated' }
];

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (searchQuery) {
          data = await tmdbAPI.searchMovies(searchQuery);
        } else {
          switch (activeTab) {
            case 'trending':
              data = await tmdbAPI.getTrendingMovies('week');
              break;
            case 'top_rated':
              data = await tmdbAPI.getTopRatedMovies(1);
              break;
            case 'popular':
            default:
              data = await tmdbAPI.getPopularMovies(1);
              break;
          }
        }
        
        setMovies(data.results || []);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeTab, searchQuery]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery(''); // Clear search when changing tabs
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const getTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    return TABS.find(tab => tab.id === activeTab)?.label + ' Movies';
  };

  const getSubtitle = () => {
    if (searchQuery) return `Found ${movies.length} movie(s)`;
    switch (activeTab) {
      case 'trending':
        return 'Trending movies this week';
      case 'top_rated':
        return 'Highest rated movies of all time';
      case 'popular':
      default:
        return 'Most popular movies right now';
    }
  };

  if (loading) {
    return <div className={styles['movie-list__loading']}>Loading movies...</div>;
  }

  if (error) {
    return <div className={styles['movie-list__error']}>{error}</div>;
  }

  return (
    <div className={styles['movie-list']}>
      <div className={styles['movie-list__header']}>
        <h1 className={styles['movie-list__title']}>🎬 MovieFeed</h1>
        <SearchBar onSearch={handleSearch} />
        {!searchQuery && <Tabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />}
      </div>

      <div className={styles['movie-list__section']}>
        <h2 className={styles['movie-list__section-title']}>{getTitle()}</h2>
        <p className={styles['movie-list__subtitle']}>{getSubtitle()}</p>
      </div>

      {movies.length === 0 ? (
        <div className={styles['movie-list__empty']}>No movies found.</div>
      ) : (
        <div className={styles['movie-list__grid']}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      )}

      {selectedMovieId && (
        <MovieDetailModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MovieList;
