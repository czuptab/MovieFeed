const API_BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
};

export const tmdbAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/popular?language=en-US&page=${page}`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch popular movies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'week') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/${timeWindow}?language=en-US`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch trending movies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/top_rated?language=en-US&page=${page}`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch top rated movies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
        options
      );
      if (!response.ok) throw new Error('Failed to search movies');
      return await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}?language=en-US`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch movie details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};
