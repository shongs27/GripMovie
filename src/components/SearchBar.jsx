import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.scss';
import { SearchIcon } from '../assets/svg';
import { changeSearchField, getSearchField, setNoticeText } from '../slice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchField = useSelector((state) => state.searchField);

  function handleChange(e) {
    const {
      target: { value },
    } = e;

    dispatch(changeSearchField(value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchField) {
      dispatch(setNoticeText('검색어를 입력하세요'));
      return;
    }

    dispatch(getSearchField(1));
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.searchButton}>
        <SearchIcon className={styles.searchIcon} />
      </button>

      <input
        type="text"
        className={styles.searchInput}
        onChange={handleChange}
        value={searchField}
        placeholder="search"
      />
    </form>
  );
}
