import styles from './SearchBar.module.scss';
import { SearchIcon } from '../assets/svg';

export default function SearchBar({ searchField, handleSearchChange, handleSearchSubmit }) {
  function onChange(e) {
    const {
      target: { value },
    } = e;

    handleSearchChange(value);
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
      <button type="submit" className={styles.searchButton}>
        <SearchIcon className={styles.searchIcon} />
      </button>

      <input
        type="text"
        className={styles.searchInput}
        onChange={onChange}
        value={searchField}
        placeholder="search"
      />
    </form>
  );
}
