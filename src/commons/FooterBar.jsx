import styles from './FooterBar.module.scss';

export default function FooterBar() {
  return (
    <ul className={styles.button}>
      <li>
        <button>앞으로</button>
      </li>

      <li>
        <button>뒤로</button>
      </li>
    </ul>
  );
}
