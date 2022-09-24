export default interface AppStoreState {
  users: any;
  movies: any;
  searchTerm: string;
  user: any;
  userItem: any;
  genres: any;
  movieItem: any;
  comments: any;
  favorites: any;
  latestMovies: any;
  setComments: (array: any) => void;
  setSearchTerm: (string: string) => void;
  setMovieItem: (data: any) => void;
  setGenres: (genresFromServer: any) => void;
  setMovies: (moviesFromServer: any) => void;
  setUser: (data: any) => void;
  setUserItem: (data: any) => void;
  setFavorites: (favoritesFromServer: any) => void;
  setLatestMovies: (latestMoviesFromServer: any) => void;

  emailLogin: string;
  passwordLogin: string;
  handleEmailChangeLogin: (e: any) => void;
  handlePasswordChangeLogin: (e: any) => void;
  handleFormSubmitLogin: (e: any) => void;

  userNameRegister: string;
  emailRegister: string;
  passwordRegister: string;
  handleFormSubmitRegister: (e: any) => void;
  handleUserNameRegister: (e: any) => void;
  handleEmailRegister: (e: any) => void;
  handlePasswordChangeRegister: (e: any) => void;
}
