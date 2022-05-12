import { useEffect, useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import styles from './App.module.scss';

import { FAVORITE_MOVIES, getItem } from './utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchCategory, setFavoriteMovies } from './__redux/slice';

import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import FooterBar from './commons/FooterBar';
import Notice from './components/Notice';

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.notice.toggle);

  useEffect(() => {
    const movies = getItem(FAVORITE_MOVIES);
    dispatch(setFavoriteMovies(movies));
  }, []);

  return (
    <div className={styles.app}>
      <Notice />
      <div className={toggle ? styles.container2 : styles.container}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <FooterBar />
      </div>
    </div>
  );
}

export default App;
