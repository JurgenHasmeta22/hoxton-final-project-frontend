import HomePage from "./Pages/Home/HomePage";
import MoviePage from "./Pages/Movie/MoviePage";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";
import GenrePage from "./Pages/Genre/GenrePage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import ErrorPage from "./Pages/Error/ErrorPage";
import GenreCategoriesPage from "./Pages/Genre/GenreCategoriesPage";
//@ts-ignore
import { addBackToTop } from "vanilla-back-to-top";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useStore } from "./Zustand/store";

function App() {
  const { setUser } = useStore();

  function validateUser() {
    if (localStorage.token) {
      fetch("http://localhost:4000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            console.log("Validation failed.");
          } else {
            setUser(data);
          }
        });
    }
  }

  return (
    <>
      {addBackToTop()}
      <Routes>
        <Route index element={<Navigate replace to="/movies" />} />
        <Route
          path="*"
          element={
            //@ts-ignore
            <ErrorPage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/page/:page"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/:title"
          element={
            //@ts-ignore
            <MoviePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/search/:query"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/search/"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/search/:query/page/:page"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/sortBy/:sort"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/movies/sortBy/:sort/page/:page"
          element={
            //@ts-ignore
            <HomePage validateUser={validateUser} />
          }
        />
        <Route
          path="/profile"
          element={
            //@ts-ignore
            <ProfilePage validateUser={validateUser} />
          }
        />
        <Route
          path="/profile/:tab"
          element={
            //@ts-ignore
            <ProfilePage validateUser={validateUser} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              //@ts-ignore
              validateUser={validateUser}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              //@ts-ignore
              validateUser={validateUser}
            />
          }
        />
        <Route
          path="/genres"
          element={
            //@ts-ignore
            <GenreCategoriesPage validateUser={validateUser} />
          }
        />
        <Route
          path="/genres/:name"
          element={
            //@ts-ignore
            <GenrePage validateUser={validateUser} />
          }
        />
        <Route
          path="/genres/:name/page/:page"
          element={
            <GenrePage
              //@ts-ignore
              validateUser={validateUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
