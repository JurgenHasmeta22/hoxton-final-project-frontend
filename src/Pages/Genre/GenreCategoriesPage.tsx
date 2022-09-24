import { useEffect } from "react";
import { useNavigate } from "react-router";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import { useStore } from "../../Zustand/store";
import "./GenreCategoriesPage.css";

export default function GenreCategoriesPage({ validateUser }: any) {
  const { genres, setGenres } = useStore();
  const navigate = useNavigate();

  function getGenresFromServer(): void {
    fetch(`http://localhost:4000/genres`)
      .then((resp) => resp.json())
      .then((genresFromServer) => setGenres(genresFromServer));
  }
  if (genres[0]?.name === undefined) {
    useEffect(getGenresFromServer, []);
  }

  return (
    <div className="genre-categories-menus">
      <HeaderCommon />
      <h2>Choose your favorite genre</h2>
      <div className="genre-categories-wrapper">
        {genres?.map((genre: any) => (
          <div
            className="genre-category"
            key={genre.id}
            onClick={function () {
              navigate(`/genres/${genre.name}`);
              window.scrollTo(0, 0);
            }}
          >
            <span>{genre.name}</span>
          </div>
        ))}
      </div>
      <FooterCommon />
    </div>
  );
}
