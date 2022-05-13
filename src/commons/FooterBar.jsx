import styles from './FooterBar.module.scss';
import { FullStarIcon, SearchIcon } from '../assets/svg';

import { Link } from 'react-router-dom';

export default function FooterBar() {
  return (
    <ul className={styles.footerList}>
      <li>
        <button type="button">
          <Link to="/">
            <SearchIcon className={styles.searchIcon} />
          </Link>
        </button>
      </li>

      <li>
        <button type="button">
          <Link to="/favorites">
            <FullStarIcon className={styles.fullStarIcon} />
          </Link>
        </button>
      </li>
    </ul>
  );
}
