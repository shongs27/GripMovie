import styles from './PageTitle.module.scss';

export default function PageTitle({ title }) {
  return <div className={styles.title}>{title}</div>;
}
