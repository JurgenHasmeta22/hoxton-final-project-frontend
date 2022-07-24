import "./MovieGenre.css";

export default function MovieGenre() {
  return (
    <>
      <div className="movie-item-genre">
        <img src="/assets/images/foto1.png" />

        <span className="movie-title">Moon Knight</span>

        <div className="genres-holder-span">
          <span>Action</span>
          <span>Thriller</span>
          <span>Comedy</span>
        </div>

        <span className="imdb-span">IMDB 7.5</span>
      </div>
    </>
  );
}
