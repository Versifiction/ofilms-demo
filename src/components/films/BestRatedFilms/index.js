import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';

function BestRatedFilms() {
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1)
    const topRatedFilmsUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const allGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadTopRatedFilms();
        loadAllGenres();
    }, []);

    async function loadTopRatedFilms() {
        try {
            const dataTopRatedFilms = await axios.get(topRatedFilmsUrl);
            console.log("data ", dataTopRatedFilms);
            setTopRatedFilms(dataTopRatedFilms.data.results);
            console.log("topRatedFilms ", topRatedFilms);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadAllGenres() {
        try {
            const dataAllGenres = await axios.get(allGenresUrl);
            console.log("data ", dataAllGenres);
            setAllGenres(dataAllGenres.data.genres);
            console.log("allgenres ", allGenres);
            setPending(false);
            forceUpdate()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className="container">
                <div className="content" style={{ padding: "20px" }}>
                    <h2 style={{ textAlign: "center", color: "#343a40", marginTop: "100px", marginBottom: "40px" }}>Les films les mieux notés</h2>
                    <div className="movies" style={{ marginTop: "40px" }}>
                    {pending ? <i className="fas fa-spinner fa-spin" style={{ color: "rgb(52, 58, 64)" }}></i> : topRatedFilms && topRatedFilms.map((film, index) => (
                        <Link href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id} style={{ textDecoration: "none" }}>
                            <div className="row" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px" }}>
                                <div className="col-xs-12 col-md-3" style={{ padding: "20px" }}>
                                    <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={`Poster du film ${film.title}`} style={{ width: "100%" }} />
                                </div>
                                <div className="col-xs-12 col-md-9">
                                    <div className="card-body">
                                        <p className="card-title" style={{ fontSize: "26px", textTransform: "uppercase" }}>
                                            {film.title}
                                        </p>
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={film.vote_average}
                                        />
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "grey", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Titre original 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{film.original_title}
                                            </span>
                                        </p>
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "grey", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Date de sortie 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{moment(film.release_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "grey", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Genres 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                                &nbsp;{film.genre_ids}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            <span style={{ color: "grey", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px" }}>
                                                Synopsis
                                            </span>
                                            &nbsp;{film.overview}
                                        </p>
                                        <p><i className="fas fa-thumbs-up" style={{ color: "green" }}></i>&nbsp;{film.vote_count}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestRatedFilms;