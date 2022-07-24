import create from "zustand";
import AppStoreState from "./types/interfaceStore";

export const useStore = create<AppStoreState>(
  (set, get): AppStoreState => ({
    // #region 'GeneralState'
    users: [],
    movies: [],
    searchTerm: "",
    user: null,
    userItem: null,
    genres: [],
    movieItem: null,
    comments: [],
    favorites: [],
    latestMovies: [],

    setComments: (array) => {
      set({ comments: array });
    },

    setSearchTerm: (string) => {
      set({ searchTerm: string });
    },

    setMovieItem: (data) => {
      set({ movieItem: data });
    },

    setGenres: (genresFromServer) => {
      set({ genres: genresFromServer });
    },

    setMovies: (moviesFromServer) => {
      set({ movies: moviesFromServer });
    },

    setUser: (data) => {
      set({ user: data });
    },

    setUserItem: (data) => {
      set({ userItem: data });
    },

    setFavorites: (favoritesFromServer) => {
      set({ favorites: favoritesFromServer });
    },

    setLatestMovies: (latestMoviesFromServer) => {
      set({ latestMovies: latestMoviesFromServer });
    },
    // #endregion

    // #region 'Login State'
    emailLogin: "",
    passwordLogin: "",

    handleEmailChangeLogin: (e) => {
      set({ emailLogin: e.target.value });
    },

    handlePasswordChangeLogin: (e) => {
      set({ passwordLogin: e.target.value });
    },

    handleFormSubmitLogin: (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      const formData = {
        email: email,
        password: password,
      };

      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            // we managed to sign in!
            localStorage.setItem("token", data.token);
            set({ user: data.user });
          }
        });
    },
    // #endregion

    // #region 'Register State'
    userNameRegister: "",
    emailRegister: "",
    passwordRegister: "",

    handleFormSubmitRegister: (e: any) => {
      e.preventDefault();

      const { users, userNameRegister, emailRegister, passwordRegister } =
        get();

      const formData = {
        userName: userNameRegister,
        email: emailRegister,
        password: passwordRegister,
      };

      fetch("http://localhost:4000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert("Oops, something went wrong.");
          } else {
            // we managed to create our user!
            localStorage.setItem("token", data.token);
            set({ user: data.user });
          }
        });
    },

    handleUserNameRegister: (e: any) => {
      set({ userNameRegister: e.target.value });
    },

    handleEmailRegister: (e: any) => {
      set({ emailRegister: e.target.value });
    },

    handlePasswordChangeRegister: (e: any) => {
      set({ passwordRegister: e.target.value });
    },
    //#endregion
  })
);
