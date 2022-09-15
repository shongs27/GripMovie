import { useDispatch } from 'react-redux';
import { setNoticeText } from '../slice';

import style from './Notice.module.scss';

export default function Notice({ text }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setNoticeText(''));
  }

  return (
    <div className={style.container}>
      <h1>요청 실패</h1>
      <p>{text}</p>
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}
