import { SearchIcon } from '../assets/svg';
import styles from './SearchBar.module.scss';

export default function SearchBar({
  searchField,
  handleSearchChange,
  handleSearchSubmit,
}) {
  function onChange(e) {
    const target = e.target.value;
    handleSearchChange(target);
  }

  return (
    <form onSubmit={handleSearchSubmit}>
      <button type="submit" style={{ width: '40px', height: '40px' }}>
        <SearchIcon />
      </button>

      <input type="text" onChange={onChange} value={searchField} />
    </form>
  );
}
