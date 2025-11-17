import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      onSearch(''); // Clear search
    }
  };

  return (
    <form className={styles['search-bar']} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles['search-bar__input']}
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
