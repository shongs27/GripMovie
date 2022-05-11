import { forwardRef } from 'react';

export default forwardRef(function MovieItem({ movie }, ref) {
  const { Title, Year, imdbID, Type, Poster } = movie;
  return (
    <div
      ref={ref}
      style={{ width: '200px', height: '400px', backgroundColor: 'blue' }}
    >
      <span>{Title}</span>
      <span>{Year}</span>
      <span>{imdbID}</span>
      <span>{Type}</span>

      {Poster === 'N/A' ? (
        <div
          style={{ width: '200px', height: '300px', backgroundColor: 'red' }}
        >
          이미지가 없습니다
        </div>
      ) : (
        <img src={Poster} width="200px" height="300px" />
      )}
    </div>
  );
});
