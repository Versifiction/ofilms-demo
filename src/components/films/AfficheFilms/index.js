import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';
import Spinner from '../../Molecules/Spinner';

function AfficheFilms() {
    const [afficheFilms, setAfficheFilms] = useState([]);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const afficheFilmsUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadAfficheFilms();
    }, []);

    async function loadAfficheFilms() {
        try {
            const dataAfficheFilms = await axios.get(afficheFilmsUrl);
            console.log("data ", dataAfficheFilms);
            setAfficheFilms(dataAfficheFilms.data.results);
            console.log("afficheFilms ", afficheFilms);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className="container">
                <div className="content" style={{ padding: "20px" }}>
                    <h2 style={{ textAlign: "center", color: "#343a40", marginTop: "100px", marginBottom: "40px" }}>Les films à l'affiche</h2>
                    <div className="movies" style={{ marginTop: "40px" }}>
                    {pending ? <Spinner /> : afficheFilms && afficheFilms.map((film, index) => (
                        <Link href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id} style={{ textDecoration: "none" }}>
                            <div className="row" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px" }}>
                                <div className="col-xs-12 col-md-3" style={{ padding: "20px" }}>
                                    <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={`Poster du film ${film.title}`} style={{ width: "100%" }} />
                                </div>
                                <div className="col-xs-12 col-md-9">
                                    <div className="card-body">
                                        <p className="card-title" style={{ fontSize: "26px", textTransform: "uppercase" }}>
                                            {film && film.title}
                                        </p>
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={film && film.vote_average}
                                        />
                                        <p><i className="fas fa-thumbs-up" style={{ color: "green" }}></i>&nbsp;{film && film.vote_count}</p>
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Titre original 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{film && film.original_title}
                                            </span>
                                        </p>
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Date de sortie 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{moment(film && film.release_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                            Genres 
                                            <span style={{ color: "black", fontWeight: "initial" }}>
                                                &nbsp;{film && film.genre_ids}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            <span style={{ color: "#cdad76", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px" }}>
                                                Synopsis
                                            </span>
                                            &nbsp;{film && film.overview}
                                        </p>
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

export default AfficheFilms;