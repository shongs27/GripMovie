// "Title": String,
// "Year": String,
// "imdbID": String,
// "Type": String,
// "Poster": String(URL)

export default function Category({ categoryCount }) {
  return (
    <div>
      {Object.entries(categoryCount).map(([type, count]) => (
        <span key={`category-${type}`}>
          {type} : {count}
        </span>
      ))}
    </div>
  );
}
