import { useDispatch, useSelector } from 'react-redux';
import { setNoticeToggle } from '../__redux/slice';

import style from './Notice.module.scss';

export default function Notice({}) {
  const dispatch = useDispatch();
  const notice = useSelector((state) => state.notice);

  function handleClick() {
    dispatch(setNoticeToggle(''));
  }

  if (!notice) return;

  return (
    <div className={style.container}>
      <h1>요청 실패</h1>
      <p>{notice}</p>
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}
