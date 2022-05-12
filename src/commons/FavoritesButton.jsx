import styled from '@emotion/styled';

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

export function FavoritesButton({
  handleRegister,
  handleCancel,
  handleExpel,
  favorite,
}) {
  console.log(favorite);
  return (
    <Container>
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
    </Container>
  );
}
