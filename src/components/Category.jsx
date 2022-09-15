import { useSelector } from 'react-redux';
import styles from './Category.module.scss';

export default function Category() {
  const categoryCount = useSelector((state) => state.categoryCount);

  return (
    <div className={styles.category}>
      {Object.entries(categoryCount).map(([type, count]) => {
        if (!count) return null;

        return (
          <div key={`category-${type}`}>
            {type} : {count}개
          </div>
        );
      })}
    </div>
  );
}
