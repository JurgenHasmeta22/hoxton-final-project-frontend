import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import { useStore } from "../../Zustand/store";
import "./ProfilePage.css";

export default function ProfilePage({ validateUser }: any) {
  // #region "state"
  const [tab, setTab] = useState<any>("home");
  const navigate = useNavigate();

  const { user, userItem, setUserItem, users } = useStore();
  // #endregion

  // #region "fetch things"
  useEffect(() => {
    validateUser();
  }, []);

  const params = useParams();

  if (user === null || user?.userName === undefined) {
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
    <main>
      <HeaderCommon />

      <section className="container-profile-menus">
        <div className="container-profile-nav">
          <div className="profile-info">
            <img src="/assets/avatars/blankavatar.jpg" />
            <span className="userName-span">{user.userName}</span>
          </div>
        </div>

        <div className="container-tabs">
          <ul className="list-tabs">
            <li
              className={
                params.tab === "favoriteMovies" ? "clicked" : "videos-tab"
              }
              onClick={() => {
                navigate("/profile/favoriteMovies");
              }}
            >
              Favorite Movies
            </li>

            <li
              className={params.tab === "aboutUs" ? "clicked" : "about-tab"}
              onClick={() => {
                navigate("/profile/aboutUs");
              }}
            >
              About Channel
            </li>
          </ul>

          {params.tab === "favoriteMovies" ? (
            <>
              <h3 className="special-video-you">Bookmarked movies</h3>

              <div className="container-videos">
                <ul className="favorite-movies">
                  {user?.favMovies.map((movie: any) => (
                    <li
                      className="movie-fav"
                      key={movie.id}
                      onClick={function () {
                        navigate(
                          `../movies/${movie.title
                            .split("")
                            .map((char: any) => (char === " " ? "-" : char))
                            .join("")}`
                        );
                        window.scroll(0, 0);
                      }}
                    >
                      <img src={movie.photoSrc} />
                      <span>Movie title: {movie.title}</span>
                      <span>Release year: {movie.releaseYear}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : params.tab === "aboutUs" ? (
            <div className="container-about">
              <span>This is my account</span>
            </div>
          ) : null}
        </div>
      </section>

      <FooterCommon />
    </main>
  );
}
