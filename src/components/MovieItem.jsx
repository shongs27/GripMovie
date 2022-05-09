export default function MovieItem({ movie }) {
  const { Title, Year, imdbID, Type, Poster } = movie;
  return (
    <div style={{ width: '200px', height: '400px', backgroundColor: 'blue' }}>
      {Title}
      {Year}
      {imdbID}
      {Type}

      <img src={Poster} width="200px" height="400px" />
    </div>
  );
}
