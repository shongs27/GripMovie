import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.div(({ clientX, clientY }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',

  width: '200px',
  height: '50px',
  marginLeft: '-100px',
  marginTop: '-25px',

  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',

  '& button': {
    width: '100%',
    height: '100%',
  },
}));

export function FavoritesButton({ handleRegister, handleCancel }) {
  return (
    <Container>
      <button type="button" onClick={handleRegister}>
        즐겨찾기
      </button>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </Container>
  );
}
