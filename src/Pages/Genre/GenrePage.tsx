// #region "Importing"
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import { useStore } from "../../Zustand/store";
import "./GenrePage.css";
// #endregion

export default function GenrePage({ validateUser }: any) {
  // #region "State and react hooks"
  const params = useParams();
  const navigate = useNavigate();

  const { movies, setMovies } = useStore();
  // #endregion

  // #region "Validating user if its logged in in each page, localstorage way"
  useEffect(() => {
    validateUser();
  }, []);
  // #endregion

  // #region "Pagination Feature"
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [moviesCountGenre, setMoviesCountGenres] = useState<any>(0);

  let pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(moviesCountGenre / itemsPerPage);

  function handleChangingPageNumber(selected: any) {
    setPageNumber(selected);
  }

  const changePage = ({ selected }: any) => {
    handleChangingPageNumber(selected);
    navigate(`../genres/${params.name}/page/${selected + 1}`);
    // getMoviesFromServerOnGenre(selected)
  };
  // #endregion

  // #region "Getting and movies stuff"
  function getMoviesFromServerOnGenre(pageNr = 0): void {
    if (params.page === undefined || params.page === null) {
      fetch(`http://localhost:4000/genres/${params.name}?page=1`)
        .then((resp) => resp.json())
        .then((moviesFromServer) => {
          setMovies(moviesFromServer.movies);
          setMoviesCountGenres(moviesFromServer.count);
        });
    } else {
      fetch(`http://localhost:4000/genres/${params.name}?page=${params.page}`)
        .then((resp) => resp.json())
        .then((moviesFromServer) => {
          setMovies(moviesFromServer.movies);
          setMoviesCountGenres(moviesFromServer.count);
        });
    }
  }

  if (params.page === undefined || params.page === null) {
    useEffect(getMoviesFromServerOnGenre, [params.name, params.page]);
  } else {
    useEffect(getMoviesFromServerOnGenre, [params.name, params.page]);
  }
  // #endregion

  // #region "Checking stuff wich came from server"
  if (movies[0]?.title === undefined) {
    return (
      <div className="loading-wrapper">
        <ReactLoading
          type={"spin"}
          color={"#000"}
          height={200}
          width={100}
          className="loading"
        />
      </div>
    );
  }
  // #endregion

  return (
    <>
      <div className="genre-wrapper-menus">
        <HeaderCommon />

        <div className="genre-ribbon-1">
          <span className="movie-count-span">
            Total movies in this genre: {moviesCountGenre}{" "}
          </span>

          <div className="image-ribbon-1-genre-wrapper">
            {movies?.map((movie: any) => (
              <div
                className="movie-item-genre"
                key={movie.id}
                onClick={function (e) {
                  e.stopPropagation();
                  navigate(
                    `../movies/${movie.title
                      .split("")
                      .map((char: any) => (char === " " ? "-" : char))
                      .join("")}`
                  );
                  window.scrollTo(0, 0);
                }}
              >
                <img src={movie?.photoSrc} />
                <span className="movie-title">{movie?.title}</span>

                <div className="genres-holder-span">
                  {movie?.genres.map((genre: any) => (
                    <span
                      key={genre.genre.name}
                      onClick={function (e) {
                        e.stopPropagation();
                        navigate(`/genres/${genre.genre.name}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {genre.genre.name}
                    </span>
                  ))}
                </div>

                <span className="imdb-span">
                  {movie?.ratingImdb !== 0
                    ? "Imdb: " + movie?.ratingImdb
                    : "Imdb: " + "N/A"}
                </span>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>

        <FooterCommon />
      </div>
    </>
  );
}
