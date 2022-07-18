import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { loadFavoriteMovies } from './slice';

import styles from './App.module.scss';

import Notice from './components/Notice';
import Layout from './commons/Layout';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const isNotice = useSelector((state) => state.notice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoriteMovies());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Notice />
      <div className={cx(styles.container, { [styles.blocked]: isNotice })}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SearchPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
