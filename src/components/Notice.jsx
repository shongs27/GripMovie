import { useDispatch, useSelector } from 'react-redux';
import { setNoticeToggle } from '../__redux/slice';

export default function Notice({}) {
  const dispatch = useDispatch();
  const { toggle, content } = useSelector((state) => ({
    toggle: state.notice.toggle,
    content: state.notice.content,
  }));

  function handleClick() {
    dispatch(setNoticeToggle([false, '']));
  }

  if (!toggle) return;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: 99999,
        width: '300px',
        height: '50px',
        backgroundColor: 'skyblue',
      }}
    >
      <span>{content}</span>
      {/* 자동으로 삭제도 ok */}
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}
