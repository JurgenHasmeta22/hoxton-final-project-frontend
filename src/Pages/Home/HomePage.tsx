// #region "Importing stuff"
import Carousel from "@palustris/react-images";
import { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router";
import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon";
import { useStore } from "../../Zustand/store";
import "./HomePage.css"
// #endregion

export default function HomePage({validateUser}:any) {

    const navigate = useNavigate()
    const params = useParams()

    // #region "Validating user if its logged in in each page, localstorage way"
    useEffect(() => {
        validateUser();
    }, []);
    // #endregion


    // #region "Getting movie count"
    const [moviesCount, setMoviesCount] = useState<any>()

    function getMovieCountFromServer(): void {

        fetch(`http://localhost:4000/movie-count`)
        .then(resp => resp.json())
        .then(movieCountFromServer => setMoviesCount(movieCountFromServer))

    }

    if (params.query === undefined || params.query.length === 0) {
        useEffect(getMovieCountFromServer, [])
    }

    else {
        useEffect(getMovieCountFromServer, [])
    }
    // #endregion


    // #region "Pagination in frontend"
    const [pageNumber, setPageNumber] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(20)

    let pagesVisited = pageNumber * itemsPerPage
    const pageCount = Math.ceil(moviesCount?.count / itemsPerPage)

    function handleChangingPageNumber(selected:any) {
        setPageNumber(selected)
    }
    
    const changePage = ({ selected }:any) => {
        handleChangingPageNumber(selected)
        navigate(`../movies/page/${selected + 1}`)
        // getMoviesFromServer(selected)
    }
    // #endregion


    // #region "Getting and movies stuff"
    const { movies, setMovies, latestMovies, setLatestMovies, genres, setGenres, searchTerm, setSearchTerm } = useStore()

    function getMoviesFromServer(): void {

        //@ts-ignore
        if (params.page === undefined && ( params.query === undefined || params.query.length === 0 ) ) {

            fetch(`http://localhost:4000/movies/page/1`)
            .then(resp => resp.json())
            .then(moviesFromServer => setMovies(moviesFromServer))

        }

        //@ts-ignore
        else if(params.page && ( params.query === undefined || params.query.length === 0) ) {
            
            fetch(`http://localhost:4000/movies/page/${params.page}`)
            .then(resp => resp.json())
            .then(moviesFromServer => setMovies(moviesFromServer))

        }

        else if(params.page === undefined && params.query) {
            
            fetch(`http://localhost:4000/search`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: params.query
                })
            })
            .then(resp => resp.json())
            .then(moviesFromServer => setMovies(moviesFromServer))

        }

    }

    if (params.page === undefined && ( params.query === undefined || params.query.length === 0 ) ) {
        useEffect(getMoviesFromServer, [params.page])
    }

    else if (params.page && ( params.query === undefined || params.query.length === 0 ) ) {
        useEffect(getMoviesFromServer, [params.page])
    }

    else if (params.page === undefined && params.query) {
        useEffect(getMoviesFromServer, [params.query])
    }

    function getLatestMoviesFromServer(): void {

        fetch(`http://localhost:4000/latest`)
        .then(resp => resp.json())
        .then(latestMoviesFromServer => setLatestMovies(latestMoviesFromServer))

    }

    useEffect(getLatestMoviesFromServer, [])
    // #endregion


    // #region "Checking stuff wich came from server"
    if (movies[0]?.title === undefined && !movies) {

        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )    
    
    }

    else if (movies?.length === 0) {

        return (
            
            <div className="home-wrapper-menus">

                <HeaderCommon />

                <div className="home-ribbon-2">

                    <div className="no-search">
                        <span>No Search Result, no movie found with that criteria.</span>
                    </div>

                </div>

                <FooterCommon />

            </div>

        )

    }
    // #endregion


    // #region "Carousel stuff images etc"
    function getImages() {

        let images: any = []
        // let moviesNew = [...movies]

        if ( movies.length !== 0 && movies[0]?.title !== undefined ) {
            
            console.log(movies)

            return images = [
                { source: movies[0]?.photoSrc! },
                { source: movies[1]?.photoSrc! },
                { source: movies[2]?.photoSrc! },
                { source: movies[3]?.photoSrc! },
                { source: movies[4]?.photoSrc! }
            ];

        }

    }

    const images = [
        { source: "http://localhost:4000/images/rsz_fistful_of_vengeance.png" },
        { source: "http://localhost:4000/images/rsz_texas.png" },
        { source: "http://localhost:4000/images/rsz_movieposter_en.png" },
        { source: "http://localhost:4000/images/rsz_wyihsxwyqn8ejsdut2p1p0o97n0.png" },
        { source: "http://localhost:4000/images/rsz_elevjj3yg279mmpwuygyrhbjbbq.png" }
    ];
    
    // #endregion

    return (

        <>

            <div className="home-wrapper-menus">

                <HeaderCommon />

                { ( params.query === undefined || params.query.length === 0 ) && movies[0]?.title != undefined ? (
                    
                    <div className="home-ribbon-1">
                        {/* @ts-ignore */}
                        <Carousel views={images}/>
                    </div>

                ): null }

                <div className="home-ribbon-2">

                    {/* <h3>Sort By: </h3> */}

                    { ( params.query === undefined || params.query.length === 0 ) ? (
                        <span className="movie-count-span">Total movies: {moviesCount?.count} </span>
                    ): (
                        <span className="movie-count-span">Total movies: {movies?.length} </span>
                    ) }

                    { (params.query === undefined || params.query.length === 0) ? (

                        <>

                            <h3>Sort By: </h3>

                            <ul className="list-sort">
                                <li>Most viewed</li>
                                <li>Imdb</li>
                                <li>A-Z</li>
                            </ul>

                        </>

                    ): null }
                    
                    { movies?.length !== 0 ? (

                         <div className="image-ribbon-2-wrapper">

                        {
                            
                            //@ts-ignore
                            movies?.map(movie => 
                                
                                <div className="movie-item" key={movie.id} onClick={function (e) {
                                    e.stopPropagation()
                                    //@ts-ignore
                                    navigate(`../movies/${ movie.title.split('').map((char) => (char === ' ' ? '-' : char)).join('') }`)
                                    window.scrollTo(0,0)
                                }}>

                                    <img src={movie.photoSrc} />
                                    <span className="movie-title">{movie.title}</span>

                                    <div className="genres-holder-span">

                                        {

                                            //@ts-ignore
                                            movie.genres.map(genre => 

                                                <span key={genre.genre.name} onClick={function (e) {
                                                    e.stopPropagation()
                                                    navigate(`/genres/${genre.genre.name}`)
                                                    window.scrollTo(0,0)
                                                }}>{genre.genre.name}</span>

                                            )

                                        }
                                        
                                    </div>

                                    <span className="imdb-span">{ movie.ratingImdb !== 0 ? "Imdb: " + movie.ratingImdb : "Imdb: " + "N/A" }</span>

                                </div>

                            )

                        }

                        </div>

                    ): (

                        <div className="no-search">
                            <span>No Search Result, no movie found with that criteria.</span>
                        </div>

                    ) }

                    { (params.query === undefined || params.query.length === 0) ? (

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

                    ): null }

                </div>

                { (params.query === undefined || params.query.length === 0) && movies?.length !== 0 ? (

                    <div className="home-ribbon-3">

                        <ul className="list-latest">
                            <li className="special-last">LATEST MOVIES</li>
                        </ul>
                        
                        <div className="image-ribbon-3-wrapper">

                            {

                                //@ts-ignore
                                latestMovies?.map(latestMovie =>
                                    
                                    <div className="movie-item-latest" key={latestMovie.id} onClick={function (e) {
                                        e.stopPropagation()
                                        //@ts-ignore
                                        navigate(`../movies/${ latestMovie.title.split('').map((char) => (char === ' ' ? '-' : char)).join('') }`)
                                        window.scrollTo(0,0)
                                    }}>

                                        <img src={latestMovie.photoSrc} />
                                        <span className="movie-title">{latestMovie.title}</span>
                                        
                                        <div className="genres-holder-span">

                                            {

                                                //@ts-ignore
                                                latestMovie.genres.map(genre => 

                                                    <span key={genre.genre.name} onClick={function (e) {
                                                        e.stopPropagation()
                                                        navigate(`/genres/${genre.genre.name}`)
                                                        window.scrollTo(0,0)
                                                    }}>{genre.genre.name}</span>
                                                    
                                                )

                                            }

                                        </div>

                                        <span className="imdb-span">{ latestMovie.ratingImdb !== 0 ? "Imdb: " + latestMovie.ratingImdb : null }</span>
                                        
                                    </div>

                                )

                            }

                        </div>
                    
                    </div>

                ): null }

                <FooterCommon />

            </div>
        
        </>

    )

}