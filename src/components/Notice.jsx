import { useDispatch, useSelector } from 'react-redux';
import { setNoticeText } from '../slice';

import style from './Notice.module.scss';

export default function Notice() {
  const dispatch = useDispatch();
  const noticeText = useSelector((state) => state.noticeText);

  function handleClick() {
    dispatch(setNoticeText(''));
  }

  return (
    <div className={style.container}>
      <h1>요청 실패</h1>
      <p>{noticeText}</p>
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}
