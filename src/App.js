import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { loadFavoriteMovies } from './slice';

import styles from './App.module.scss';

import Notice from './components/Notice';
import Layout from './commons/Layout';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  const isNotice = useSelector((state) => state.noticeText);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoriteMovies());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {isNotice && <Notice text={isNotice} />}
      <div className={cx(styles.container, { [styles.clickBlocked]: isNotice })}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SearchPage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="*" element={<SearchPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
