import styles from './FavoritesModal.module.scss';

export default function FavoritesModal({
  handleRegister,
  handleCancel,
  handleExpel,
  selectedMovie: { Title, favorite },
}) {
  return (
    <div className={styles.modal}>
      <p className={styles.title}>{Title}</p>

      {favorite ? (
        <button type="button" onClick={handleExpel}>
          즐겨찾기 제거
        </button>
      ) : (
        <button type="button" onClick={handleRegister}>
          즐겨찾기
        </button>
      )}

      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <button type="button" className={styles.modalOut} onClick={handleCancel}>
        <div />
      </button>
    </div>
  );
}
