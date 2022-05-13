import styles from './Category.module.scss';

export default function Category({ categoryCount }) {
  return (
    <div className={styles.category}>
      {Object.entries(categoryCount).map(([type, count]) => {
        if (!count) return;

        return (
          <div key={`category-${type}`}>
            {type} : {count}개
          </div>
        );
      })}
    </div>
  );
}
