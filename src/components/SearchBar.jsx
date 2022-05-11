import { SearchIcon } from '../assets/svg';

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
    <header>
      <form onSubmit={handleSearchSubmit}>
        <button type="submit" style={{ width: '40px', height: '40px' }}>
          <SearchIcon />
        </button>

        <input type="text" onChange={onChange} value={searchField} />
      </form>
    </header>
  );
}
